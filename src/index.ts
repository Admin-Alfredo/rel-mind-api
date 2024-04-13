import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express'


const Application = express()

const prisma = new PrismaClient()

Application.get('/', (req: Request, res: Response) => {
	return res.json({ api: 'sag'}).status(200)
});

Application.listen(3000, () => console.log("Running api..."))