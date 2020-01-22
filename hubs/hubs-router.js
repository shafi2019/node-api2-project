const express = require('express');
const Hubs = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    if (!data.title || !data.contents) {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.'})
    } else {
      Hubs.insert(data)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        console.log('error on POST /api/posts', error);
        res.status(500).json({
          errorMessage: 'There was an error while saving the post to the database'
        })
      })
    }
  })
  
 
  router.post('/:id/comments', (req, res) => {
    
    const data = req.body;
    if (!data.text) {
      res.status(400).json({ errorMessage: 'Please provide text for the comment.'})
    } else {
      Hubs.insertComment(data)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment)
        } else {
          res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
        }
      })
      .catch(error => {
        console.timeLog('error on POST /api/posts/:id/comments', error);
        res.status(500).json({
          errorMessage: 'There was an error while saving the comment to the database'
        })
      })
    }
  })
  
  
  router.get('/', (req, res) => {
    Hubs.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log('error on GET /api/posts/', error);
      res.status(500).json({
        errorMessage: 'The posts information could not be retrieved.'
      })
    })
  })
  
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    Hubs.findById(id)
    .then(post => {
      if (post.length !== 0) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      console.log('error on GET /api/posts/:id', error);
      res.status(500).json({
        errorMessage: 'The post information could not be retrieved.'
      })
    })
  })
  

  router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
  
    Hubs.findPostComments(id)
    .then(comment => {
      if (comment.length !== 0) {
        res.status(200).json(comment)
      } else {
        res.status(404).json({ errorMessage: 'The post with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      console.log('error on GET /api/posts/:id/comments', error)
      res.status(500).json({
        errorMessage: 'The comments information could not be retrieved.'
      })
    })
  })
  
module.exports = router;

