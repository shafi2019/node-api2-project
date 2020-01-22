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
  
  

module.exports = router;

