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
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
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