const express = require("express");
const { post, getAll, getAllById, getComment, deleteComment, update } = require("../controller/PostController");
const auth = require("../middleware/auth");


const routerAuth = express.Router();

routerAuth.post('/post', auth, post);
routerAuth.get('/', auth, getAll);
routerAuth.get('/user', auth, getAllById);
routerAuth.get('/comment/:id', auth, getComment)
routerAuth.delete('/comment/delete/:id', auth, deleteComment)
routerAuth.patch('/comment/update/:id', auth, update)

module.exports = routerAuth;