import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MessageModal from "../../components/admin/HelpSupport/MessageModal";
import ContactCard from "../../components/admin/HelpSupport/ContactCard";
import ContactTableItems from "../../components/admin/HelpSupport/ContactTableItems";

const HelpSupport = () => {
  const [contacts, setContacts] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "123-456-7890", date: new Date("2024-01-15") },
    { id: 2, firstName: "Alice", lastName: "Smith", email: "alice@example.com", phone: "234-567-8901", date: new Date("2024-02-20") },
    { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", phone: "345-678-9012", date: new Date("2024-03-10") },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleMessage = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key].toString().toLowerCase();
    const bValue = b[sortConfig.key].toString().toLowerCase();
    return sortConfig.direction === "ascending" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });

  const filteredContacts = sortedContacts.filter((contact) => {
    const matchesSearch =
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = selectedDate
      ? contact.date.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0]
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        {/* Searchbar with Search Icon */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="relative w-full md:w-auto">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select a date"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <ContactTableItems
        filteredContacts={filteredContacts}
        handleEmail={handleEmail}
        handleCall={handleCall}
        handleMessage={handleMessage}
        handleSort={handleSort}
      />

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              handleCall={handleCall}
              handleEmail={handleEmail}
              handleMessage={handleMessage}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {isModalOpen && selectedContact && (
          <MessageModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedContact(null);
            }}
            contact={selectedContact}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpSupport;
