import mongoose from 'mongoose';

// first create a mongoose schema
// ** Schema -> With mongoDB you can create documents that look absolutely different
// one can have title and the message, one can only have the message and so on
// Mongoose allows us to give some uniformity to our documents
// We are going to specify that each post is going to have to have these things:
// (we r going to convert an image to a string use base-64)
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Now we have a schema, we need to turn it into a model
const PostMessage = mongoose.model('PostMessage', postSchema);
// export a moongoose model
export default PostMessage;