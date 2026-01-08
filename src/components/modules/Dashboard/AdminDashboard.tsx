"use client" 
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign,User,NotebookPen, ShoppingCart, Bell, Search, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminDashboard = ({data}: {data: any}) => {
  const router = useRouter();
  console.log("Dashboard data:", data);
    const salesData = [
        { month: 'Jan', value: 4200 },
        { month: 'Feb', value: 3800 },
        { month: 'Mar', value: 5100 },
        { month: 'Apr', value: 4600 },
        { month: 'May', value: 6200 },
        { month: 'Jun', value: 5800 },
      ];
    
      const revenueData = [
        { day: 'Mon', revenue: 2400, orders: 1200 },
        { day: 'Tue', revenue: 1398, orders: 900 },
        { day: 'Wed', revenue: 9800, orders: 4200 },
        { day: 'Thu', revenue: 3908, orders: 2100 },
        { day: 'Fri', revenue: 4800, orders: 2800 },
        { day: 'Sat', revenue: 3800, orders: 2200 },
        { day: 'Sun', revenue: 4300, orders: 2400 },
      ];
    
      const distributionData = [
        { name: 'Completed', value: 15 },
        { name: 'Cancelled', value: 5 },
        { name: 'Pending', value: 8 },
      ];
    
      const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b'];
    
      const stats = [
          { title: 'Total Bookings', value: data.totalBookings,  trend: 'up', icon: NotebookPen, color: 'from-violet-500 to-purple-600', route: '/admin/dashboard/bookings-management' },
          { title: 'Total Tourists', value: data.totalTourists,  trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-600', route:'/dashboard/tourists-management' },
          { title: 'Total Guides', value: data.totalGuides,  trend: 'up', icon: User, color: 'from-pink-500 to-rose-600', route: '/dashboard/guides-management'},
          { title: 'Total PAID', value: data.totalPaid,  trend: 'up', icon: DollarSign, color: 'from-amber-500 to-orange-600', route: '/admin/dashboard/bookings-management'},
        ];
    
      const recentActivity = [
        { user: 'Sarah Johnson', action: 'Made a purchase', amount: '$125.00', time: '2 min ago' },
        { user: 'Mike Chen', action: 'Signed up', amount: 'New user', time: '15 min ago' },
        { user: 'Emma Williams', action: 'Made a purchase', amount: '$89.50', time: '1 hour ago' },
        { user: 'David Brown', action: 'Left a review', amount: '5 stars', time: '2 hours ago' },
      ];
  return <div>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          {/* Header */}
          
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-8 ">
            {/* Welcome Section */}
           
    
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                       {stat.route && <button onClick={() => router.push(stat.route)} className="cursor-pointer"><ArrowUpRight size={24} /> </button>}
                
                    </div>
                  </div>
                  <h3 className="text-slate-500 text-sm mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
    
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Bookings</h3>
                    <p className="text-sm text-slate-500 mt-1">Time Wise Bookings</p>
                  </div>
                  <select className="px-3 py-2 bg-slate-100 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: 'none', 
                        borderRadius: '12px', 
                        color: '#fff',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                      }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
    
              {/* Distribution Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Tour Stats</h3>
                <p className="text-sm text-slate-500 mb-6">Success distribution</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-3">
                  {distributionData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                        <span className="text-sm text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    
            {/* Bottom Section */}
            
              {/* Recent Activity */}
              
          </main>
        </div>
      
    
  </div>;
};
export default AdminDashboard;