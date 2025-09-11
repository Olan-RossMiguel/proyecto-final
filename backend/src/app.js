import express from "express"
import { PrismaClient } from "@prisma/client"
import { config } from "dotenv"
import cors from "cors"

import userRouter from "./routes/userRoutes.js"
import movieRouter from "./routes/movieRoutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import reviewLikeRouter from "./routes/reviewLikeRoutes.js"

// Inicializar dotenv
config()

const app = express()
const prisma = new PrismaClient()

// Middlewares
app.use(express.json())
app.use(cors())

// Conectar rutas
app.use("/api/usuarios", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/likes", reviewLikeRouter)

// Testear conexión a la DB al iniciar
async function testDBConnection() {
  try {
    await prisma.$connect()
    console.log("Conectado a la base de datos en CleverCloud")
  } catch (error) {
    console.error("Error conectando a la base de datos:", error)
  }
}
testDBConnection()

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando con Express + Prisma 🚀")
})

// Puerto
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto:", PORT)
})
