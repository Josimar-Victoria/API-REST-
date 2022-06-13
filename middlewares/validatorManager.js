import axios from 'axios'
import { body, param, validationResult } from 'express-validator'

const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const bodyRegisterValidator = [
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
  }),
  validationResultExpress
]

export const bodyLoginValidator = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is not valid'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 5 characters long'),
  validationResultExpress
]

export const bodyLinksValidator = [
  body('longLink')
    .trim()
    .isURL()
    .notEmpty()
    .withMessage('Format of the link is not valid')
    .custom(async value => {
      try {
        if (!value.startsWith('https://')) {
          value = `https://${value}`
        }
        await axios.get(value)
        return value
      } catch (error) {
        console.log(error)
        throw new Error('not found longLink 404')
      }
    }),
  validationResultExpress
]

export const paramsLinksValidator = [
  param('id')
    .trim()
    .isMongoId()
    .escape()
    .notEmpty()
    .withMessage('Id is not valid'),
  validationResultExpress
]
