import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export default function Menus({categories,selectedCategory,setIsSidebarOpen,filteredMenuItems,setSelectedCategory}){

    return (
        <div className="flex-1">
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold">Most Favorites Items</h2>
              <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur</p>
            </div>
            
            <div className="hidden md:flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Button to toggle sidebar */}
            <button className="md:hidden p-2 bg-gray-200 rounded" onClick={() => setIsSidebarOpen(true)}>
              <Filter />
            </button>
          </div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-shadow flex-wrap"
              >
                <div className="flex gap-4 items-center flex-wrap">
                  <img
                    src={ import.meta.env.VITE_API_URL + "/" + item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="flex flex-wrap">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < item.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">({item.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500 mt-1 flex-wrap">
                      <span>♥</span>
                      <span className="text-sm">{item.likes} like it</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 flex-wrap">
                  <div>
                    <div className="text-2xl font-bold">{item.interest}%</div>
                    <div className="text-gray-500 text-sm"> Interest</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{item.totalSales}</div>
                    <div className="text-gray-500 text-sm">Total Sales</div>
                  </div>
                  <div className="w-16 h-16 relative">
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-yellow-200"
                      style={{
                        background: `conic-gradient(yellow ${item.progress * 3.6}deg, transparent 0deg)`
                      }}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{item.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    )
}