import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone } from "lucide-react";


const ContactCard = ({ contact ,handleEmail,handleCall,handleMessage }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {contact.firstName} {contact.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{contact.date.toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleCall(contact.phone)}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
          >
            <Phone className="h-5 w-5" size={39} />
          </button>
          <button
            onClick={() => handleEmail(contact.email)}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
          >
            <Mail className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleMessage(contact)}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {contact.phone}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          {contact.email}
        </p>
      </div>
    </motion.div>
  );

  export default ContactCard