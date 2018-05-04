const router = require('express').Router();
const Level = require('../models/Level');

module.exports = router
    .post('/', (req, res, next) => {
        Level.create(req.body)
            .then(level => res.json(level))
            .catch(next);
    })
    .get('/:currentLevel/squares/:currentSquare', (req, res, next) => {
        console.log(req.params);
        return Level.findOne()
            .lean()
            .select('squares')
            .populate({
                path: 'squares.squareId',
                match: { },
                select: '_id'
            })
    });