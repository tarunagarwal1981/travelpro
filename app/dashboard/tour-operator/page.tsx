'use client'

import { useState } from 'react'
import DashboardLayout from '../../../src/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../../src/components/ui/card'
import { Button } from '../../../src/components/ui/button'
import { Badge } from '../../../src/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../../../src/components/ui/avatar'
import { 
  Package, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Star,
  MapPin,
  Calendar,
  Users,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { demoPackages, demoBookings, monthlyRevenueData } from '../../../src/lib/data'
import { formatCurrency, formatDate, getStatusColor } from '../../../src/lib/utils'

export default function TourOperatorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  // Sample data for tour operator
  const operatorStats = {
    totalPackages: 12,
    activeBookings: 28,
    monthlyRevenue: 45780,
    avgRating: 4.8,
    newBookingsThisWeek: 8,
    completedTrips: 156,
    repeatCustomers: 68
  }

  const recentBookings = demoBookings.slice(0, 5)
  const topPackages = demoPackages.slice(0, 3)

  const recentActivity = [
    {
      type: 'booking',
      message: 'New booking received from Sarah Johnson',
      details: 'Golden Triangle Classic • $5,196 total value',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      type: 'review',
      message: 'New 5-star review received',
      details: 'Kerala Backwaters package • "Absolutely amazing experience!"',
      time: '1 hour ago',
      status: 'success'
    },
    {
      type: 'package',
      message: 'Package inquiry from travel agent',
      details: 'Michael Chen asking about group discounts',
      time: '3 hours ago',
      status: 'pending'
    },
    {
      type: 'payment',
      message: 'Payment confirmed for David Wilson',
      details: 'Himalayan Trek • $4,998 payment received',
      time: '5 hours ago',
      status: 'success'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <BookOpen className="icon" />
      case 'review': return <Star className="icon" />
      case 'package': return <Package className="icon" />
      case 'payment': return <DollarSign className="icon" />
      default: return <Activity className="icon" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'activity-success'
      case 'pending': return 'activity-pending'
      case 'warning': return 'activity-warning'
      default: return 'activity-default'
    }
  }

  return (
    <>
      <style jsx>{`
        .dashboard-grid {
          display: grid;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          opacity: 0.1;
          transform: translate(1.5rem, -1.5rem);
        }

        .stat-card-blue::before {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .stat-card-green::before {
          background: linear-gradient(135deg, #10b981, #047857);
        }

        .stat-card-purple::before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .stat-card-orange::before {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .stat-content {
          position: relative;
          z-index: 1;
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
        }

        .stat-label-blue { color: #1d4ed8; }
        .stat-label-green { color: #047857; }
        .stat-label-purple { color: #7c3aed; }
        .stat-label-orange { color: #d97706; }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .stat-icon-blue { background-color: #dbeafe; color: #1d4ed8; }
        .stat-icon-green { background-color: #d1fae5; color: #047857; }
        .stat-icon-purple { background-color: #f3e8ff; color: #7c3aed; }
        .stat-icon-orange { background-color: #fed7aa; color: #d97706; }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
          color: #1e293b;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .stat-change-positive {
          color: #059669;
        }

        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: none;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .period-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .period-btn {
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .period-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .period-btn:hover:not(.active) {
          background: #f9fafb;
        }

        .activity-feed {
          max-height: 400px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border-radius: 0.75rem;
          transition: background-color 0.15s ease;
          margin-bottom: 0.75rem;
        }

        .activity-item:hover {
          background-color: #f8fafc;
        }

        .activity-icon {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.25rem;
        }

        .activity-success { background-color: #d1fae5; color: #047857; }
        .activity-pending { background-color: #fef3c7; color: #d97706; }
        .activity-warning { background-color: #fee2e2; color: #dc2626; }
        .activity-default { background-color: #f1f5f9; color: #64748b; }

        .activity-content {
          flex: 1;
          min-width: 0;
        }

        .activity-message {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .activity-details {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0 0 0.25rem 0;
        }

        .activity-time {
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 0;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .package-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: none;
          transition: all 0.3s ease;
        }

        .package-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .package-image {
          position: relative;
          height: 12rem;
          overflow: hidden;
        }

        .package-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .package-card:hover .package-image img {
          transform: scale(1.05);
        }

        .package-badges {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .package-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .package-info {
          padding: 1.5rem;
        }

        .package-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .package-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .package-detail {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .package-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .package-price {
          display: flex;
          flex-direction: column;
        }

        .current-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .original-price {
          font-size: 0.875rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .package-actions {
          display: flex;
          gap: 0.5rem;
        }

        .booking-item {
          display: flex;
          align-items: center;
          justify-content: between;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, white 100%);
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .booking-item:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .booking-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .booking-avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .booking-info {
          flex: 1;
        }

        .booking-customer {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .booking-details {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .booking-right {
          text-align: right;
        }

        .booking-amount {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        @media (max-width: 768px) {
          .two-column-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .packages-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <DashboardLayout
        userRole="TOUR_OPERATOR"
        userName="Rajesh Kumar"
        userEmail="rajesh@incredibleindia.com"
        userAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      >
        <div className="dashboard-grid">
          {/* Welcome Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '1.5rem',
            padding: '2.5rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-2rem', right: '-2rem', width: '8rem', height: '8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>Welcome back, Rajesh! 👋</h2>
                  <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>Your tour packages are performing excellently today.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button className="btn btn-lg" style={{ backgroundColor: 'white', color: '#667eea', border: 'none' }}>
                    <Plus className="icon mr-2" />
                    Create Package
                  </Button>
                  <Button className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                    <Activity className="icon mr-2" />
                    Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-blue">Total Packages</p>
                  <div className="stat-icon stat-icon-blue">
                    <Package className="icon" />
                  </div>
                </div>
                <p className="stat-value">{operatorStats.totalPackages}</p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>+2 this month</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-green">Active Bookings</p>
                  <div className="stat-icon stat-icon-green">
                    <BookOpen className="icon" />
                  </div>
                </div>
                <p className="stat-value">{operatorStats.activeBookings}</p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>+{operatorStats.newBookingsThisWeek} this week</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-purple">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-purple">Monthly Revenue</p>
                  <div className="stat-icon stat-icon-purple">
                    <DollarSign className="icon" />
                  </div>
                </div>
                <p className="stat-value">{formatCurrency(operatorStats.monthlyRevenue)}</p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>+12% vs last month</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-orange">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-orange">Average Rating</p>
                  <div className="stat-icon stat-icon-orange">
                    <Star className="icon" />
                  </div>
                </div>
                <p className="stat-value">{operatorStats.avgRating}</p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>From 156 reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Activity */}
          <div className="two-column-grid">
            {/* Revenue Chart Placeholder */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Revenue Trends</h3>
                <div className="period-buttons">
                  {['3M', '6M', '1Y'].map((period) => (
                    <button
                      key={period}
                      className={`period-btn ${selectedPeriod.includes(period.toLowerCase()) ? 'active' : ''}`}
                      onClick={() => setSelectedPeriod(period.toLowerCase())}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ 
                height: '250px', 
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0ea5e9',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                📈 Revenue Chart Visualization
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Live Activity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '0.5rem', height: '0.5rem', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '500' }}>Live</span>
                </div>
              </div>
              <div className="activity-feed">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className={`activity-icon ${getActivityColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-details">{activity.details}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Packages */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Top Performing Packages</h3>
              <Button className="btn btn-outline">
                <Eye className="icon mr-2" />
                View All
              </Button>
            </div>
            <div className="packages-grid">
              {topPackages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-image">
                    <img
                      src={pkg.images[0]}
                      alt={pkg.title}
                    />
                    <div className="package-badges">
                      <div className="package-badge">
                        <Star className="icon" style={{ color: '#f59e0b' }} />
                        {pkg.rating}
                      </div>
                    </div>
                  </div>
                  
                  <div className="package-info">
                    <h4 className="package-title">{pkg.title}</h4>
                    <div className="package-details">
                      <div className="package-detail">
                        <MapPin className="icon" style={{ color: '#3b82f6' }} />
                        <span>{pkg.destination}</span>
                      </div>
                      <div className="package-detail">
                        <Calendar className="icon" style={{ color: '#10b981' }} />
                        <span>{pkg.duration} days</span>
                      </div>
                      <div className="package-detail">
                        <Users className="icon" style={{ color: '#8b5cf6' }} />
                        <span>{pkg.groupSize.min}-{pkg.groupSize.max} travelers</span>
                      </div>
                    </div>
                    
                    <div className="package-footer">
                      <div className="package-price">
                        <span className="current-price">{formatCurrency(pkg.price)}</span>
                        {pkg.originalPrice && (
                          <span className="original-price">{formatCurrency(pkg.originalPrice)}</span>
                        )}
                      </div>
                      <div className="package-actions">
                        <Button className="btn btn-outline">
                          <Eye className="icon" />
                        </Button>
                        <Button className="btn btn-primary">
                          <Edit className="icon" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Recent Bookings</h3>
              <Button className="btn btn-outline">
                <BookOpen className="icon mr-2" />
                View All
              </Button>
            </div>
            <div>
              {recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-left">
                    <div className="booking-avatar">
                      {booking.customerName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="booking-info">
                      <p className="booking-customer">{booking.customerName}</p>
                      <p className="booking-details">
                        {booking.package?.title} • {formatDate(booking.travelDates)}
                      </p>
                    </div>
                  </div>
                  <div className="booking-right">
                    <p className="booking-amount">{formatCurrency(booking.totalAmount)}</p>
                    <Badge className={`badge ${getStatusColor(booking.status)}`}>
                      {booking.status.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}