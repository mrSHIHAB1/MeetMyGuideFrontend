import { serverFetch } from "@/lib/server-fetch"

export const DashboardData=async()=> {
try{
    const res=await serverFetch.get('/dashboard/stats');
    const data=await res.json();
    return data;

}  
catch(error:any){
    console.log(error);
    return {
        success: false,
        message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch dashboard data'}`
    };
}}