import { Router } from 'express'
import { requireUserToken } from '../middlewares/requireUserToken.js'
import {
  bodyLinksValidator,
  paramsLinksValidator
} from '../middlewares/validatorManager.js'
import {
  createLink,
  getLink,
  getLinks,
  removeLink,
  updateLink
} from '../controllers/link.controller.js'

const router = Router()

// GET /api/v1/links all links
router.get('/', requireUserToken, getLinks)

// GET /api/v1/links/:id link by id
router.get('/:nanoLink', getLink)

// POST /api/v1/links create link
router.post('/', requireUserToken, bodyLinksValidator, createLink)

// GET /api/v1/links/:id DELETE link
router.delete('/:id', requireUserToken, paramsLinksValidator, removeLink)

// PATCH /api/v1/links/:id update link
router.patch(
  '/:id',
  requireUserToken,
  paramsLinksValidator,
  bodyLinksValidator,
  updateLink
)

export default router
