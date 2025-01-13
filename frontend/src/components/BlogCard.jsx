import { motion } from "framer-motion";
import { ChevronRight, Pencil, ThumbsUp, Trash } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";

const BlogCard = ({  _id, title, description, date, author, views, category, image, role, initialLikes,onDelete  }) => {
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const MotionLink = motion(Link);

    function handleDelete() {
        onDelete(_id); 
    }

    function onLike() {
        setIsLiked(!isLiked); 
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }

    return (
        <Link to={`/blog/details/${_id}`}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative">
                <img
                    src= {import.meta.env.VITE_API_URL + "/" + image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">{category}</span>
                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">ChatroaSquad</span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-3 hover:text-orange-500 transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
                <div className="flex justify-between">
                    <MotionLink
                        whileHover={{ x: 5 }}
                        className="flex items-center text-orange-500 font-semibold mb-4 cursor-pointer"
                        to={'/blog/details/'+_id}
                    >
                        Read More
                        <ChevronRight className="ml-1 w-4 h-4" />
                    </MotionLink>
                    <motion.div
                        className="flex items-center mb-3 cursor-pointer"
                        onClick={onLike}
                    >
                        <ThumbsUp
                            size={30}
                            className={`cursor-pointer transition-colors duration-300 ${isLiked ? 'text-yellow-500' : 'text-gray-500'}`}
                        />
                        {likeCount}
                    </motion.div>
                </div>

                <div className="flex items-center text-sm text-gray-500 border-t pt-4">
                    <span>By Admin</span>
                    <span className="mx-4">•</span>
                    <span>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="mx-4">•</span>
                    <span>{views} views</span>
                </div>
            </div>
            {role === 'admin' && (
                <div className="flex gap-4 mx-8 pb-6 flex-wrap">
                    <motion.button
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 flex-1 flex gap-5 justify-center"
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDelete}
                    >
                        <Trash size={33} />
                        <div>Delete</div>
                    </motion.button>
                    <MotionLink
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex-1 flex gap-5 justify-center"
                        whileTap={{ scale: 0.95 }}
                        to={`/admin/blogs/edit/${_id}`}
                    >
                        <Pencil size={33} />
                        <div>Edit</div>
                    </MotionLink>
                </div>
            )}
        </motion.div>
        </Link>
    );
};

export default BlogCard;