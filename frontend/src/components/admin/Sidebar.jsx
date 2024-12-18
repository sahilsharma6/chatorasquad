import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Home,
  ShoppingCart,
  Book,
  Users,
  BarChart2,
  Bell,
  ShoppingBag,
  FileUser,
  UserRoundPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, isDesktop }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (label) => {
    setActiveSubmenu((prev) => (prev === label ? null : label));
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isDesktop ? 0 : -320 },
  };

  const submenuVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  return (
    <>
      {!isDesktop && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen || isDesktop ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed   left-0 top-0 overflow-auto bottom-0 w-64 bg-white shadow-lg z-20 ${
          isDesktop ? "static translate-x-0" : ""
        }`}
      >
        <div className="flex items-start p-4 border-b justify-center    ">
          <div className="flex flex-col ">
            <div className="text-2xl font-bold text-yellow-500">
              ChatoraSquad
            </div>
            {!isDesktop && (
              <img
                src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User avatar"
                className="w-16 h-16 rounded-full border-4 border-yellow-500 mt-4"
              />
            )}
          </div>
          <button onClick={toggleSidebar} className="ml-auto lg:hidden p-2">
            <X size={33} />
          </button>
        </div>
        <nav className="p-4 overflow-auto h-screen">
          {[
            { icon: Home, label: "Dashboard", active: false },
            { icon: ShoppingCart, label: "Orders", active: false },
            { icon: Book, label: "Menu", active: false, hasSubmenu: true },
            {
              icon: Users,
              label: "Customer",
              active: false,
              hasSubmenu: true,
              submenu: [
                { label: "Customer List", active: false, icon: FileUser },
                { label: "Add Customer", active: false, icon: UserRoundPlus },
              ],
            },
            { icon: BarChart2, label: "Analytics", active: true },
          ].map((item, index) => (
            <div key={index}>
              <div
                className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                  item.active
                    ? "bg-yellow-200 text-yellow-500"
                    : "hover:bg-yellow-500 hover:text-white"
                }`}
                onClick={() =>
                  item.hasSubmenu ? toggleSubmenu(item.label) : null
                }
              >
                <item.icon size={28} />
                <span className="ml-3 mr-5">{item.label}</span>
                {item.hasSubmenu ? (
                  activeSubmenu === item.label ? (
                    <ChevronUp size={30} />
                  ) : (
                    <ChevronDown size={30} />
                  )
                ) : null}
              </div>
              {item.hasSubmenu && (
                <motion.div
                  variants={submenuVariants}
                  initial="closed"
                  animate={activeSubmenu === item.label ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                  className="ml-6 overflow-hidden"
                >
                  {item.submenu &&
                    item.submenu.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center p-2 mb-1 rounded-lg cursor-pointer transition-colors hover:bg-yellow-400 hover:text-white"
                      >
                        <subItem.icon size={26} />
                        <span className="ml-3">{subItem.label}</span>
                      </div>
                    ))}
                </motion.div>
              )}
            </div>
          ))}
          {!isDesktop && (
            <>
              <div className="mt-4">
                <button className="flex items-center p-3 rounded-lg bg-yellow-500 text-white w-full justify-center">
                  Recipe Guide
                </button>
              </div>
              <div className="mt-4">
                {[
                  { icon: Bell, label: "Notifications", badge: 2 },
                  { icon: ShoppingBag, label: "Cart", badge: 3 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-yellow-500 hover:text-white"
                  >
                    <div className="relative">
                      <item.icon size={28} />
                      {item.badge > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="ml-3">{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
