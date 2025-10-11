import express from "express"
import { PrismaClient } from "@prisma/client"
import { config } from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import userRouter from "./routes/userRoutes.js"
import movieRouter from "./routes/movieRoutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import reviewLikeRouter from "./routes/reviewLikeRoutes.js"
import authRouter from "./routes/authRoutes.js"

config()

const app = express()
const prisma = new PrismaClient()


app.use(cors({
  origin: true, 
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}))


app.use(express.json())
app.use(cookieParser())


app.get("/profile", (req, res) => {
  res.redirect(301, "/api/profile");
});

app.get("/movies", (req, res) => {
  res.redirect(301, "/api/movies");
});

// Rutas
app.use("/api/usuarios", userRouter)
app.use("/api/movies", movieRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/likes", reviewLikeRouter)
app.use("/api", authRouter)

app.get("/api", (_req, res) => {
  res.json({ 
    message: "API funcionando correctamente",
    endpoints: {
      usuarios: "/api/usuarios",
      movies: "/api/movies", 
      reviews: "/api/reviews",
      likes: "/api/likes",
      auth: "/api"
    }
  })
})

// Test DB
async function testDBConnection() {
  try {
    await prisma.$connect()
    console.log("Conectado a la base de datos en CleverCloud")
  } catch (error) {
    console.error("Error conectando a la base de datos:", error)
  }
}
testDBConnection()

app.get("/", (_req, res) => {
  res.send("Servidor funcionando con Express + Prisma")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto:", PORT)
})

