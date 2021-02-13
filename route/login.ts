import {Router, Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../model/user'
import {LoginData} from '../util/type'
import {validateLogin} from '../util/validation'

const router = Router()

router.post('/login', async (req: Request<{}, {}, LoginData>, res: Response) => {
  console.log(req.body)

  // Validate input
  const {error} = validateLogin(req.body)
  if (error) {
    res.status(400).json({error: error.details[0].message})
    return
  }

  // Check if email exists
  const user = await User.findOne({email: req.body.email})
  if (!user) {
    res.status(400).json({error: 'Email does not exist.'})
    return
  }

  // Check password
  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) {
    res.status(400).json({error: 'Invalid password.'})
    return
  }

  // All checks are passed
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, 'MyPrivateKey')
  res.status(200).header('auth-token', token).json({
    error: null,
    data: {
      message: 'Login successful.',
      token: token
    }
  })
})

export default router