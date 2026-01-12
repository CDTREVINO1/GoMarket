"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, KeyRound, Shield, Trash2, User } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  deleteUser,
  resetUserPassword,
  updateUser,
  updateUserRole,
} from "@/components/users/user-actions"

type UserDetailActionsProps = {
  user: {
    id: string
    username: string | null
    email: string
    role: string
  }
}

export default function UserDetailActions({ user }: UserDetailActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  const [editForm, setEditForm] = useState({
    username: user.username || "",
    email: user.email,
  })

  const [newPassword, setNewPassword] = useState("")

  const handleRoleToggle = async () => {
    setIsLoading(true)
    try {
      const newRole = user.role === "ADMIN" ? "USER" : "ADMIN"
      const result = await updateUserRole(user.id, newRole)

      if (result.success) {
        toast.success(`Role updated to ${newRole}`)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to update role")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateUser = async () => {
    setIsLoading(true)
    try {
      const result = await updateUser(user.id, editForm)

      if (result.success) {
        toast.success("User updated successfully")
        setEditDialogOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to update user")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)
    try {
      const result = await resetUserPassword(user.id, newPassword)

      if (result.success) {
        toast.success("Password reset successfully")
        setPasswordDialogOpen(false)
        setNewPassword("")
      } else {
        toast.error(result.error || "Failed to reset password")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteUser(user.id)

      if (result.success) {
        toast.success("User deleted successfully")
        router.push("/admin/users")
      } else {
        toast.error(result.error || "Failed to delete user")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <Edit className="mr-2 h-4 w-4" />
            Edit User Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleRoleToggle}
        disabled={isLoading}
      >
        {user.role === "ADMIN" ? (
          <>
            <User className="mr-2 h-4 w-4" />
            Demote to User
          </>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Promote to Admin
          </>
        )}
      </Button>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <KeyRound className="mr-2 h-4 w-4" />
            Reset Password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for this user
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPasswordDialogOpen(false)
                setNewPassword("")
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full" disabled={isLoading}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{user.email}</strong> and
              remove all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
