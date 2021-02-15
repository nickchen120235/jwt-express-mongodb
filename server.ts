import express from 'express'
import mongoose from 'mongoose'

import register from './route/register'
import login from './route/login'
import protectedRoute from './route/protected'
import verifyToken from './util/validate-token'

const DBHOST = process.env.DBHOST || 'localhost:27017'
const DBUSER = process.env.DBUSER || 'admin'
const DBPASS = process.env.DBPASS || 'admin'

const app = express()
app.use(express.json())
mongoose.connect(`mongodb://${DBUSER}:${DBPASS}@${DBHOST}/jwt`,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => console.log('Connected to database.')
)

app.use('/api/user', register)
app.use('/api/user', login)
app.use('/api/protected', verifyToken, protectedRoute)

app.listen(22222, () => console.log('Server is running.'))