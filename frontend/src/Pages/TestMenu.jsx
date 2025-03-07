import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Search } from 'lucide-react';
import apiClient from '../services/apiClient';
import ProtectedRoute from '../components/ProtectedRoutes';
import OrderNow from './users/OrderNow';
import ViewCart from './users/ViewCart';

const TestMenu = () => {
    const getCart=JSON.parse( localStorage.getItem('cartItems')) || []
    console.log(getCart);
    
    const [cart, setCart] = useState(getCart);
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: 'Saatu Paratha',
            price: 100,
            image: 'https://chatorasquad.in/api/uploads/1740064702348-sattu.jpeg',
            category: 'BREAKFAST & SNACKS',
            quantity: 1
        },
        {
            id: 2,
            name: 'Panner Paratha',
            price: 150,
            image: 'https://chatorasquad.in/api/uploads/1740064827468-panner.jpg',
            category: 'BREAKFAST & SNACKS',
            quantity: 0
        }
    ]);

    const [activeCategory, setActiveCategory] = useState('Indian');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [categories, setCategories] = useState([
        'BREAKFAST & SNACKS',
        'RICE/DAL',
        'MAIN COURSE',
        'SOUTH INDIAN',
        'FAST FOOD',
        'COMBO & THALI',
        'BREADS',
        'DRINKS & DESERTS',
        'extras'
    ])
    const [searchItem,setSearchItem]=useState('')
    const [open,setOpen]=useState(false)

    useEffect(() => {
        try {
            async function GetCategories() {
                const res = await apiClient.get('/menu/getItemsWithCategory')
                console.log(res.data);
                // console.log());

                if (res.data) {
                    
                    setCategories(res.data.map(val => val.name))
                    setActiveCategory(res.data[1].name)
                }
            }

            async function GetMenus(){
              const res=await  apiClient.get('/menu/all')
              console.log(res.data);
              if(res.data.menu) {
                const convertedData = res.data.menu.map((item, index) => ({
                    id: item._id,
                    name: item.name,
                    price: item.discountedPrice,
                    image: item.images[0].replace(/\\/g, '/'), // Convert backslashes to slashes for URL
                    category: item.Cuisine, // You can modify this logic based on your needs
                    quantity: item.isAvailable ? 1 : 0
                }));
                setMenuItems(convertedData)}
              
            }

            GetCategories()
            GetMenus()
        } catch (error) {

        }
    }, [])
console.log(menuItems);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
            localStorage.setItem(JSON.stringify(cart.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )))
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
            localStorage.setItem('cartItems',JSON.stringify( [...cart, { ...item, quantity: 1 }]))
        }

        // Animation for cart icon
        setIsCartOpen(true);
        setTimeout(() => setIsCartOpen(false), 1000);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
        localStorage.setItem('cartItems',JSON.stringify(cart.filter((item) => item.id !== itemId)))
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCart(
            cart.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        localStorage.setItem('cartItems',JSON.stringify(  cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        )))
    };

    const updateMenuItemQuantity = (itemId, newQuantity) => {
        setMenuItems(
            menuItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );

        // If item exists in cart, update there too
        const cartItem = cart.find(item => item.id === itemId);
        if (cartItem) {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const gst = Math.round(cartTotal * 0.05);
    const finalTotal = cartTotal + gst;

    // Filter menu items by active category
    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = item.category === activeCategory;
        const matchesName = item.name.toLowerCase().includes(searchItem.toLowerCase());
        const matchesPrice = item.price >= Number(searchItem) || item.price <= Number(searchItem);
        return matchesCategory &&( matchesName || matchesPrice );
    });
    console.log(filteredItems);
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Search Bar */}
            <div className="p-4  border-gray-200">
                <div className="relative max-w-4xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-orange-400"
                        onChange={(e)=>setSearchItem(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full">
                {/* Categories - Sidebar on Desktop, Horizonta l scroll on Mobile */}
                <motion.div
                    className="md:w-48 md:min-w-48 md:flex-shrink-0 md:border-r border-gray-200 md:h-screen md:overflow-y-auto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Desktop Categories */}
                    <div className="hidden md:block p-4 fixed">
                        <h2 className="font-bold mb-4">Menu Categories</h2>
                        <ul>
                            {categories.map((category) => (
                                <motion.li
                                    key={category}
                                    className={`font-bold text-lg p-3 my-1 rounded-md cursor-pointer ${activeCategory === category
                                            ? 'bg-orange-100 text-orange-600'
                                            : 'hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveCategory(category)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {category}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Categories - Horizontal Scroll */}
                    <div className="md:hidden overflow-x-auto whitespace-nowrap p-2 border-b border-gray-200 sticky">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`px-4 py-2 mx-1 rounded-md inline-block ${activeCategory === category
                                        ? 'bg-orange-100 text-orange-600 border-b-2 border-orange-500'
                                        : 'text-gray-600'
                                    }`}
                                onClick={() => setActiveCategory(category)}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="flex-1 p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-xl md:text-2xl font-bold mb-4">{activeCategory}</h1>

                    <div className="grid gap-6 ">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="border border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row flex-wrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="md:w-1/2 w-full">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${item.image}` }
                                        alt={item.name}
                                        className="w-full h-60 object-cover"
                                    />
                                </div>
                                <div className="p-4 md:w-1/2  justify-between">
                                    <div>
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-lg">{item.name}</h3>
                                            <span className="font-bold">₹{item.price}</span>
                                        </div>
                                    </div>

                                    {/* Quantity selector or Add to Cart button */}
                                    {cart.find(cartItem => cartItem.id === item.id) ? (
                                        <div className="flex items-center mt-4 flex-wrap">
                                            <motion.button
                                                whileTap={{ scale: 0.8 }}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                                onClick={() => updateMenuItemQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={16} />
                                            </motion.button>

                                            <span className="mx-3">{item.quantity}</span>

                                            <motion.button
                                                whileTap={{ scale: 0.8 }}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                                                onClick={() => updateMenuItemQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={16} />
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md "
                                            onClick={() => addToCart(item)}
                                        >
                                            Add to Cart
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Cart - Fixed on Mobile, Sidebar on Desktop */}
                <AnimatePresence>
                    {(cart.length > 0 || true) && (
                        <motion.div
                            className="hidden md:block md:w-64 md:border-l  md:h-screen md:overflow-y-auto mb-4 "
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-4 border shadow-md rounded-md fixed w-64 h-4/5 overflow-auto mb-9">
                                <h2 className="font-bold text-xl mb-4 text-center">Your Cart</h2>

                                {cart.length === 0 ? (
                                    <div className="p-6 flex flex-col h-60 gap-5 justify-center text-gray-500 items-center">
                                        <ShoppingCart size={100} />
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>

                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                className="flex justify-between items-center mb-4 border-b pb-3"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-gray-600">₹{item.price}</p>
                                                </div>

                                                <div className="flex items-center">
                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus size={12} />
                                                    </motion.button>

                                                    <span className="mx-2">{item.quantity}</span>

                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={12} />
                                                    </motion.button>

                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="ml-2 text-red-500"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <X size={16} />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))}

                                        <div className="mt-6 border-t pt-4">
                                            <div className="flex justify-between mb-2">
                                                <span>Subtotal</span>
                                                <span>₹{cartTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>GST (5%)</span>
                                                <span>₹{gst.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg mt-2">
                                                <span>Total</span>
                                                <span>₹{finalTotal.toFixed(2)}</span>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="w-full mt-4 py-3 bg-orange-500 text-white rounded-md font-medium"
                                                onClick={()=>setOpen(true)}
                                            >
                                                Proceed to Checkout
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Cart Icon - Fixed at bottom */}
            <div className="md:hidden fixed bottom-4 right-4 z-10">
                <motion.button
                    className="bg-orange-500 text-white p-4 rounded-full shadow-lg relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    animate={isCartOpen ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                        <motion.div
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                        >
                            {cart.reduce((total, item) => total + item.quantity, 0)}
                        </motion.div>
                    )}
                </motion.button>
            </div>

            {/* Mobile Cart Panel */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                        />
                        <motion.div
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-30 max-h-[80vh] overflow-y-auto md:hidden"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold text-xl">Your Cart</h2>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsCartOpen(false)}
                                    >
                                        <X size={24} />
                                    </motion.button>
                                </div>

                                {cart.length === 0 ? (
                                    <p className="text-gray-500">Your cart is empty</p>
                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                className="flex justify-between items-center mb-4 border-b pb-3"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-gray-600">₹{item.price}</p>
                                                </div>

                                                <div className="flex items-center">
                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus size={12} />
                                                    </motion.button>

                                                    <span className="mx-2">{item.quantity}</span>

                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={12} />
                                                    </motion.button>

                                                    <motion.button
                                                        whileTap={{ scale: 0.8 }}
                                                        className="ml-2 text-red-500"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <X size={16} />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))}

                                        <div className="mt-6 border-t pt-4">
                                            <div className="flex justify-between mb-2">
                                                <span>Subtotal</span>
                                                <span>₹{cartTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                                <span>GST (5%)</span>
                                                <span>₹{gst.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-lg mt-2">
                                                <span>Total</span>
                                                <span>₹{finalTotal.toFixed(2)}</span>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="w-full mt-4 py-3 bg-orange-500 text-white rounded-md font-medium"
                                                onClick={()=>setOpen(true)}
                                            >
                                                Proceed to Checkout
                                            </motion.button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
           { open &&<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg p-6 w-full max-w-full relative overflow-auto max-h-screen"
      >
        <button
          onClick={()=>setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={30} className='hover:bg-yellow-100 transition-all delay-100 rounded-full' />
        </button>
                 <ProtectedRoute allowedRoles={["admin", "user"]}>
                              <ViewCart />
                            </ProtectedRoute>
                            </motion.div>
            </div>
}
        </div>
    );
};

export default TestMenu;