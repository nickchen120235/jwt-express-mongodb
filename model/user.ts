import {Schema, model} from 'mongoose'

import {IUser} from '../util/type'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

export default model<IUser>('User', userSchema)