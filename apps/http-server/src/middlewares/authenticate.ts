import { JWT_SECRET } from '@repo/backend-common/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization

  const parsedToken = token?.split(' ')[1]
  if (!token || !parsedToken) {
    res.status(403).json({
      message: 'Unautenticated'
    })
    return
  }

  try {
    const payload = jwt.verify(parsedToken, JWT_SECRET)

    //@ts-ignore
    req.headers.userId = payload.userId

    next()
  } catch (e) {
    res.status(403).json({
      message: 'Unautenticated'
    })
    return
  }
}
