'use client';

import { useState } from 'react';
import DashboardLayout from '../../../src/components/layout/dashboard-layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../src/components/ui/card';
import { Button } from '../../../src/components/ui/button';
import { Badge } from '../../../src/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../src/components/ui/avatar';
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Building,
  Globe,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Settings,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  UserX,
  CreditCard,
  BarChart3,
  PieChart,
  Shield,
  Zap,
  Crown,
  Award,
} from 'lucide-react';
import {
  demoDashboardStats,
  demoUsers,
  demoPackages,
  demoBookings,
  monthlyRevenueData,
} from '../../../src/lib/data';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
} from '../../../src/lib/utils';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const platformStats = {
    totalUsers: 2847,
    totalTourOperators: 156,
    totalTravelAgents: 892,
    totalPackages: 1456,
    totalBookings: 3254,
    totalRevenue: 2847500,
    platformFee: 142375, // 5% of total revenue
    monthlyGrowth: 18.5,
    activeUsers24h: 1247,
    newUsersToday: 23,
    disputesOpen: 4,
    systemHealth: 99.8,
  };

  const recentActivity = [
    {
      type: 'user',
      message: 'New tour operator registered',
      details: 'Rajasthan Royal Tours • Requires verification',
      time: '2 hours ago',
      status: 'success',
      priority: 'medium',
    },
    {
      type: 'booking',
      message: 'High-value booking completed',
      details: '$15,000 Luxury India Tour • Commission: $750',
      time: '4 hours ago',
      status: 'success',
      priority: 'high',
    },
    {
      type: 'dispute',
      message: 'Payment dispute escalated',
      details: 'Customer vs. Golden Triangle Tours • Requires review',
      time: '6 hours ago',
      status: 'warning',
      priority: 'high',
    },
    {
      type: 'system',
      message: 'System maintenance completed',
      details: 'Database optimization • 99.9% uptime maintained',
      time: '8 hours ago',
      status: 'success',
      priority: 'low',
    },
    {
      type: 'verification',
      message: 'Travel agent verification pending',
      details: 'European Adventures Ltd • Document review needed',
      time: '1 day ago',
      status: 'pending',
      priority: 'medium',
    },
  ];

  const topPerformingAgents = demoUsers
    .filter((user) => user.role === 'TRAVEL_AGENT')
    .slice(0, 5);
  const topPerformingOperators = demoUsers
    .filter((user) => user.role === 'TOUR_OPERATOR')
    .slice(0, 5);

  const systemMetrics = [
    {
      label: 'Server Uptime',
      value: '99.8%',
      status: 'excellent',
      icon: Shield,
    },
    { label: 'Response Time', value: '245ms', status: 'good', icon: Zap },
    { label: 'Active Sessions', value: '1,247', status: 'normal', icon: Users },
    {
      label: 'Error Rate',
      value: '0.02%',
      status: 'excellent',
      icon: CheckCircle,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="icon" />;
      case 'booking':
        return <DollarSign className="icon" />;
      case 'dispute':
        return <AlertTriangle className="icon" />;
      case 'system':
        return <Settings className="icon" />;
      case 'verification':
        return <UserCheck className="icon" />;
      default:
        return <Activity className="icon" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'activity-success';
      case 'warning':
        return 'activity-warning';
      case 'pending':
        return 'activity-pending';
      case 'error':
        return 'activity-error';
      default:
        return 'activity-default';
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'excellent':
        return { color: '#10b981', bg: '#d1fae5' };
      case 'good':
        return { color: '#3b82f6', bg: '#dbeafe' };
      case 'normal':
        return { color: '#f59e0b', bg: '#fef3c7' };
      case 'poor':
        return { color: '#ef4444', bg: '#fee2e2' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  return (
    <>
      <style jsx>{`
        .dashboard-grid {
          display: grid;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

        .stat-card-purple::before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .stat-card-blue::before {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        }

        .stat-card-green::before {
          background: linear-gradient(135deg, #10b981, #047857);
        }

        .stat-card-indigo::before {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
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

        .stat-label-purple { color: #7c3aed; }
        .stat-label-blue { color: #1d4ed8; }
        .stat-label-green { color: #047857; }
        .stat-label-indigo { color: #4f46e5; }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }

        .stat-icon-purple { background-color: #f3e8ff; color: #7c3aed; }
        .stat-icon-blue { background-color: #dbeafe; color: #1d4ed8; }
        .stat-icon-green { background-color: #d1fae5; color: #047857; }
        .stat-icon-indigo { background-color: #e0e7ff; color: #4f46e5; }

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

        .stat-change-positive { color: #059669; }
        .stat-change-negative { color: #dc2626; }

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
          flex-wrap: wrap;
          gap: 1rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chart-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-icon-purple { background-color: #f3e8ff; color: #7c3aed; }
        .chart-icon-blue { background-color: #dbeafe; color: #1d4ed8; }
        .chart-icon-green { background-color: #d1fae5; color: #047857; }
        .chart-icon-red { background-color: #fee2e2; color: #dc2626; }

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
          background: #8b5cf6;
          color: white;
          border-color: #8b5cf6;
        }

        .period-btn:hover:not(.active) {
          background: #f9fafb;
        }

        .three-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .two-column-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
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
        .activity-warning { background-color: #fef3c7; color: #d97706; }
        .activity-pending { background-color: #dbeafe; color: #1d4ed8; }
        .activity-error { background-color: #fee2e2; color: #dc2626; }
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

        .performer-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, white 100%);
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          margin-bottom: 0.75rem;
        }

        .performer-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .performer-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .performer-rank {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }

        .rank-1 { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .rank-2 { background: linear-gradient(135deg, #9ca3af, #6b7280); }
        .rank-3 { background: linear-gradient(135deg, #cd7c2f, #a16207); }
        .rank-other { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

        .performer-info {
          flex: 1;
        }

        .performer-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
        }

        .performer-email {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        .performer-stats {
          text-align: right;
        }

        .performer-metric {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .performer-label {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        .system-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .metric-card {
          background: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .metric-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #64748b;
          margin: 0;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #1e293b;
        }

        @media (max-width: 1024px) {
          .three-column-grid {
            grid-template-columns: 1fr;
          }

          .two-column-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .system-metrics {
            grid-template-columns: 1fr;
          }

          .chart-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <DashboardLayout
        userRole="ADMIN"
        userName="Admin User"
        userEmail="admin@travelplatform.com"
        userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      >
        <div className="dashboard-grid">
          {/* Welcome Section */}
          <div
            style={{
              background:
                'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6366f1 100%)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-3rem',
                right: '-3rem',
                width: '10rem',
                height: '10rem',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '-2rem',
                width: '8rem',
                height: '8rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
              }}
            ></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Crown className="icon" />
                    </div>
                    <h2
                      style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        margin: 0,
                      }}
                    >
                      Platform Command Center 👑
                    </h2>
                  </div>
                  <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>
                    Monitor and manage your travel platform&apos;s performance across
                    all metrics.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button
                    className="btn btn-lg"
                    style={{
                      backgroundColor: 'white',
                      color: '#8b5cf6',
                      border: 'none',
                    }}
                  >
                    <Download className="icon mr-2" />
                    Export Report
                  </Button>
                  <Button
                    className="btn btn-outline btn-lg"
                    style={{ borderColor: 'white', color: 'white' }}
                  >
                    <Settings className="icon mr-2" />
                    Platform Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="stats-grid">
            <div className="stat-card stat-card-purple">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-purple">Total Users</p>
                  <div className="stat-icon stat-icon-purple">
                    <Users className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {platformStats.totalUsers.toLocaleString()}
                </p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>+{platformStats.monthlyGrowth}% this month</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-blue">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-blue">Total Bookings</p>
                  <div className="stat-icon stat-icon-blue">
                    <Package className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {platformStats.totalBookings.toLocaleString()}
                </p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>+156 this week</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-green">
                    Platform Revenue
                  </p>
                  <div className="stat-icon stat-icon-green">
                    <DollarSign className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {formatCurrency(platformStats.totalRevenue)}
                </p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>Fee: {formatCurrency(platformStats.platformFee)}</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-indigo">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-indigo">
                    Active Packages
                  </p>
                  <div className="stat-icon stat-icon-indigo">
                    <Globe className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {platformStats.totalPackages.toLocaleString()}
                </p>
                <div className="stat-change stat-change-positive">
                  <ArrowUpRight className="icon" />
                  <span>From {platformStats.totalTourOperators} operators</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Metrics */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <div className="chart-icon chart-icon-green">
                  <Shield className="icon" />
                </div>
                System Health &amp; Performance
              </h3>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <div
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    background: '#10b981',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  }}
                ></div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: '#10b981',
                    fontWeight: '500',
                  }}
                >
                  All Systems Operational
                </span>
              </div>
            </div>
            <div className="system-metrics">
              {systemMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const statusStyle = getMetricStatus(metric.status);
                return (
                  <div key={index} className="metric-card">
                    <div className="metric-header">
                      <p className="metric-label">{metric.label}</p>
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: statusStyle.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon
                          className="icon"
                          style={{ color: statusStyle.color }}
                        />
                      </div>
                    </div>
                    <p
                      className="metric-value"
                      style={{ color: statusStyle.color }}
                    >
                      {metric.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analytics and Activity */}
          <div className="two-column-grid">
            {/* Platform Revenue Trends */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-purple">
                    <BarChart3 className="icon" />
                  </div>
                  Platform Revenue Trends
                </h3>
                <div className="period-buttons">
                  {['3M', '6M', '1Y'].map((period) => (
                    <button
                      key={period}
                      className={`period-btn ${
                        selectedPeriod.includes(period.toLowerCase())
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => setSelectedPeriod(period.toLowerCase())}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div
                style={{
                  height: '300px',
                  background:
                    'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8b5cf6',
                  fontSize: '1rem',
                  fontWeight: '500',
                }}
              >
                📊 Revenue Analytics Visualization
              </div>
            </div>

            {/* Platform Activity */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-blue">
                    <Activity className="icon" />
                  </div>
                  Platform Activity
                </h3>
                <Badge
                  className="badge"
                  style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}
                >
                  <Clock className="icon mr-2" />
                  Live Feed
                </Badge>
              </div>
              <div className="activity-feed">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div
                      className={`activity-icon ${getActivityColor(
                        activity.status
                      )}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-content">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-details">{activity.details}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                    {activity.priority === 'high' && (
                      <div style={{ flexShrink: 0 }}>
                        <AlertTriangle
                          className="icon"
                          style={{ color: '#dc2626' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="two-column-grid">
            {/* Top Travel Agents */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-green">
                    <Award className="icon" />
                  </div>
                  Top Travel Agents
                </h3>
                <Button className="btn btn-outline">
                  <Eye className="icon mr-2" />
                  View All
                </Button>
              </div>
              <div>
                {topPerformingAgents.map((agent, index) => (
                  <div key={agent.id} className="performer-item">
                    <div className="performer-left">
                      <div
                        className={`performer-rank ${
                          index === 0
                            ? 'rank-1'
                            : index === 1
                            ? 'rank-2'
                            : index === 2
                            ? 'rank-3'
                            : 'rank-other'
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback>
                          {agent.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="performer-info">
                        <p className="performer-name">{agent.name}</p>
                        <p className="performer-email">{agent.email}</p>
                      </div>
                    </div>
                    <div className="performer-stats">
                      <p className="performer-metric">
                        ${(Math.random() * 50000 + 10000).toFixed(0)}
                      </p>
                      <p className="performer-label">Commission earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Tour Operators */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-blue">
                    <Building className="icon" />
                  </div>
                  Top Tour Operators
                </h3>
                <Button className="btn btn-outline">
                  <Eye className="icon mr-2" />
                  View All
                </Button>
              </div>
              <div>
                {topPerformingOperators.map((operator, index) => (
                  <div key={operator.id} className="performer-item">
                    <div className="performer-left">
                      <div
                        className={`performer-rank ${
                          index === 0
                            ? 'rank-1'
                            : index === 1
                            ? 'rank-2'
                            : index === 2
                            ? 'rank-3'
                            : 'rank-other'
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={operator.avatar} />
                        <AvatarFallback>
                          {operator.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="performer-info">
                        <p className="performer-name">{operator.name}</p>
                        <p className="performer-email">{operator.email}</p>
                      </div>
                    </div>
                    <div className="performer-stats">
                      <p className="performer-metric">
                        {Math.floor(Math.random() * 50 + 10)} packages
                      </p>
                      <p className="performer-label">
                        ${(Math.random() * 100000 + 50000).toFixed(0)} revenue
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Analytics and Quick Actions */}
          <div className="two-column-grid">
            {/* User Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-purple">
                    <PieChart className="icon" />
                  </div>
                  User Distribution &amp; Growth
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Badge
                    className="badge"
                    style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}
                  >
                    <Users className="icon mr-2" />
                    {platformStats.activeUsers24h} active
                  </Badge>
                  <Badge
                    className="badge"
                    style={{ backgroundColor: '#d1fae5', color: '#047857' }}
                  >
                    <UserCheck className="icon mr-2" />+
                    {platformStats.newUsersToday} today
                  </Badge>
                </div>
              </div>
              <div
                style={{
                  height: '280px',
                  background:
                    'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8b5cf6',
                  fontSize: '1rem',
                  fontWeight: '500',
                  gap: '1rem',
                }}
              >
                <div style={{ fontSize: '3rem' }}>🥧</div>
                <div>User Distribution Chart</div>
                <div
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '1rem',
                        height: '1rem',
                        background: '#3b82f6',
                        borderRadius: '50%',
                      }}
                    ></div>
                    <span>
                      Travel Agents ({platformStats.totalTravelAgents})
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '1rem',
                        height: '1rem',
                        background: '#10b981',
                        borderRadius: '50%',
                      }}
                    ></div>
                    <span>
                      Tour Operators ({platformStats.totalTourOperators})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-red">
                    <AlertTriangle className="icon" />
                  </div>
                  Quick Actions &amp; Alerts
                </h3>
                <Badge
                  className="badge"
                  style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}
                >
                  {platformStats.disputesOpen} disputes
                </Badge>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Alert Items */}
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #f59e0b',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <AlertTriangle
                      className="icon"
                      style={{ color: '#d97706' }}
                    />
                    <span style={{ fontWeight: '500', color: '#92400e' }}>
                      4 Payment Disputes
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#a16207',
                      margin: 0,
                    }}
                  >
                    Requires immediate attention from support team
                  </p>
                  <Button
                    className="btn btn-outline"
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.75rem',
                      padding: '0.375rem 0.75rem',
                    }}
                  >
                    Review Disputes
                  </Button>
                </div>

                <div
                  style={{
                    background:
                      'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #3b82f6',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <UserCheck className="icon" style={{ color: '#1d4ed8' }} />
                    <span style={{ fontWeight: '500', color: '#1e3a8a' }}>
                      7 Pending Verifications
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#1e40af',
                      margin: 0,
                    }}
                  >
                    New tour operators waiting for approval
                  </p>
                  <Button
                    className="btn btn-outline"
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.75rem',
                      padding: '0.375rem 0.75rem',
                    }}
                  >
                    Review Applications
                  </Button>
                </div>

                <div
                  style={{
                    background:
                      'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #10b981',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <DollarSign className="icon" style={{ color: '#047857' }} />
                    <span style={{ fontWeight: '500', color: '#064e3b' }}>
                      Revenue Milestone
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#065f46',
                      margin: 0,
                    }}
                  >
                    Platform crossed $2.8M in total revenue! 🎉
                  </p>
                  <Button
                    className="btn btn-outline"
                    style={{
                      marginTop: '0.75rem',
                      fontSize: '0.75rem',
                      padding: '0.375rem 0.75rem',
                    }}
                  >
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions & Platform Insights */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <div className="chart-icon chart-icon-green">
                  <CreditCard className="icon" />
                </div>
                Recent High-Value Transactions
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button className="btn btn-outline">
                  <Download className="icon mr-2" />
                  Export
                </Button>
                <Button className="btn btn-primary">
                  <Eye className="icon mr-2" />
                  View All
                </Button>
              </div>
            </div>
            <div>
              {demoBookings.slice(0, 4).map((booking, index) => (
                <div
                  key={booking.id}
                  className="performer-item"
                  style={{
                    background:
                      index % 2 === 0
                        ? 'linear-gradient(135deg, #f0fdf4 0%, white 100%)'
                        : 'linear-gradient(135deg, #eff6ff 0%, white 100%)',
                  }}
                >
                  <div className="performer-left">
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.875rem',
                      }}
                    >
                      {booking.customerName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="performer-info">
                      <p className="performer-name">{booking.customerName}</p>
                      <p className="performer-email">
                        {booking.package?.title}
                      </p>
                    </div>
                  </div>
                  <div className="performer-stats">
                    <p className="performer-metric">
                      {formatCurrency(booking.totalAmount)}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Badge
                        className={`badge ${getStatusColor(booking.status)}`}
                        style={{ fontSize: '0.6875rem' }}
                      >
                        {booking.status.toLowerCase()}
                      </Badge>
                      <p className="performer-label">
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Insights Summary */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <div className="chart-icon chart-icon-purple">
                  <TrendingUp className="icon" />
                </div>
                Platform Insights &amp; Performance Summary
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Badge
                  className="badge"
                  style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}
                >
                  <TrendingUp className="icon mr-2" />
                  Growing
                </Badge>
                <Badge
                  className="badge"
                  style={{ backgroundColor: '#d1fae5', color: '#047857' }}
                >
                  <CheckCircle className="icon mr-2" />
                  Healthy
                </Badge>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  metric: 'Platform Growth Rate',
                  value: `+${platformStats.monthlyGrowth}%`,
                  description: 'Monthly user acquisition',
                  trend: 'up',
                  color: '#10b981',
                },
                {
                  metric: 'Average Booking Value',
                  value: formatCurrency(
                    platformStats.totalRevenue / platformStats.totalBookings
                  ),
                  description: 'Per transaction revenue',
                  trend: 'up',
                  color: '#3b82f6',
                },
                {
                  metric: 'System Reliability',
                  value: `${platformStats.systemHealth}%`,
                  description: 'Uptime this month',
                  trend: 'stable',
                  color: '#8b5cf6',
                },
                {
                  metric: 'Customer Satisfaction',
                  value: '4.8/5',
                  description: 'Based on 1,247 reviews',
                  trend: 'up',
                  color: '#f59e0b',
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  style={{
                    background:
                      'linear-gradient(135deg, #f8fafc 0%, white 100%)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: `${insight.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                    }}
                  >
                    <TrendingUp
                      className="icon"
                      style={{ color: insight.color }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#64748b',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {insight.metric}
                  </h4>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: insight.color,
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    {insight.value}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                      margin: 0,
                    }}
                  >
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}