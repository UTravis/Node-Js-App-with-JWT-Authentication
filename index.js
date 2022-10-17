const express = require('express');
const mongoose =  require('mongoose');
const env = require('dotenv');
const router = require('./routes/routes');
const routerAuth = require('./routes/web');

const app = express()
const PORT = process.env.PORT || 3000

env.config()


mongoose.connect(process.env.DATABASE, () => {
    console.log('Connected to the database!')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}).catch(err => console.log(err))

//middleware
app.use(express.json());

//middleware routes
app.use('/api/users/', router);

app.use('/app/comments/', routerAuth)

