import AdminDashboard from "@/components/modules/Dashboard/AdminDashboard";
import { getAllBookings } from "@/services/admin/bookingsManagement";
import { getGuides } from "@/services/admin/guidesManagement";
import { getTourists } from "@/services/admin/touristsManagement";
import { getAllTours } from "@/services/admin/toursManagement";
import { DashboardData } from "@/services/Dashboard/AdminDashboard";

const AdminDashboardPage = async() => {
const data=await DashboardData();
console.log(data);
    return <div>
 <AdminDashboard />
    </div>;
  };
  
  export default AdminDashboardPage;
  