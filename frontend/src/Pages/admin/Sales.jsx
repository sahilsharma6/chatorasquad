import React, { useEffect, useState } from 'react';
import Menus from '../../components/admin/sales/Menus';
import TrendingMenus from '../../components/admin/sales/TrendingMenus';
import CategoriesSidebar from '../../components/admin/sales/CategoriesSidebar';
import SalesDashboard from '../../components/admin/sales/SalesDashboard';
import apiClient from '../../services/apiClient';

const menuItems = [
  {
    id: 1,
    name: 'Watermelon Juice with Ice',
    image: 'https://previews.123rf.com/images/photodee/photodee1508/photodee150803081/43717848-watermelon-smoothies.jpg',
    rating: 3,
    reviews: 454,
    // likes: '259K',
    interest: 45,
    totalSales: 6732,
    progress: 87,
    category: 'Drink'
  },
  {
    id: 2,
    name: 'Medium Spicy Pizza with Kemangi Leaf',
    image: 'https://img.freepik.com/free-photo/side-view-pizza-with-slices-bell-pepper-pizza-slices-flour-board-cookware_176474-3185.jpg?t=st=1735302905~exp=1735306505~hmac=36760e3e8271ea2c07bc902d73f69480be66f87d0ffa7e39664b1b088806bfe0&w=360',
    rating: 2,
    reviews: 454,
    // likes: '259K',
    interest: 26,
    totalSales: 5721,
    progress: 75,
    category: 'Pizza'
  },
  {
    id: 3,
    name: 'Mozarella Pizza with Random Topping',
    image: 'https://img.freepik.com/free-photo/side-view-pizza-with-slices-bell-pepper-pizza-slices-flour-board-cookware_176474-3185.jpg?t=st=1735302905~exp=1735306505~hmac=36760e3e8271ea2c07bc902d73f69480be66f87d0ffa7e39664b1b088806bfe0&w=360',
    rating: 2,
    reviews: 454,
    // likes: '259K',
    interest: 26,
    totalSales: 3515,
    progress: 93,
    category: 'Pizza'
  }
];

const trendingItems = [
  {
    id: 1,
    name: 'Chicken curry special with cucumber',
    price: 5.6,
    orderRate: '90%',
    image: 'https://media.istockphoto.com/id/1280147779/photo/chicken-curry-iftari.jpg?s=612x612&w=0&k=20&c=THJNS9HlSd41bMK07p8fltRYbt_ez8Tdu7YHEm2xtZs='
  },
  {
    id: 2,
    name: 'Watermelon juice with Ice',
    price: 4.8,
    orderRate: '75%',
    image: 'https://previews.123rf.com/images/photodee/photodee1508/photodee150803081/43717848-watermelon-smoothies.jpg'
  },
  {
    id: 3,
    name: 'Italiano pizza with garlic',
    price: 12.3,
    orderRate: '80%',
    image: 'https://img.freepik.com/free-photo/side-view-pizza-with-slices-bell-pepper-pizza-slices-flour-board-cookware_176474-3185.jpg?t=st=1735302905~exp=1735306505~hmac=36760e3e8271ea2c07bc902d73f69480be66f87d0ffa7e39664b1b088806bfe0&w=360'
  },
  {
    id: 4,
    name: 'Tuna soup spinach with himalaya salt',
    price: 3.6,
    orderRate: '90%',
    image: 'https://www.familyfoodonthetable.com/wp-content/uploads/2023/04/Tuna-spinach-salad-1200-3.jpg'
  }
];

const categories = ['All Categories', 'Main Course', 'Pizza', 'Drink', 'Dessert', 'More'];

export default function Sales() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [getFavoir,setFavoir]=useState([])

  useEffect(()=>{
    try {
      async function FetchFavoir() {
        const res=await apiClient.get('/admin/favoritesmenu')
        console.log(res.data);
        const formattedData = res.data.reviews.map((review, index) => {
          const menuItem = review.menuId || {};
          
          return {
            id: index + 1,
            name: menuItem.name || "No Title",
            image: menuItem.images ? menuItem.images[0] : "",  // Use the first image or an empty string
            rating: review.rating,
            reviews: 1,  // Assuming each review is counted as one review
            interest: res.data.deliveredOrders.map((val)=>val.items.itemid===menuItem).length*100/res.data.menuCount, // Placeholder for interest (you can modify this logic as needed)
            totalSales: 1, // Placeholder for total sales (you can modify this logic as needed)
            progress: 100, // Placeholder for progress (you can modify this logic as needed)
            category: menuItem.type || "Unknown" // Using type or setting to "Unknown"
          };
        });
        console.log(formattedData);
        setFavoir(formattedData)
      }
      FetchFavoir()
    } catch (error) {
      
    }
  },[])


  const filteredMenuItems = selectedCategory === 'All Categories' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
    <div className ="flex gap-6 p-2 bg-gray-50 flex-wrap mx-auto">
      {/* Sidebar for Categories */}
      <div className={`fixed   inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
     <CategoriesSidebar categories={categories} isSidebarOpen={isSidebarOpen} selectedCategory={selectedCategory} setIsSidebarOpen={setIsSidebarOpen} setSelectedCategory={setSelectedCategory} />

      {/* Main Content */}
      <Menus categories={categories} selectedCategory={selectedCategory} setIsSidebarOpen={setIsSidebarOpen} filteredMenuItems={getFavoir} setSelectedCategory={setSelectedCategory} />
      {/* Trending Section */}
      <TrendingMenus trendingItems={trendingItems} />
    </div>

    <SalesDashboard />
    </>
  );
}