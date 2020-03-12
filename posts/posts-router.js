//  STEP TWO

//  import express
const express = require('express');

//  import db & set to variable
const Posts = require('../data/db.js') 

//  define a router, capitalize Router & invoke
const router = express.Router();

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(req.body);
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

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "The posts information could not be retrieved" });
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."});
            }
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    Posts.findPostComments(id)
        .then(comment => {
            if (comment.length > 0) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The comments information could not be retrieved" })
        })
})

router.delete('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {

})





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



