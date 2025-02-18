import { motion } from "framer-motion"; 
import { Bell, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom";    

export default function SideBarItems({sidebarItems, activeSubmenu, submenuVariants, isDesktop, toggleSubmenu}) {
  const location = useLocation();
  
  return (
    <nav className="p-4 overflow-y-auto max-h-[calc(100vh-220px)]">
      {sidebarItems.map((item, index) => (
        <div key={index}>
          <div
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
              location.pathname === item.path
                ? "bg-yellow-200 text-yellow-500"
                : "hover:bg-yellow-500 hover:text-white"
            }`}
            onClick={() => (item.hasSubmenu ? toggleSubmenu(item.label) : null)}
          >
            {item.hasSubmenu ? (
              <>
                <item.icon size={28} />
                <span className="ml-3 mr-auto">{item.label}</span>
                {activeSubmenu === item.label ? (
                  <ChevronUp size={30} />
                ) : (
                  <ChevronDown size={30} />
                )}
              </>
            ) : (
              <Link to={item.path} className="flex items-center w-full">
                <item.icon size={28} />
                <span className="ml-3">{item.label}</span>
              </Link>
            )}
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
                  <Link to={subItem.path} key={subIndex}>
                    <div
                      className={`flex items-center p-2 mb-1 rounded-lg cursor-pointer transition-colors ${
                        location.pathname === subItem.path
                          ? "bg-yellow-300 text-yellow-600"
                          : "hover:bg-yellow-400 hover:text-white"
                      }`}
                    >
                      <subItem.icon size={26} />
                      <span className="ml-3">{subItem.label}</span>
                    </div>
                  </Link>
                ))}
            </motion.div>
          )}
        </div>
      ))}
       
      {!isDesktop && (
        <div className="mt-4 space-y-4">
          <button className="flex items-center p-3 rounded-lg bg-orange-500 text-white w-full justify-center">
            Recipe Guide
          </button>
          
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
      )}
    </nav>
  );
}