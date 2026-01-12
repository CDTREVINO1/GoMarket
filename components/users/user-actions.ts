"use server"

import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

type ActionResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
}

async function verifyAdmin() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })

  if (user?.role !== "ADMIN") {
    throw new Error("Forbidden: Admin access required")
  }

  return user
}

export async function getUsers(page: number = 1, limit: number = 10) {
  try {
    await verifyAdmin()

    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { Orders: true },
          },
        },
      }),
      prisma.user.count(),
    ])

    return {
      success: true,
      data: {
        users,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          limit,
        },
      },
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch users",
    } as ActionResponse
  }
}

export async function getUserById(userId: string) {
  try {
    await verifyAdmin()

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        Orders: {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            orderTotal: true,
            orderStatus: true,
            createdAt: true,
          },
        },
        _count: {
          select: { Orders: true },
        },
      },
    })

    if (!user) {
      return {
        success: false,
        error: "User not found",
      } as ActionResponse
    }

    return {
      success: true,
      data: user,
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch user",
    } as ActionResponse
  }
}

export async function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  try {
    const admin = await verifyAdmin()

    const session = await getServerSession(authOptions)
    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })

    if (currentUser?.id === userId) {
      return {
        success: false,
        error: "Cannot change your own role",
      } as ActionResponse
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      data: user,
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update user role",
    } as ActionResponse
  }
}

export async function updateUser(
  userId: string,
  data: { username?: string; email?: string }
) {
  try {
    await verifyAdmin()

    if (data.email) {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      })

      if (existing && existing.id !== userId) {
        return {
          success: false,
          error: "Email already in use",
        } as ActionResponse
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.username && { username: data.username }),
        ...(data.email && { email: data.email }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    })

    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)

    return {
      success: true,
      data: user,
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    } as ActionResponse
  }
}

export async function resetUserPassword(userId: string, newPassword: string) {
  try {
    await verifyAdmin()

    if (newPassword.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
      } as ActionResponse
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return {
      success: true,
      data: { message: "Password reset successfully" },
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to reset password",
    } as ActionResponse
  }
}

export async function deleteUser(userId: string) {
  try {
    const admin = await verifyAdmin()

    const session = await getServerSession(authOptions)
    const currentUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })

    if (currentUser?.id === userId) {
      return {
        success: false,
        error: "Cannot delete your own account",
      } as ActionResponse
    }

    const userWithOrders = await prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { Orders: true } } },
    })

    if (userWithOrders && userWithOrders._count.Orders > 0) {
      return {
        success: false,
        error:
          "Cannot delete user with existing orders. Consider deactivating instead.",
      } as ActionResponse
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      data: { message: "User deleted successfully" },
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    } as ActionResponse
  }
}

export async function searchUsers(query: string) {
  try {
    await verifyAdmin()

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return {
      success: true,
      data: users,
    } as ActionResponse
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search users",
    } as ActionResponse
  }
}
