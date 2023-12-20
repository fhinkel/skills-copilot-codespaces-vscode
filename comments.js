// Create web server
const express = require('express');
// Create router
const router = express.Router();
// Import controller
const commentsController = require('../controllers/commentsController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Create comment
// api/comments
router.post('/',
    auth,
    [
        check('comment', 'Comment is required').not().isEmpty(),
        check('comment', 'Comment must be min 5 characters').isLength({ min: 5 })
    ],
    commentsController.createComment
);

// Get comments by id
router.get('/',
    auth,
    commentsController.getComments
);

// Update comment
router.put('/:id',
    auth,
    commentsController.updateComment
);

// Delete comment
router.delete('/:id',
    auth,
    commentsController.deleteComment
);

module.exports = router;

