import { motion } from "framer-motion";
import { Camera, Check, PencilLine, Save, X } from "lucide-react";

export default function ProfileTab({activeTab,setEditedProfile,setHasChanges,setIsEditing,isEditing,fileInputRef,contentVariants,profilePicture,profile,hasChanges,handleInputChange,handleProfilePictureChange,handleSave,editedProfile,}){
    
    return (
        <>
         {activeTab === 'profile' && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200"
                                >
                                    <img
                                        src={profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full shadow-lg"
                                >
                                    <Camera size={20} />
                                </motion.button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleProfilePictureChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                            {!isEditing ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(true)}
                                    className="text-orange-500 hover:text-orange-600"
                                >
                                    <PencilLine size={30} />
                                </motion.button>
                            ) : (
                                <div className="flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSave}
                                        className="text-green-500 hover:text-green-600"
                                    >
                                        <Check size={30} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedProfile(profile);
                                            setHasChanges(false);
                                        }}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <X size={30} />
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(profile).map(([key, value]) => (
                                <div key={key} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-600 capitalize">
                                        {key}
                                    </label>
                                    {isEditing ? (

                                      key==='gender'?  (
                                            <select
                                                value={editedProfile[key]}
                                                onChange={(e) => handleInputChange(key, e.target.value)}
                                                className="w-full p-2 py-4 border border-amber-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        ):(
                                            <input
                                                type="text"
                                                value={editedProfile[key]}
                                                onChange={(e) => handleInputChange(key, e.target.value)}
                                                className="w-full p-2 py-4 border border-amber-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        )
                                    ) : (
                                        <p className="text-gray-800">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Save Changes Button */}
                        {hasChanges && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="flex justify-end mt-6"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSave}
                                    className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    <Save size={20} />
                                    <span>Save Changes</span>
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

        </>
    )
}