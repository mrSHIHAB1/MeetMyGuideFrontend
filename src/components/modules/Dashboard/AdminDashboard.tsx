"use client" 
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign,User,NotebookPen, ShoppingCart, Bell, Search, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
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
        { name: 'Desktop', value: 45 },
        { name: 'Mobile', value: 35 },
        { name: 'Tablet', value: 20 },
      ];
    
      const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b'];
    
      const stats = [
        { title: 'Total Bookings', value: '$45,231', change: '+20.1%', trend: 'up', icon: NotebookPen, color: 'from-violet-500 to-purple-600' },
        { title: 'Total Tourists', value: '12,426', change: '+15.3%', trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-600' },
        { title: 'Total Guides', value: '8,234', change: '-3.2%', trend: 'down', icon: User, color: 'from-pink-500 to-rose-600' },
        { title: 'Growth Rate', value: '24.5%', change: '+4.1%', trend: 'up', icon: TrendingUp, color: 'from-amber-500 to-orange-600' },
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John! 👋</h2>
              <p className="text-slate-600">Here's what's happening with your business today.</p>
            </div>
    
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {stat.change}
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
                    <h3 className="text-lg font-semibold text-slate-900">Revenue & Orders</h3>
                    <p className="text-sm text-slate-500 mt-1">Weekly performance metrics</p>
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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Traffic Sources</h3>
                <p className="text-sm text-slate-500 mb-6">Device distribution</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Monthly Sales</h3>
                    <p className="text-sm text-slate-500 mt-1">Sales performance over time</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
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
                    <Bar dataKey="value" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
    
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Recent Activity</h3>
                <p className="text-sm text-slate-500 mb-6">Latest customer actions</p>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{activity.user}</p>
                        <p className="text-xs text-slate-500">{activity.action}</p>
                        <p className="text-xs font-semibold text-violet-600 mt-1">{activity.amount}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      
    
  </div>;
};
export default AdminDashboard;