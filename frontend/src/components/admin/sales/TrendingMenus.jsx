import { motion } from "framer-motion"


export default function TrendingMenus ({trendingItems}){

    return (
       < div className="w-72 sm:w-full max-w-full md:w-full lg:w-72">
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Daily Trending Menus</h2>
          <p className="text-gray-500 text-sm mb-6">Lorem ipsum dolor</p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 items-center"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    #{item.id}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold">${item.price}</span>
                    <span className="text-gray-500 text-sm">Order {item.orderRate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    )
}