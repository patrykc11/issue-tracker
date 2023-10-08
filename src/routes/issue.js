'use strict'
const { Router } = require('express')
const issueController = require('../controllers/issue')
const validation = require('../middlewares/validation')

const router = Router()

/**
 * @swagger
 * /issues/all:
 *   get:
 *     summary: Get all issues
 *     responses:
 *       200:
 *         description: Issues found
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  title:
 *                    type: string
 *                    example: Issue title x
 *                  description:
 *                    type: string
 *                    example: Issue description y
 *                  status:
 *                    type: string
 *                    example: open
 *                  priority:
 *                    type: string
 *                    example: low
 *                  deadline:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *                  createdAt:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *                  updatedAt:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *       404:
 *         description: Issue not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: No issues
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
router.get('/all', issueController.getAll)

/**
 * @swagger
 * /issues/{id}:
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
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: Issue title x
 *                description:
 *                  type: string
 *                  example: Issue description y
 *                status:
 *                  type: string
 *                  example: open
 *                priority:
 *                  type: string
 *                  example: low
 *                deadline:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                createdAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                updatedAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *       404:
 *         description: Issues not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Issue with id 1 does not exist
 *       422:
 *         description: Validation error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid issue id value. Allowed values are numbers.
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

/**
 * @swagger
 * /issues/{id}/history:
 *   get:
 *     summary: Get issue history
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Issue id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Issue history found
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  issueId:
 *                    type: integer
 *                    example: 1
 *                  status:
 *                    type: string
 *                    example: open
 *                  updatedAt:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *       404:
 *         description: Issue history not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: No issues with status
 *       422:
 *         description: Validation error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid issue id value. Allowed values are numbers.
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
  '/:id/history',
  validation.validateIssueIdMiddleware,
  issueController.getIssueHistory
)

/**
 * @swagger
 * /issues/all/{status}:
 *   get:
 *     summary: Get all issues with status
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         description: Issue status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Issues found
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  title:
 *                    type: string
 *                    example: Issue title x
 *                  description:
 *                    type: string
 *                    example: Issue description y
 *                  status:
 *                    type: string
 *                    example: open
 *                  priority:
 *                    type: string
 *                    example: low
 *                  deadline:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *                  createdAt:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *                  updatedAt:
 *                    type: string
 *                    example: 2023-10-06T00:09:01.963Z
 *       404:
 *         description: Issues not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: No issues with status
 *       422:
 *         description: Validation error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid status value. Allowed values are "open", "pending" or "close".
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
  '/all/:status',
  validation.validateIssueStatusMiddleware,
  issueController.getAllWithStatus
)

/**
 * @swagger
 * /issues/:
 *   post:
 *     summary: Create issue
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *          schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              description: Issue title
 *              example: "example 1"
 *              required: true
 *            description:
 *              type: string
 *              description: Issue description
 *              example: "example 1"
 *              required: true
 *            priority:
 *              type: string
 *              enum:
 *                - low
 *                - medium
 *                - high
 *              example: "medium"
 *            deadline:
 *              type: string
 *              format: date-time
 *              example: "2023-12-31T23:59:59Z"
 *          required:
 *            - title
 *            - description
 *     responses:
 *       201:
 *         description: Issue found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: Issue title x
 *                description:
 *                  type: string
 *                  example: Issue description y
 *                status:
 *                  type: string
 *                  example: open
 *                priority:
 *                  type: string
 *                  example: low
 *                deadline:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                createdAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                updatedAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *       400:
 *         description: Create issue error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Cannot create issue.
 *       422:
 *         description: Validation error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid issue data. Please check the provided fields.
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
router.post(
  '/',
  validation.validatePostIssueMiddleware,
  issueController.addIssue
)

/**
 * @swagger
 * /issues/{id}/change-status:
 *   patch:
 *     summary: Update issue status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Issue id
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *          schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *              enum:
 *                - pending
 *                - close
 *              example: "pending"
 *            deadline:
 *              type: string
 *              format: date-time
 *              example: "2023-12-31T23:59:59Z"
 *          required:
 *            - status
 *     responses:
 *       200:
 *         description: Issue found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                title:
 *                  type: string
 *                  example: Issue title x
 *                description:
 *                  type: string
 *                  example: Issue description y
 *                status:
 *                  type: string
 *                  example: open
 *                priority:
 *                  type: string
 *                  example: low
 *                deadline:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                createdAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *                updatedAt:
 *                  type: string
 *                  example: 2023-10-06T00:09:01.963Z
 *       403:
 *         description: Issues not found
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Issue with id 24 does not exist or forbidden status.
 *       422:
 *         description: Validation error
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid issue data. Please check the provided fields.
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
router.patch(
  '/:id/change-status',
  validation.validateIssueIdMiddleware,
  validation.validatePatchStatusMiddleware,
  issueController.changeStatus
)

module.exports = router
