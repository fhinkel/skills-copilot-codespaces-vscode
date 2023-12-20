// Create the web server

// Import modules
const express = require('express');
const router = express.Router();
const path = require('path');

// Import data
const data = require(path.join(__dirname, '../data'));

// GET: /comments
router.get('/', (req, res) => {
  res.json(data.comments);
});

// POST: /comments
router.post('/', (req, res) => {
  const newComment = {
    id: data.comments.length + 1,
    body: req.body.body,
    postId: req.body.postId
  };

  data.comments.push(newComment);

  res.json(newComment);
});

// GET: /comments/:id
router.get('/:id', (req, res) => {
  const comment = data.comments.find(comment => comment.id === parseInt(req.params.id));

  if (!comment) {
    return res.status(404).json({ message: `Comment with id ${req.params.id} was not found` });
  }

  res.json(comment);
});

// PUT: /comments/:id
router.put('/:id', (req, res) => {
  const comment = data.comments.find(comment => comment.id === parseInt(req.params.id));

  if (!comment) {
    return res.status(404).json({ message: `Comment with id ${req.params.id} was not found` });
  }

  comment.body = req.body.body;

  res.json(comment);
});

// DELETE: /comments/:id
router.delete('/:id', (req, res) => {
  const comment = data.comments.find(comment => comment.id === parseInt(req.params.id));

  if (!comment) {
    return res.status(404).json({ message: `Comment with id ${req.params.id} was not found` });
  }

  const index = data.comments.indexOf(comment);
  data.comments.splice(index, 1);

  res.json(comment);
});

module.exports = router