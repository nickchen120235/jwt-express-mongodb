import {Document} from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  date: Date
}

export interface LoginData {
  email: IUser['email']
  password: IUser['password']
}