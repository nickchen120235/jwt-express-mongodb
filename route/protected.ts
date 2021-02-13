import {Router, Request, Response} from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    error: null,
    data: {
      title: 'Protected Route',
      content: 'Protected content',
      // @ts-ignore
      user: req.user
    }
  })
})

export default router