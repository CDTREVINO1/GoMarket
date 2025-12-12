import { PrismaClient } from "@/generated/prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"

import { env } from "@/lib/env"

const prisma = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
