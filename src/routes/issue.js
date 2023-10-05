'use strict'
const { Router } = require('express')
const issueController = require('../controllers/issue')

const router = Router()

router.get('/:id', issueController.getById)

router.get('/:id/history', issueController.getIssueHistory)

router.get('/all', issueController.getAll)

router.get('/all/:status', issueController.getAllWithStatus)

router.post('/', issueController.addIssue)

router.patch('/change-status', issueController.changeStatus)
