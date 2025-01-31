import { useEffect ,useState} from "react";
import OrderCharts from "../../components/admin/Orders/OrdersCharts";
import OrdersTable from "../../components/admin/Orders/OrdersTable";
import StatsDashboard from "../../components/admin/Orders/StatsCard";
import apiClient from "../../services/apiClient";
export default function (){
const [getOrder,setOrder] = useState([]);
     useEffect(() => {
          document.title = "ChatoraSquad's Admin"
          try {
               
               async function fetchOrderData() {
                    const res=await apiClient.get('/admin/orders');
                console.log(res.data);
                setOrder(res.data.orders);
                }  
                
                fetchOrderData();
          } catch (error) {
               
          }
     },[]);
     return <div className="overflow-hidden" >
          <StatsDashboard getOrders={getOrder} />
          <OrdersTable />
          <OrderCharts />
     </div>
}