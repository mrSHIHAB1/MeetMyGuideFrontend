import AdminDashboard from "@/components/modules/Dashboard/AdminDashboard";
import { DashboardData } from "@/services/Dashboard/AdminDashboard";

const AdminDashboardPage = async() => {
const data=await DashboardData();

    return <div>
 <AdminDashboard data={data.data} />
    </div>;
  };
  
  export default AdminDashboardPage;
  