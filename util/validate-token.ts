import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'

const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.header('auth-token')
  console.log(`token: ${token}`)
  if (!token) {
    res.status(401).json({error: 'Access denied.'})
    return
  }

  try {
    const valid = jwt.verify(token, 'MyPrivateKey')
    // @ts-ignore
    req.user = valid
    next()
  }
  catch (error) {
    res.status(401).json({error: "Token is invalid."})
  }
}

export default verifyToken