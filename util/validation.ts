import Joi from '@hapi/joi'

import {IUser, LoginData} from '../util/type'

export const validateRegister = (data: IUser) => {
  const schema = Joi.object<IUser>({
    name: Joi.string().min(6).max(20).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(20).required()
  })
  return schema.validate(data)
}

export const validateLogin = (data: LoginData) => {
  const schema = Joi.object<LoginData>({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(20).required()
  })
  return schema.validate(data)
}