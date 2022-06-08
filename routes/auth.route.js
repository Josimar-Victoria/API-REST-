import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js'
const router = express.Router()

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

export default router
