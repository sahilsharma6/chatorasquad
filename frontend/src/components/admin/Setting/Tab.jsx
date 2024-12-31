import { motion } from "framer-motion"

export default function Tab({tabs,tabVariants,setActiveTab,activeTab}){
return (
    <div className="flex space-x-6 border-b border-amber-200 mb-8 flex-wrap justify-center">
                    {tabs.map(({ id, icon: Icon, label }) => (
                        <motion.button
                            key={id}
                            variants={tabVariants}
                            animate={activeTab === id ? 'active' : 'inactive'}
                            className={`pb-4 px-4 flex items-center space-x-2 font-medium ${activeTab === id
                                    ? 'border-b-2 border-orange-500 text-orange-600'
                                    : 'text-gray-500'
                                }`}
                            onClick={() => setActiveTab(id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon size={30} />
                            <span>{label}</span>
                        </motion.button>
                    ))}
                </div>
)
}