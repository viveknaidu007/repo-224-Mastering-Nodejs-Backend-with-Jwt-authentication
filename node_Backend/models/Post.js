const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
    title:{type:String,required:true}, // coulumn
    content:{type:String,required:true},
    // coverImage:{type:String,requ}
    // createdBy:{type:String,required:true},
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },

    createdAt:{type:Date,default:Date.now}
   


})


postSchema.virtual('comments',{
    ref:'comment',
    localField:'_id',
    foreignField:'postId'
})


postSchema.set('toObject',{virtuals:true});
postSchema.set('toJSON',{virtuals:true});



//124->

//id

///Meme -> POST -> recent media attack -> 124-_id
      // comments-> mic tho mingudu -> post id -> 124
      //comments -> super bro -> 124
      // super bro
      //commets -> nice for media people - 124


//Meme -> POST -> Naagarjuunnna -> 100
     //comments -> hmm -> post -> 100
     //comments -> -> postId -> 100

module.exports = mongoose.model('Post',postSchema);