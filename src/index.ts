import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express'
import routes from './routes.js'
import bodyParser from 'body-parser';

const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyParser.json({ limit: 1024 * 1024 * 8 }))
routes(app);


app.listen(PORT, () => console.log(`Your System is running in PORT=${PORT}`))