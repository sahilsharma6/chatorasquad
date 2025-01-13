import { AnimatePresence, motion } from "framer-motion"
import { Pencil, Trash } from "lucide-react"

export default function CategoriesTable({filteredCategories,handleEdit,openDeleteModal}){
    
    return (
        <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredCategories.map((category) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-gray-800">{category.name}</td>
                    <td className="px-6 py-4 text-gray-600">{category.date.split("T")[0]}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(category)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-150"
                        >
                          <Pencil className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(category)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-150"
                        >
                          <Trash className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    )
}