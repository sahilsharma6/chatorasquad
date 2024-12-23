import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
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
  Rows4,
  ChefHat,
  BookmarkPlus,
  Activity,
  Settings,
  BadgeHelp
} from "lucide-react";
import { GiOpenedFoodCan } from "react-icons/gi";
import { PiBowlFood } from "react-icons/pi";
import { BiSolidReport, BiSolidOffer } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { IoIosPersonAdd } from "react-icons/io";
import SideBarItems from "./SideBarItems";

const Sidebar = ({ isOpen, toggleSidebar, isDesktop }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation(); // Get the current location

  const toggleSubmenu = (label) => {
    setActiveSubmenu((prev) => (prev === label ? null : label));
  };

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: isDesktop ? 0 : -355 },
  };

  const submenuVariants = {
    open: { height: "auto", opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  // Define sidebar items with paths
  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    {
      icon: Book,
      label: "Menu",
      path: "/admin/menu",
      hasSubmenu: true,
      submenu: [
        { label: "View Menu", path: "/admin/menu/view", icon: ChefHat },
        { label: "Add Menu", path: "/admin/menu/add", icon: BookmarkPlus },
        { label: "View Cuisines", path: "/admin/cuisines/view", icon: PiBowlFood },
        { label: "Add Cuisine", path: "/admin/cuisines/add", icon: GiOpenedFoodCan },
      ]
    },
    {
      icon: Users,
      label: "Customer",
      path: "/admin/customers",
      hasSubmenu: true,
      submenu: [
        { label: "Customer List", path: "/admin/customers/list", icon: FileUser },
        { label: "Add Customers", path: "/admin/customers/add", icon: IoIosPersonAdd },
      ],
    },
    { label: "Offers", path: "/admin/offers", icon: BiSolidOffer },
    {
      icon: BiSolidReport,
      label: "Reports",
      path: "/admin/reports",
      hasSubmenu: true,
      submenu: [
        { label: "Sales Reports", path: "/admin/reports/sales", icon: FileUser },
        { label: "Inventory Reports", path: "/admin/reports/inventory", icon: FcSalesPerformance },
        { label: "Activity", path: "/admin/reports/activity", icon: Activity },
      ],
    },
    { icon: BadgeHelp, label: "Help & Supports", path: "/admin/help" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

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
        className={`fixed left-0 top-0 overflow-auto bottom-0 md:w-72 bg-white shadow-lg z-20 ${isDesktop ? "static translate-x-0" : ""
          }`}
      >
        <div className="flex items-start p-4 border-b justify-center">
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-yellow-500">ChatoraSquad</div>
            {!isDesktop && (
              <img
                src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User  avatar"
                className="w-16 h-16 rounded-full border-4 border-yellow-500 mt-4"
              />
            )}
          </div>
          <button onClick={toggleSidebar} className="ml-auto lg:hidden p-2">
            <X size={33} />
          </button>
        </div>
        <SideBarItems sidebarItems={sidebarItems} activeSubmenu={activeSubmenu} submenuVariants={submenuVariants} isDesktop={isDesktop} toggleSubmenu={toggleSubmenu} />
      </motion.div>
    </>
  );
};

export default Sidebar;