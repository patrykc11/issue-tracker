'use strict'
const { Router } = require('express')
const issueController = require('../controllers/issue')
const validation = require('../middlewares/validation')

const router = Router()

/**
 * @swagger
 * /api/issues/{id}:
 *   get:
 *     summary: Get issue details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Issue id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Issue found
 *       404:
 *         description: Issue not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Issue with id 1 does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: INTERNAL SERVER ERROR
 */
router.get(
  '/:id',
  validation.validateIssueIdMiddleware,
  issueController.getById
)

router.get(
  '/:id/history',
  validation.validateIssueIdMiddleware,
  issueController.getIssueHistory
)

router.get('/all', issueController.getAll)

router.get(
  '/all/:status',
  validation.validateIssueStatusMiddleware,
  issueController.getAllWithStatus
)

router.post(
  '/',
  validation.validatePostIssueMiddleware,
  issueController.addIssue
)

router.patch(
  '/:id/change-status',
  validation.validateIssueIdMiddleware,
  validation.validatePatchStatusMiddleware,
  issueController.changeStatus
)

module.exports = router
