const mongoose = require('mongoose');




const connectDB = async () => {
    try {
//2 * 2
// small millisec -> mongodb server -> validation -> respond
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Mongo DB Connected')
    } catch (error) {
        console.log('unable to connect db');
    }
}

module.exports = connectDB;



////Blog Post Application
//POST -> Image,description,createdBy,craetedAt
//Comment section


//POST->Table
//Comment -> Table