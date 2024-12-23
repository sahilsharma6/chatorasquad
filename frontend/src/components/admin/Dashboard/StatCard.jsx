import { motion } from "framer-motion";


export default  ({ icon: Icon, value, label, className }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${className}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-3xl font-bold">{value}</h3>
          <p className="text-gray-500 text-sm">{label}</p>
        </div>
      </div>
    </motion.div>
  );