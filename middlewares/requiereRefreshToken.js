import jwt from 'jsonwebtoken'

export const requireRefreshToken = (req, res, next) => {
  try {
    const { resfreshToken } = req.cookies
    if (!resfreshToken) throw new Error('Token not exists')

    const { uid } = jwt.verify(resfreshToken, process.env.JWT_REFRESH)

    req.uid = uid

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
