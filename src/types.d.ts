import { Request } from 'express'
import {  PrismaClient, users } from '@prisma/client';
type UserRequest = Request & {
    user: Pick<users, "id" | "username">
};