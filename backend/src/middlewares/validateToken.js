import jwt from "jsonwebtoken"

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: "Autorización denegada" })

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" })
  }
}
