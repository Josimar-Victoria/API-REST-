import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    //Alternativa buscado por email
    let user = await User.findOne({ email })
    if (user) throw { code: 11000 }

    user = new User({ email, password })
    await user.save()
    //Generar token

    return res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    // Alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user)
      return res.status(403).json({ error: 'This user does not exist.' })

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid)
      return res.status(403).json({ error: 'Password is incorrect.' })

    //Generar token
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)

    return res.status(200).json({
      message: 'User logged in successfully',
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
