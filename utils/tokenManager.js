import jwt from 'jsonwebtoken'

export const generateToken = uid => {
  const expiresIn = 60 * 15 // 15 minutos
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (error) {
    console.log(error)
  }
}

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 7 // 1 semana
  try {
    const resfreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn
    })

    res.cookie('resfreshToken', resfreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === 'developer'),
      expires: new Date(Date.now() + expiresIn * 1000) // 1 semana
    })
  } catch (error) {
    console.log(error)
  }
}
