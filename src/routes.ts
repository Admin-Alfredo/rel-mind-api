import { PrismaClient } from '@prisma/client';
import { Request, Response, Application } from 'express'
import express from 'express'
import bycript from 'bcrypt'
import jwt from 'jsonwebtoken'
import auth from './middleeares/auth'
import { JWT_SECRET } from './env';
import { UserRequest } from './types';
const prisma = new PrismaClient()
prisma.$connect().then((a) => console.log("[CONNECT]: ", a)).catch(err => console.log(err))

export default function (app: Application) {

    const routerUsers = express.Router()
    const routerReports = express.Router()

    // GET USERS/TEST
    routerUsers.get('/', async (req: Request, res: Response) => {
        try {
            const users = await prisma.users.findMany({})
            
            return res.json(users).status(200)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Erro ao pegar usuarios", error })
        }

    });
    routerUsers.post('/', async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body

            if (!username)
                return res.status(400).json({ message: "    a" })
            if (!password)
                return res.status(400).json({ message: "Credencias do usuario incorreta" }).status(400)

            const hash = await bycript.hash(password, 10);

            const user = await prisma.users.create({
                data: { ...req.body, password: hash }
            })
            return res.status(200).json(user)

        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Erro ao criar um user", error })
        }
    });
    routerUsers.post('/login', async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body

            if (!username)
                return res.status(400).json({ message: "Credencias do usuario incorreta" })
            if (!password)
                return res.status(400).json({ message: "Credencias do usuario incorreta" })

            const user = await prisma.users.findFirst({ where: { username } });

            if (!user)
                return res.status(401).json({ message: "Erro ao autenticar user" })

            if (!(await bycript.compare(password, user.password)))
                return res.status(401).json({ message: "Erro ao autenticar user" })

            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET)

            return res.status(200).json({ user, token })

        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar um user", error })
        }
    });

    routerReports.get('/', auth, async (req: Request, res: Response) => {
        //@ts-ignore
        console.log(req.user)
        try {
            // const reports = await prisma.reports.findMany({})
            return res.status(200).json({})
        } catch (error) {
            return res.status(400).json({ message: "Erro ao pegar usuarios", error })
        }

    })
    routerReports.post('/', auth, async (req: Request, res: Response) => {
        try {
            const reports = await prisma.reports.findMany({})
            return res.json(reports).status(200)
        } catch (error) {
            return res.status(400).json({ message: "Erro ao pegar usuarios", error })
        }

    })

    app.use('/users', routerUsers)
    app.use('/reports', routerReports)
}