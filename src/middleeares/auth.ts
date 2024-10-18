import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../util";

import { PrismaClient } from "@prisma/client";
import { UserRequest } from "../types";

const prisma: PrismaClient = new PrismaClient()


export default async function (req: Request, res: Response, next: NextFunction) {


    const formatedToken = req.header('Authorization')?.split(" ")
    if (!formatedToken)
        return res.status(401).json({ message: "Não Autorizado! [0]" })

    const [role, token] = formatedToken

    if (!role)
        return res.status(401).json({ message: "Não Autorizado! [1]" })

    if (role !== "Bearer")
        return res.status(401).json({ message: "Não Autorizado! [2]" })

    if (!token)
        return res.status(401).json({ message: "Não Autorizado! [3]" })

    try {
        const decodedToken = jwtVerify(token) as { id: number, username: string }

        if (!decodedToken)
            return res.status(401).json({ message: "Não Autorizado! [4]" })

        let user = await prisma.users.findFirst({ where: { id: decodedToken.id } })

        if (!user)
            return res.status(404).json({ message: "Não Autorizado! [5]" })
        //@ts-ignore
        req.user = user

        next()

    } catch (e: any) {
        return res.status(500).json({ message: e.message })
    }

};