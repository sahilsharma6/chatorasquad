import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    blogs: [
        {
           blogId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blogs'},
        },
    ],
},
{
    timestamps: true,
});

const BlogCategory = mongoose.model('BlogCategory', CategorySchema);

export default BlogCategory;