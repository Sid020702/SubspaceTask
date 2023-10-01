const express = require('express')
const router = express.Router()
const blogController = require('../controller/blogs.js')

router.get('/blog-stats', blogController.getBlogStats)
router.get('/blog-search', blogController.getQueriedBlogs)

module.exports = router