import { motion } from "framer-motion"

export function Pagination ({currentPage, setCurrentPage, totalPages}) {
    
    return (
        <div className="flex space-x-2 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            disabled={currentPage === 1}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            {currentPage}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            disabled={currentPage === totalPages}
          >
            Next
          </motion.button>
        </div>
    )
}