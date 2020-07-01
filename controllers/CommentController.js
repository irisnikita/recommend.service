const Comment = require('../model/comment.model');
const { result } = require('lodash');

exports.createComment = (req, res) => {
    const comment = new Comment(req.body);

    comment.save().then(results => {
        res.json({
            status: res.statusCode,
            message: 'Create comment success',
            data: {
                comment: results
            }
        })
    }).catch(err => {
        res.json({
            message: err
        })
    })
}

exports.getComments = (req, res) => {
    const {page = 0, limit = 1000, postId = ''} = req.query;

    Comment.find({postId: postId}).populate({path: 'contactId', select: 'avatar fullName email'}).skip(page * +limit).limit(+limit).sort('-dateCreate').exec((err, results) => {
        if(!err) {
            res.json({
                status: res.statusCode,
                message: 'Get comment success',
                data: {
                    comments: results
                }
            })
        } else {
            res.json({
                message: 'Error'
            })
        }
    })
}

