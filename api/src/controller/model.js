const express = require('express');
// const router = express.Router();

const contentLikes = {};

const contentController = {}

contentController.likeContent = function(req, res) {

    const contentId = req.params.id;

    if (!contentLikes[contentId]) { 
        contentLikes[contentId] = 0;
    }

    contentLikes[contentId] += 1;

    res.status(200).send({ message: 'Me gusta agregado', likes: contentLikes[contentId] });
}

module.exports = contentController;