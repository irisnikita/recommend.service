const Post = require('../model/post.model');

exports.createPost = function (req, res) {
    const post = new Post(req.body);

    post.save().then(result => {
        res.json({
            data: {
                post: result
            }
        });
    }).catch((err) => {
        res.json({
            message: err
        });
    });
};

exports.getPaths = async function (req, res) {
    Post.find({}, '_id title filter.province.name filter.district').exec((err, results) => {
        if (!err) {
            res.json({
                data: {
                    paths: results
                }
            });
        } else {
            res.json({
                message: 'Error'
            });
        }
    });
};

exports.findPost = async function (req, res) {
    const { id } = req.params;

    if (id) {

        Post.findOne({_id: id}).populate('contact').exec((err, results) => {
            if (!err) {
                res.json({
                    data: {
                        post: results
                    }
                });
            } else {
                res.json({
                    message: err
                });
            }
        })

        // Post.findById(id).exec((err, results) => {
        //     if (!err) {
        //         res.json({
        //             data: {
        //                 post: results
        //             }
        //         });
        //     } else {
        //         res.json({
        //             message: err
        //         });
        //     }
        // });
    }
};

exports.findByUser = async function (req, res) {
    const { userId = '', page = 0, limit = 20 } = req.query;

    const count = await Post.find({ 'contact': userId }).countDocuments();

    Post
        .find({ 'contact': userId })
        .skip(page * +limit)
        .limit(+limit)
        .sort('-startTime')
        .exec((err, results) => {
            if (!err) {
                res.json({
                    data: {
                        posts: results,
                        total: count
                    }
                });
            }
        });
};

exports.listPost = async function (req, res) {
    const {
        page = 0,
        limit = 20,
        areaStart = 0,
        areaEnd = 500,
        optionTypeId = 'all',
        provinceCode = 'ALL',
        districtName = 'all',
        streetId = 'all',
        priceStart = 0,
        priceEnd = 50000000,
        levelId = 'all'
    } = req.query;

    const count = await Post
        .find()
        .and([
            { area: { $lte: areaEnd, $gte: areaStart } },
            { price: { $lte: priceEnd, $gte: priceStart } },
            { 'filter.optionType.id': optionTypeId !== 'all' ? optionTypeId : { $exists: true } },
            { 'filter.province.code': provinceCode !== 'ALL' ? provinceCode : { $exists: true } },
            { 'filter.district.name': districtName !== 'all' ? districtName : { $exists: true } },
            { 'filter.street.id': streetId !== 'all' ? streetId : { $exists: true } },
            { 'option.level.id': levelId !== 'all' ? levelId : { $exists: true } },
            {  status: true },
        ]).countDocuments();

    Post
        .find()
        .and([
            { area: { $lte: areaEnd, $gte: areaStart } },
            { price: { $lte: priceEnd, $gte: priceStart } },
            { 'filter.optionType.id': optionTypeId !== 'all' ? optionTypeId : { $exists: true } },
            { 'filter.province.code': provinceCode !== 'ALL' ? provinceCode : { $exists: true } },
            { 'filter.district.name': districtName !== 'all' ? districtName : { $exists: true } },
            { 'filter.street.id': streetId !== 'all' ? streetId : { $exists: true } },
            { 'option.level.id': levelId !== 'all' ? levelId : { $exists: true } },
            {  status: true }
        ])
        .skip(page * +limit).limit(+limit)
        .sort('-startTime')
        .exec((err, results) => {
            if (!err) {
                res.json({
                    data: {
                        posts: results,
                        total: count
                    }
                });
            }
        });
};

exports.updateStatus = function (req, res) {
    const { id = '' } = req.params;
    const { status = false } = req.body;

    Post.findByIdAndUpdate(id, { status: status }).exec((err, results) => {
        if (!err) {
            res.json({
                message: 'Update status success',
                status: res.statusCode,
                data: { results }
            });
        } else {
            res.json({
                message: err
            });
        }
    });

};

exports.updatePost = function (req, res) {
    const { id = '' } = req.params;
    const { post = {} } = req.body;

    Post.findByIdAndUpdate(id, { ...post }).exec((err, results) => {
        if (!err) {
            res.json({
                message: 'Update post success',
                status: res.statusCode,
                data: { results }
            });
        } else {
            res.json({
                message: err
            });
        }
    });

};

exports.deletePost = function (req, res) {
    const { id = '' } = req.params;

    Post.findByIdAndDelete(id).exec((err, results) => {
        if (!err) {
            res.json({
                status: res.statusCode,
                message: 'Delete post success',
                data: { results }
            });
        } else {
            res.json({
                message: 'Can\'t delete post'
            });
        }
    });
};