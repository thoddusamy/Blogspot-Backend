const express = require('express')
const { CreateNewPost, GetPostById, GetAllPosts, UpdatePostById, DeletePostById } = require('../Controllers/PostController')
const router = express.Router()
const { Authentication } = require('../Middlewares/Authentication')

router.get('/:id', GetPostById)
router.get('/', GetAllPosts)
router.post('/createpost', Authentication, CreateNewPost)
router.put('/updatepost/:id/:username', Authentication, UpdatePostById)
router.delete('/deletepost/:id/:username', Authentication, DeletePostById)


module.exports = router