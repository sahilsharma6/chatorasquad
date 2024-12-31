import { motion } from "framer-motion";


export default function CategoriesSidebar({isSidebarOpen,categories,selectedCategory,setIsSidebarOpen,setSelectedCategory}){

    return (
        <div className={`fixed h-screen overflow-auto  top-0 left-0 w-64 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <div className="flex flex-col mt-4">
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
                onClick={() => {
                  setSelectedCategory(category);
                  setIsSidebarOpen(false); // Close sidebar on selection
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
}