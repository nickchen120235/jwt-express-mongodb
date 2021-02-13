import {Router, Request, Response} from 'express'
import bcrypt from 'bcryptjs'

import User from '../model/user'
import {IUser} from '../util/type'
import {validateRegister} from '../util/validation'

const router = Router()

router.post('/register', async (req: Request<{}, {}, IUser>, res: Response) => {
  console.log(req.body)

  // Validate input
  const {error} = validateRegister(req.body)
  if (error) {
    res.status(400).json({error: error.details[0].message})
    return
  }

  // Check duplicate email
  const duplicateEmail = await User.findOne({email: req.body.email})
  if (duplicateEmail) {
    res.status(400).json({error: 'Email already exists.'})
    return
  }

  // All checks are passed
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password
  })
  try {
    const saved = await user.save()
    res.status(200).json({error: null, saved: saved})
  }
  catch (error) {
    res.status(400).json({error})
  }
})

export default router