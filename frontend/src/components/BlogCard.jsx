import { motion } from "framer-motion";
import { ChevronRight, Pencil, ThumbsUp, Trash } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import apiClient from "../services/apiClient";
import { UserContext } from "../context/UserContext";

const BlogCard = ({  _id, title, content, date, author, views, category, image, role, likes,onDelete  }) => {
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
   const { user } = useContext(UserContext);
   console.log(likes);
   
    const MotionLink = motion.create(Link);

    function handleDelete() {
        onDelete(_id); 
    }

    useEffect(() => {
        // Check if the user has liked the post
        console.log(user);
        if(user){
        const hasLiked = likes.some((val) => val._id === user._id);
        setIsLiked(hasLiked);
        }
    }, [likes, user])
        
  async  function onLike() {
    if(user){
        const res=await apiClient.post('/blog/like/'+_id)
        console.log(res.data);
        if(res.data){
        setIsLiked(!isLiked); 
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        }
    }
 
    }

    return (
    
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
                    
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-3 hover:text-orange-500 transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{content.substring(0,200)}</p>
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
       
    );
};

export default BlogCard;