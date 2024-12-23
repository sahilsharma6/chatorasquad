import OrderCharts from "../../components/admin/Orders/OrdersCharts";
import OrdersTable from "../../components/admin/Orders/OrdersTable";
import StatsDashboard from "../../components/admin/Orders/StatsCard";

export default function (){
     return <div className="overflow-hidden" >
          <StatsDashboard />
          <OrdersTable />
          <OrderCharts />
     </div>
}