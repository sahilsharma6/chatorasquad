import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, MoveDown, MoveUp, X } from "lucide-react";
import TableModal from "../../components/admin/offers/TableModal";
import SparklineChart from "../../components/admin/offers/SparklineChart";
import apiClient from "../../services/apiClient";
import { Pagination } from "../../components/Pagination";

const AdminOfferPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDate, setSelectedItemDate] = useState(null);
  const [offer, setOffer] = useState(0);
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPage,setTotalPage]=useState(0)
  const limit=1000

  useEffect(()=>{
    try {
      async function FetchMenu(){
        const res=await apiClient.get('/menu/all?page='+currentPage+'&limit='+limit)
        console.log(res.data);
        if(res.data.menu){
        const transformedMenu = res.data.menu.map((item) => ({
          id: item._id, // Set id as menuid using the original _id
          name: item.name,
          price: item.sellingPrice,
          offer: Math.round( ((item.sellingPrice - item.discountedPrice) / item.sellingPrice) * 100*10)/10,
          date: item.createdAt.split("T")[0] ,// Extracting the date from createdAt
          offerDates: item.offerDates
      }));
      console.log(transformedMenu);
      setMenuItems(transformedMenu)
      setCurrentPage(res.data.currentPage)
      setTotalPage(res.data.totalPages)
      }
    }
      
      FetchMenu()
    } catch (error) {
      
    }
  },[currentPage,totalPage])

  const toggleSort = (column) => {
    const sortedItems = [...menuItems].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      return sortOrder === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
    setMenuItems(sortedItems);
  };

  const handleCellClick = (item) => {
    setSelectedItem(item);
    setSelectedItemDate(item.offerDates.end.split('T')[0])
    setOffer(item.offer || 0);
    setIsModalOpen(true);
  };
console.log(totalPage);

  const handleUpdateOffer = () => {
    async function updateDiscountedPrice(){ 
       try {
      const dis=(100-offer)*selectedItem.price/100
      console.log(dis);
      
      const res=await apiClient.put('/menu/updateprice/'+selectedItem.id,{
        discountedPrice:dis,
        end:selectedItemDate
      })
      console.log(res.data);
      if(res.data){
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedItem.id ? { 
              ...item, 
              offer, 
              
            }  : item
          )
        );
        setIsModalOpen(false);
      }
      
    }catch (error) {
    
  }
}
updateDiscountedPrice()
    
  };

  const filteredItems = menuItems.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Admin Offer Page</h1>
      {/* Filters */}
      <div className="flex gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-4 w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto shadow-lg py-4">
        {/* Table */}
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="table-auto w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4">Name</th>
              <th className="p-4 cursor-pointer" onClick={() => toggleSort("price")}>
                <div className="flex">Selling Price</div>
                {sortColumn === "price" && (sortOrder === "asc" ? <MoveUp /> : <MoveDown />)}
              </th>
              <th className="p-4 cursor-pointer" onClick={() => toggleSort("offer")}>
                <div className="flex">Offer (%)</div>
                {sortColumn === "offer" && (sortOrder === "asc" ? <MoveUp /> : <MoveDown />)}
              </th>
              <th className="p-4">Offer Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <motion.tr
                key={item.id}
                className="hover:bg-orange-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleCellClick(item)}
              >
                <td className="p-4 border">{item.name}</td>
                <td className="p-4 border flex"><IndianRupee className="mt-1" /> {item.price}</td>
                <td className="p-4 border">{item.offer}%</td>
                <td className="p-4 border">  {item.offerDates.end.split('T')[0]}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage} />
      </div>

      {/* Modal */}
      <TableModal 
        selectedItem={selectedItem} 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        offer={offer} 
        setOffer={setOffer} 
        handleUpdateOffer={handleUpdateOffer} 
        setEndDate={setSelectedItemDate}
        endDate={selectedItemDate}
      />
      <SparklineChart data={menuItems} />
    </div>
  );
};

export default AdminOfferPage;
