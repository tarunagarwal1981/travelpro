'use client';

import { useState, useMemo } from 'react';
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
import { Input } from '../../../src/components/ui/input';
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Star,
  Eye,
  MessageSquare,
  Search,
  Filter,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Heart,
  Award,
  ArrowUpRight,
  BookOpen,
  Globe,
  Percent,
  Activity,
} from 'lucide-react';
import {
  demoLeads,
  demoPackages,
  demoBookings,
  leadSourceData,
} from '../../../src/lib/data';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getPriorityColor,
} from '../../../src/lib/utils';

export default function TravelAgentDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackageCategory, setSelectedPackageCategory] = useState('all');

  // Enhanced agent stats with more realistic data
  const agentStats = {
    totalLeads: 127,
    activeDeals: 23,
    monthlyCommission: 18750,
    conversionRate: 72.8,
    avgDealSize: 2340,
    leadsThisWeek: 12,
    closingRate: 68.5,
    totalBookings: 89,
  };

  // Enhanced lead data with better filtering
  const filteredLeads = useMemo(() => {
    let filtered = demoLeads;

    if (selectedFilter !== 'all') {
      if (selectedFilter === 'urgent') {
        filtered = filtered.filter(
          (lead) => lead.priority === 'HIGH' || lead.status === 'INTERESTED'
        );
      } else {
        filtered = filtered.filter(
          (lead) => lead.priority === selectedFilter.toUpperCase()
        );
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.destination?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedFilter, searchTerm]);

  // Package filtering
  const filteredPackages = useMemo(() => {
    let filtered = demoPackages;

    if (selectedPackageCategory !== 'all') {
      filtered = filtered.filter(
        (pkg) => pkg.category.toLowerCase() === selectedPackageCategory
      );
    }

    return filtered.slice(0, 8);
  }, [selectedPackageCategory]);

  const recentBookings = demoBookings.slice(0, 4);

  // Activity feed data
  const activityFeed = [
    {
      type: 'lead',
      message: 'New high-priority lead from Emma Thompson',
      details: 'Golden Triangle package inquiry • Budget: $5,000',
      time: '2 minutes ago',
      status: 'new',
      priority: 'high',
    },
    {
      type: 'booking',
      message: 'Booking confirmed for David Wilson',
      details: 'Himalayan Trek • Commission earned: $750',
      time: '1 hour ago',
      status: 'success',
      priority: 'medium',
    },
    {
      type: 'proposal',
      message: 'Proposal viewed by Lisa Brown',
      details: 'Kerala Backwaters package • Opened 3 times',
      time: '2 hours ago',
      status: 'progress',
      priority: 'medium',
    },
    {
      type: 'lead',
      message: 'Follow-up required for Michael Chen',
      details: 'Mumbai Culture Tour • Last contact: 3 days ago',
      time: '4 hours ago',
      status: 'pending',
      priority: 'high',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <Target className="icon" />;
      case 'booking':
        return <CheckCircle className="icon" />;
      case 'proposal':
        return <Eye className="icon" />;
      case 'package':
        return <Package className="icon" />;
      default:
        return <Clock className="icon" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'activity-success';
      case 'new':
        return 'activity-new';
      case 'progress':
        return 'activity-progress';
      case 'pending':
        return 'activity-pending';
      default:
        return 'activity-default';
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
          color: #059669;
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

        .chart-icon-red { background-color: #fef2f2; color: #dc2626; }
        .chart-icon-blue { background-color: #eff6ff; color: #2563eb; }
        .chart-icon-green { background-color: #f0fdf4; color: #16a34a; }

        .search-filter-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .search-bar {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.15s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          position: relative;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          background: white;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .filter-btn:hover:not(.active) {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .filter-badge {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .filter-btn.active .filter-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .lead-card {
          background: linear-gradient(135deg, #f8fafc 0%, white 100%);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .lead-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .lead-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .lead-info-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .lead-avatar {
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

        .lead-details {
          flex: 1;
        }

        .lead-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .lead-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }

        .lead-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .lead-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .lead-meta-label {
          color: #64748b;
        }

        .lead-meta-value {
          color: #1e293b;
          font-weight: 500;
        }

        .lead-actions {
          display: flex;
          gap: 0.5rem;
        }

        .package-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
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
          height: 10rem;
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

        .package-badges-overlay {
          position: absolute;
          top: 0.75rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 0.75rem;
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
          font-size: 1rem;
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
          gap: 1rem;
        }

        .package-pricing {
          display: flex;
          flex-direction: column;
        }

        .package-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
        }

        .package-commission {
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 500;
        }

        .package-actions {
          display: flex;
          gap: 0.5rem;
        }

        .activity-feed {
          max-height: 320px;
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
        .activity-new { background-color: #dbeafe; color: #1d4ed8; }
        .activity-progress { background-color: #f3e8ff; color: #7c3aed; }
        .activity-pending { background-color: #fef3c7; color: #d97706; }
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

        .two-column-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .two-column-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .package-grid {
            grid-template-columns: 1fr;
          }

          .lead-meta {
            grid-template-columns: 1fr;
          }

          .chart-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .search-filter-section {
            flex-direction: column;
          }
        }
      `}</style>

      <DashboardLayout
        userRole="TRAVEL_AGENT"
        userName="Sarah Johnson"
        userEmail="sarah@globetrotter.co.uk"
        userAvatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      >
        <div className="dashboard-grid">
          {/* Welcome Section */}
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
                top: '-2rem',
                right: '-2rem',
                width: '8rem',
                height: '8rem',
                background: 'rgba(255,255,255,0.1)',
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
                  <h2
                    style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    Good morning, Sarah! ☀️
                  </h2>
                  <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: 0 }}>
                    You have 5 hot leads and 3 proposals ready to close today.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button
                    className="btn btn-lg"
                    style={{
                      backgroundColor: 'white',
                      color: '#10b981',
                      border: 'none',
                    }}
                  >
                    <Plus className="icon mr-2" />
                    Add Lead
                  </Button>
                  <Button
                    className="btn btn-outline btn-lg"
                    style={{ borderColor: 'white', color: 'white' }}
                  >
                    <Search className="icon mr-2" />
                    Find Packages
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
                  <p className="stat-label stat-label-blue">Active Leads</p>
                  <div className="stat-icon stat-icon-blue">
                    <Target className="icon" />
                  </div>
                </div>
                <p className="stat-value">{agentStats.totalLeads}</p>
                <div className="stat-change">
                  <ArrowUpRight className="icon" />
                  <span>+{agentStats.leadsThisWeek} this week</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-green">Conversion Rate</p>
                  <div className="stat-icon stat-icon-green">
                    <Zap className="icon" />
                  </div>
                </div>
                <p className="stat-value">{agentStats.conversionRate}%</p>
                <div className="stat-change">
                  <TrendingUp className="icon" />
                  <span>Above industry avg</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-purple">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-purple">
                    Monthly Commission
                  </p>
                  <div className="stat-icon stat-icon-purple">
                    <DollarSign className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {formatCurrency(agentStats.monthlyCommission)}
                </p>
                <div className="stat-change">
                  <ArrowUpRight className="icon" />
                  <span>+24% vs last month</span>
                </div>
              </div>
            </div>

            <div className="stat-card stat-card-orange">
              <div className="stat-content">
                <div className="stat-header">
                  <p className="stat-label stat-label-orange">Avg Deal Size</p>
                  <div className="stat-icon stat-icon-orange">
                    <Award className="icon" />
                  </div>
                </div>
                <p className="stat-value">
                  {formatCurrency(agentStats.avgDealSize)}
                </p>
                <div className="stat-change">
                  <ArrowUpRight className="icon" />
                  <span>Growing steadily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Analytics and Activity Feed */}
          <div className="two-column-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Performance Analytics</h3>
                <Badge
                  className="badge"
                  style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}
                >
                  <TrendingUp className="icon mr-2" />
                  Trending Up
                </Badge>
              </div>
              <div
                style={{
                  height: '250px',
                  background:
                    'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0ea5e9',
                  fontSize: '1rem',
                  fontWeight: '500',
                }}
              >
                📊 Performance Chart Visualization
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">
                  <div className="chart-icon chart-icon-blue">
                    <Activity className="icon" />
                  </div>
                  Live Activity
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
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
                      fontSize: '0.75rem',
                      color: '#10b981',
                      fontWeight: '500',
                    }}
                  >
                    Live
                  </span>
                </div>
              </div>
              <div className="activity-feed">
                {activityFeed.map((activity, index) => (
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
                        <AlertCircle
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

          {/* Priority Leads Section */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <div className="chart-icon chart-icon-red">
                  <Zap className="icon" />
                </div>
                Priority Leads
              </h3>
              <div className="search-filter-section">
                <div className="search-bar">
                  <Search className="search-icon icon" />
                  <input
                    className="search-input"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-buttons">
                  {[
                    { key: 'all', label: 'All', count: demoLeads.length },
                    { key: 'urgent', label: 'Urgent', count: 5 },
                    { key: 'high', label: 'High', count: 8 },
                    { key: 'medium', label: 'Medium', count: 12 },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      className={`filter-btn ${
                        selectedFilter === filter.key ? 'active' : ''
                      }`}
                      onClick={() => setSelectedFilter(filter.key)}
                    >
                      {filter.label}
                      <span className="filter-badge">{filter.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="lead-card">
                  <div className="lead-header">
                    <div className="lead-info-left">
                      <div className="lead-avatar">
                        {lead.customerName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="lead-details">
                        <h4 className="lead-name">{lead.customerName}</h4>
                        <div className="lead-badges">
                          <Badge
                            className={`badge ${getPriorityColor(
                              lead.priority
                            )}`}
                          >
                            <AlertCircle className="icon mr-2" />
                            {lead.priority}
                          </Badge>
                          <Badge
                            className={`badge ${getStatusColor(lead.status)}`}
                          >
                            {lead.status.replace('_', ' ').toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="lead-actions">
                      <Button className="btn btn-outline">
                        <Phone className="icon" />
                      </Button>
                      <Button className="btn btn-outline">
                        <Mail className="icon" />
                      </Button>
                      <Button className="btn btn-primary">
                        <MessageSquare className="icon mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>

                  <div className="lead-meta">
                    <div className="lead-meta-item">
                      <MapPin className="icon" style={{ color: '#3b82f6' }} />
                      <span className="lead-meta-label">Destination:</span>
                      <span className="lead-meta-value">
                        {lead.destination}
                      </span>
                    </div>
                    {lead.travelDates && (
                      <div className="lead-meta-item">
                        <Calendar
                          className="icon"
                          style={{ color: '#10b981' }}
                        />
                        <span className="lead-meta-label">Travel Date:</span>
                        <span className="lead-meta-value">
                          {formatDate(lead.travelDates)}
                        </span>
                      </div>
                    )}
                    {lead.budget && (
                      <div className="lead-meta-item">
                        <DollarSign
                          className="icon"
                          style={{ color: '#8b5cf6' }}
                        />
                        <span className="lead-meta-label">Budget:</span>
                        <span className="lead-meta-value">
                          {formatCurrency(lead.budget)}
                        </span>
                      </div>
                    )}
                    {lead.groupSize && (
                      <div className="lead-meta-item">
                        <Users className="icon" style={{ color: '#f59e0b' }} />
                        <span className="lead-meta-label">Group Size:</span>
                        <span className="lead-meta-value">
                          {lead.groupSize} travelers
                        </span>
                      </div>
                    )}
                  </div>

                  {lead.requirements && (
                    <div
                      style={{
                        padding: '1rem',
                        background: '#f8fafc',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#64748b',
                        marginTop: '1rem',
                      }}
                    >
                      <strong style={{ color: '#1e293b' }}>
                        Requirements:
                      </strong>{' '}
                      {lead.requirements}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hot Deals & Trending Packages */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <div
                  className="chart-icon chart-icon-red"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                    color: 'white',
                  }}
                >
                  <Heart className="icon" />
                </div>
                Hot Deals & Trending Packages
              </h3>
              <div className="filter-buttons">
                {[
                  { key: 'all', label: 'All Categories' },
                  { key: 'cultural', label: 'Cultural' },
                  { key: 'adventure', label: 'Adventure' },
                  { key: 'relaxation', label: 'Relaxation' },
                ].map((category) => (
                  <button
                    key={category.key}
                    className={`filter-btn ${
                      selectedPackageCategory === category.key ? 'active' : ''
                    }`}
                    onClick={() => setSelectedPackageCategory(category.key)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="package-grid">
              {filteredPackages.map((pkg, index) => (
                <div key={pkg.id} className="package-card">
                  <div className="package-image">
                    <img src={pkg.images[0]} alt={pkg.title} />
                    <div className="package-badges-overlay">
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        {index < 2 && (
                          <div
                            className="package-badge"
                            style={{
                              backgroundColor: '#dc2626',
                              color: 'white',
                            }}
                          >
                            <Zap className="icon" />
                            Hot Deal
                          </div>
                        )}
                        <div className="package-badge">
                          <Star className="icon" style={{ color: '#f59e0b' }} />
                          {pkg.rating}
                        </div>
                      </div>
                      <div
                        className="package-badge"
                        style={{ backgroundColor: '#10b981', color: 'white' }}
                      >
                        <Percent className="icon" />
                        15% comm
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
                        <Calendar
                          className="icon"
                          style={{ color: '#10b981' }}
                        />
                        <span>{pkg.duration} days</span>
                      </div>
                      <div className="package-detail">
                        <Globe className="icon" style={{ color: '#8b5cf6' }} />
                        <span className="capitalize">{pkg.category}</span>
                      </div>
                    </div>

                    <div className="package-footer">
                      <div className="package-pricing">
                        <span className="package-price">
                          {formatCurrency(pkg.price)}
                        </span>
                        <span className="package-commission">
                          {formatCurrency(pkg.price * 0.15)} commission
                        </span>
                      </div>
                      <div className="package-actions">
                        <Button className="btn btn-outline">
                          <Eye className="icon" />
                        </Button>
                        <Button className="btn btn-primary">
                          <BookOpen className="icon" />
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
              <h3 className="chart-title">
                <div className="chart-icon chart-icon-green">
                  <CheckCircle className="icon" />
                </div>
                Recent Bookings
              </h3>
              <Button className="btn btn-outline">
                <Eye className="icon mr-2" />
                View All
              </Button>
            </div>
            <div>
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="lead-card"
                  style={{
                    background:
                      'linear-gradient(135deg, #f0fdf4 0%, white 100%)',
                  }}
                >
                  <div className="lead-header">
                    <div className="lead-info-left">
                      <div
                        className="lead-avatar"
                        style={{
                          background:
                            'linear-gradient(135deg, #10b981, #3b82f6)',
                        }}
                      >
                        {booking.customerName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="lead-details">
                        <h4 className="lead-name">{booking.customerName}</h4>
                        <div className="lead-badges">
                          <Badge
                            className={`badge ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            <CheckCircle className="icon mr-2" />
                            {booking.status.toLowerCase()}
                          </Badge>
                          <Badge
                            className={`badge ${getStatusColor(
                              booking.paymentStatus
                            )}`}
                          >
                            {booking.paymentStatus.toLowerCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        textAlign: 'right',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: '#047857',
                          fontWeight: '500',
                          margin: '0 0 0.25rem 0',
                        }}
                      >
                        Commission Earned
                      </p>
                      <p
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#065f46',
                          margin: 0,
                        }}
                      >
                        {formatCurrency(booking.agentCommission)}
                      </p>
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: '#047857',
                          margin: '0.25rem 0 0 0',
                        }}
                      >
                        {(
                          (booking.agentCommission / booking.totalAmount) *
                          100
                        ).toFixed(1)}
                        % rate
                      </p>
                    </div>
                  </div>

                  <div className="lead-meta">
                    <div className="lead-meta-item">
                      <Package className="icon" style={{ color: '#3b82f6' }} />
                      <span className="lead-meta-label">Package:</span>
                      <span className="lead-meta-value">
                        {booking.package?.title}
                      </span>
                    </div>
                    <div className="lead-meta-item">
                      <Calendar className="icon" style={{ color: '#10b981' }} />
                      <span className="lead-meta-label">Travel Date:</span>
                      <span className="lead-meta-value">
                        {formatDate(booking.travelDates)}
                      </span>
                    </div>
                    <div className="lead-meta-item">
                      <Users className="icon" style={{ color: '#8b5cf6' }} />
                      <span className="lead-meta-label">Group Size:</span>
                      <span className="lead-meta-value">
                        {booking.groupSize} travelers
                      </span>
                    </div>
                    <div className="lead-meta-item">
                      <DollarSign
                        className="icon"
                        style={{ color: '#f59e0b' }}
                      />
                      <span className="lead-meta-label">Total Value:</span>
                      <span className="lead-meta-value">
                        {formatCurrency(booking.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {booking.notes && (
                    <div
                      style={{
                        padding: '1rem',
                        background: '#f0fdf4',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#16a34a',
                        marginTop: '1rem',
                        border: '1px solid #bbf7d0',
                      }}
                    >
                      <strong style={{ color: '#15803d' }}>Notes:</strong>{' '}
                      {booking.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
