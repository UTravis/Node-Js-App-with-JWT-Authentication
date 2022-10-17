const Comment = require("../models/Comment");
const { postValidation } = require("../validate");

// Making new post
const post = async (req, res) => {
    //validating the request body input
    const{ error } = await postValidation.validate(req.body);
    if(error) return res.status(404).json((error.details[0].message));

    //storing the comment
    const comment = new Comment({
        title : req.body.title,
        description : req.body.description,
        user_id : req.payload._id
    });
    try {
        await comment.save();
        res.status(200).json(comment)
    } catch (error) {
        res.status(409).json(error)
    }
}

// getting all the created inputs
const getAll = async (req, res) => {
    try {
       const comments = await Comment.find();
       res.status(200).json(comments);
    } catch (error) {
        res.status(404).json(error)
    }
}

//getting all created inputs of a user
const getAllById = async (req, res) => {
    //getting the id of the logged in user
    const userID = req.payload._id;

    try {
        const comments = await Comment.find({user_id: userID});
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json(error)
    }
}

// Getting a comment using its id
const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment)
    } catch (error) {
        res.status(409).json(error)
    }
}

// Taking comment ID and deleting entry
const deleteComment = async (req, res) => {
    try{
        await Comment.findByIdAndDelete(req.params.id); //deleting entry
        const comments = await Comment.find(); //geting the remaining data
        res.status(200).json(comments)
    }catch(error){
        res.status(409).json(error)
    }
}

// Updating an entry
const update = async (req, res) => {
    const {error} = postValidation.validate(req.body);
    if(error) return res.status(404).json(error.details[0].message);

    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body); //updating entry
        const comment = await Comment.findById(req.params.id); //getting the updated entry
        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports.post = post;
module.exports.getAll = getAll;
module.exports.getAllById = getAllById;
module.exports.getComment = getComment;
module.exports.deleteComment = deleteComment;
module.exports.update = update;