import { Router } from 'express'
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js'
import { requireUserToken } from '../middlewares/requireUserToken.js'
const router = Router()

// Router
router.post(
  '/register',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 5 characters long'),
    body('password').custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password confirmation does not match password')
      }
      return value
    })
  ],
  validationResultExpress,
  register
)
router.post(
  '/login',
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 5 characters long')
  ],
  validationResultExpress,
  login
)

router.get('/protected', requireUserToken, infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logout)
export default router
