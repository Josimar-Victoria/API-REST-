import { Router } from 'express'
import { requireUserToken } from '../middlewares/requireUserToken.js'
import { requireRefreshToken } from '../middlewares/requiereRefreshToken.js'
import {
  bodyLoginValidator,
  bodyRegisterValidator
} from '../middlewares/validatorManager.js'
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout
} from '../controllers/auth.controller.js'

const router = Router()

// Router
router.post('/register', bodyRegisterValidator, register)
router.post('/login', bodyLoginValidator, login)

router.get('/protected', requireUserToken, infoUser)
router.get('/refresh', requireRefreshToken, refreshToken)
router.get('/logout', logout)

export default router
