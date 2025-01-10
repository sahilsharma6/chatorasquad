import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // email: {
    //     type: String,
    // },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    },
   likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],

    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            email: {
                type: String,
            },
            content: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],

},
{
    timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;