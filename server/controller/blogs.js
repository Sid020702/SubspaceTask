const utils = require('./utils')

exports.getBlogStats = (req, res, next) => {
    utils.fetchAllBlogs().then(blogs => {
        if (!blogs) {
            const error = new Error('Could not find any blogs')
            error.statusCode = 404
            throw error
        }
        const totalBlogs = utils.getTotalBlogs(blogs)    //Total number of blogs
        const longestBlogTitle = utils.getLongestTitle(blogs)  //BLog with the longest title
        const privacyBlogs = utils.getPrivacyBlogs(blogs)           //Blogs with "privacy" in their titles
        const uniqueBlogTitles = utils.getUniqueTitles(blogs)  //All unique blog titles
        res.status(200).json({
            total_blogs: totalBlogs,
            longest_blog_title: longestBlogTitle,
            privacy_blogs: privacyBlogs,
            unique_blog_titles: uniqueBlogTitles
        })

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

}

exports.getQueriedBlogs = (req, res, next) => {
    const q = req.query.query
    utils.fetchAllBlogs().then(blogs => {
        if (!blogs) {
            const error = new Error('Could not find any blogs')
            error.statusCode = 404
            throw error
        }
        queriedBlogs = utils.getQueriedBlogs(blogs, q)    //All blogs with the query string in their title
        res.status(200).json({ blogs: queriedBlogs })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}