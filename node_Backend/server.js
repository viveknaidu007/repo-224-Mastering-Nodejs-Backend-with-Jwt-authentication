const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./db')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const userRoute = require('./routes/user')
const validateJWT = require('./Util/authMiddleware')



//1
dotenv.config();
connectDB();
const app = express();



// we need to give ability to read incoming JSON

app.use(express.json())

app.use('/dsv/posts',validateJWT,postRoute)
app.use('/dsv/comments',validateJWT,commentRoute);
app.use('/dsv/user',userRoute)


const PORT = process.env.PORT || 5000; //localhost:2000/dsv/post/sayHello
app.listen(PORT,() => {
    console.log('server is playing')//localhost:2000/dsv/comment
})

// aap plese run

