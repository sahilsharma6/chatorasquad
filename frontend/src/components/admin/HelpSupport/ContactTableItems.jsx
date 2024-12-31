import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Mail, MessageSquare, Phone } from "lucide-react";

export default function ContactTableItems({filteredContacts,handleSort,handleMessage,handleEmail,handleCall}){
    return (
        <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort('firstName')}
                  className="font-semibold text-gray-600 flex items-center hover:text-gray-900"
                >
                  First Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort('email')}
                  className="font-semibold text-gray-600 flex items-center hover:text-gray-900"
                >
                  Email
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort('phone')}
                  className="font-semibold text-gray-600 flex items-center hover:text-gray-900"
                >
                  Phone
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
              </th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredContacts.map((contact) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{contact.firstName}</td>
                  <td className="px-6 py-4">{contact.lastName}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.phone}</td>
                  <td className="px-6 py-4">{contact.date.toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCall(contact.phone)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                      >
                        <Phone className="h-4 w-4 hover:bg-orange-100 transition-all delay-100  hover rounded-full" />
                      </button>
                      <button
                        onClick={() => handleEmail(contact.email)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMessage(contact)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    )
}