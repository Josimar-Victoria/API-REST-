import jwt from 'jsonwebtoken'

export const requireUserToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    
    if (!token) throw new Error('Token not found')

    const { uid } = jwt.verify(token, process.env.JWT_SECRET)

    req.uid = uid
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
