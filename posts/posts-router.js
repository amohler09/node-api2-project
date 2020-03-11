//  STEP TWO

//  import express
const express = require('express');

//  import db & set to variable
const Posts = require('../data/db.js') 

//  define a router, capitalize Router & invoke
const router = express.Router();

router.get('')

//      POST request to /api/posts:
// If the request body is missing the title or contents
// respond with HTTP status code 400 (Bad Request).
// If the information about the post is valid:
// save the new post the the database.
// return HTTP status code 201 (Created).
// return the newly created post.
// If there's an error while saving the post:
// cancel the request.
// HTTP status code 500 (Server Error).
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(req.body);
        console.log(req.body, post);
    })
    .catch(error => {
        console.log(error);
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        } else {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        };
    });
});

//      POST request to /api/posts/:id/comments:
// If the post with the specified id is not found:
// return HTTP status code 404 (Not Found).
// If the request body is missing the text property:
// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// If the information about the comment is valid:
// save the new comment the the database.
// return HTTP status code 201 (Created).
// return the newly created comment.
// If there's an error while saving the comment:
// cancel the request.
// respond with HTTP status code 500 (Server Error).

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    Posts.findById(id);
    Posts.insertComment(req.body)
    .then(comment => {
        res.status(201).json(req.body);
        console.log(comment, req.body, req.body.text);
    })
    .catch(error => {
        console.log(error);
        if (!req.body.text) {
            res.status(400).json({ errorMessage: "Please provide text for the comment." });
        } else if (req.body.post_id !== id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
        }
    });
});


//  export router
module.exports = router;


// {
//     title: "The post title", // String, required
//     contents: "The post contents", // String, required
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }

//   {
//     text: "The text of the comment", // String, required
//     post_id: "The id of the associated post", // Integer, required, must match the id of a post entry in the database
//     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   }



