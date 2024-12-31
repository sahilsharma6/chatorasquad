import { motion } from "framer-motion"
import { Bell, Globe, Moon, Sun } from "lucide-react"

export default function AppearanceTab({activeTab,contentVariants,language,setIsDarkMode,isDarkMode,notifications,setLanguage,setNotifications}){
    
    return (
        <>
        {activeTab === 'appearance' && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Language Selection */}
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <Globe className="text-orange-500" size={24} />
                                <div>
                                    <h3 className="font-medium text-gray-800">Language</h3>
                                    <p className="text-sm text-gray-600">Select your preferred language</p>
                                </div>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="p-2 border border-amber-200 rounded bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                            </select>
                        </div>

                        {/* Dark Mode Toggle */}
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                {isDarkMode ? (
                                    <Moon className="text-orange-500" size={24} />
                                ) : (
                                    <Sun className="text-orange-500" size={24} />
                                )}
                                <div>
                                    <h3 className="font-medium text-gray-800">Dark Mode</h3>
                                    <p className="text-sm text-gray-600">Toggle dark mode on/off</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${isDarkMode ? 'bg-orange-500' : 'bg-gray-300'
                                    }`}
                            >
                                <motion.div
                                    className="w-5 h-5 bg-white rounded-full shadow-md"
                                    animate={{ x: isDarkMode ? 24 : 2 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </motion.button>
                        </div>

                        {/* Notifications Toggle */}
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <Bell className="text-orange-500" size={24} />
                                <div>
                                    <h3 className="font-medium text-gray-800">Notifications</h3>
                                    <p className="text-sm text-gray-600">Enable/disable notifications</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${notifications ? 'bg-orange-500' : 'bg-gray-300'
                                    }`}
                            >
                                <motion.div
                                    className="w-5 h-5 bg-white rounded-full shadow-md"
                                    animate={{ x: notifications ? 24 : 2 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
        </>
    )
}