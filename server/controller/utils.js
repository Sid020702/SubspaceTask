const _ = require("lodash")
const fetch = require("node-fetch")

exports.fetchAllBlogs = _.memoize(function () {
    const url = "https://intent-kit-16.hasura.app/api/rest/blogs"
    const options = {
        method: 'GET',
        headers: {
            'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
        }
    };
    return fetch(url, options)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Page not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            return data.blogs
        }).catch(error => {
            console.log(error)
        })
})



exports.getTotalBlogs = _.memoize(function (blogs) {
    return _.size(blogs)
}, ([...blogs]) => JSON.stringify(blogs))



exports.getPrivacyBlogs = _.memoize(function (blogs) {
    privacyBlogs = _.filter(blogs, (blog) => {
        return _.includes(_.lowerCase(blog["title"]), "privacy")
    })
    return _.size(privacyBlogs)
}, ([...blogs]) => JSON.stringify(blogs))



exports.getLongestTitle = _.memoize(function (blogs) {
    const total_blogs = this.getTotalBlogs(blogs)
    longest_blog_title = _.sortBy(blogs, (blog) => {
        return _.size(blog["title"])
    })[total_blogs - 1]["title"]
    return longest_blog_title
}, ([...blogs]) => JSON.stringify(blogs))



exports.getUniqueTitles = _.memoize(function (blogs) {
    unique_titles = _.uniq(_.map(blogs, (blog) => {
        return _.toLower(blog["title"])
    }))
    return unique_titles
}, ([...blogs]) => JSON.stringify(blogs))



exports.getQueriedBlogs = _.memoize(function (blogs, query) {
    return _.filter(blogs, (blog) => {
        return _.includes(_.lowerCase(blog["title"]), _.lowerCase(query))
    })
}, ({ ...args }) => JSON.stringify(args))    //Converting both args to array and stringifying it