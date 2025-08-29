'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Plane,
  Menu,
  X,
  LayoutDashboard,
  Package,
  Users,
  BookOpen,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Home,
} from 'lucide-react';
import { cn, getInitials } from '../../lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'TOUR_OPERATOR' | 'TRAVEL_AGENT' | 'ADMIN';
  userName: string;
  userAvatar?: string;
  userEmail: string;
}

export default function DashboardLayout({
  children,
  userRole,
  userName,
  userAvatar,
  userEmail,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getNavItems = () => {
    const baseItems = [
      { href: '/', label: 'Home', icon: Home },
      {
        href: `/dashboard/${userRole.toLowerCase().replace('_', '-')}`,
        label: 'Dashboard',
        icon: LayoutDashboard,
      },
    ];

    if (userRole === 'TOUR_OPERATOR') {
      return [
        ...baseItems,
        {
          href: `/dashboard/tour-operator/packages`,
          label: 'Packages',
          icon: Package,
        },
        {
          href: `/dashboard/tour-operator/bookings`,
          label: 'Bookings',
          icon: BookOpen,
        },
        {
          href: `/dashboard/tour-operator/analytics`,
          label: 'Analytics',
          icon: TrendingUp,
        },
      ];
    }

    if (userRole === 'TRAVEL_AGENT') {
      return [
        ...baseItems,
        { href: `/dashboard/travel-agent/leads`, label: 'Leads', icon: Users },
        {
          href: `/dashboard/travel-agent/packages`,
          label: 'Browse Packages',
          icon: Package,
        },
        {
          href: `/dashboard/travel-agent/bookings`,
          label: 'Bookings',
          icon: BookOpen,
        },
        {
          href: `/dashboard/travel-agent/analytics`,
          label: 'Analytics',
          icon: TrendingUp,
        },
      ];
    }

    if (userRole === 'ADMIN') {
      return [
        ...baseItems,
        { href: `/dashboard/admin/users`, label: 'Users', icon: Users },
        {
          href: `/dashboard/admin/packages`,
          label: 'All Packages',
          icon: Package,
        },
        {
          href: `/dashboard/admin/bookings`,
          label: 'All Bookings',
          icon: BookOpen,
        },
        {
          href: `/dashboard/admin/analytics`,
          label: 'Platform Analytics',
          icon: TrendingUp,
        },
        {
          href: `/dashboard/admin/settings`,
          label: 'Settings',
          icon: Settings,
        },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const getRoleColor = () => {
    switch (userRole) {
      case 'TOUR_OPERATOR':
        return 'role-badge-operator';
      case 'TRAVEL_AGENT':
        return 'role-badge-agent';
      case 'ADMIN':
        return 'role-badge-admin';
      default:
        return 'role-badge-default';
    }
  };

  const formatRole = (role: string) => {
    return role
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f8fafc;
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 16rem;
          background-color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateX(-100%);
          transition: transform 0.2s ease-in-out;
          z-index: 50;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
          padding: 0 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .sidebar-nav {
          margin-top: 1.5rem;
          padding: 0 1rem;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          margin: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.15s ease;
          text-decoration: none;
          color: #64748b;
          font-weight: 500;
        }

        .nav-link:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }

        .nav-link.active {
          background-color: #eff6ff;
          color: #1d4ed8;
          border-right: 4px solid #3b82f6;
        }

        .user-profile {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
          background-color: #f8fafc;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-details {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1e293b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .role-badge-operator {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .role-badge-agent {
          background-color: #dcfce7;
          color: #166534;
        }

        .role-badge-admin {
          background-color: #f3e8ff;
          color: #7c3aed;
        }

        .role-badge-default {
          background-color: #f1f5f9;
          color: #475569;
        }

        .main-content {
          margin-left: 0;
          transition: margin-left 0.2s ease-in-out;
        }

        .top-bar {
          background-color: white;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid #e2e8f0;
        }

        .top-bar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
          padding: 0 1.5rem;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 12px;
          height: 12px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .page-content {
          padding: 1.5rem;
        }

        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0);
          }
          
          .main-content {
            margin-left: 16rem;
          }
          
          .sidebar-overlay {
            display: none;
          }
          
          .menu-button {
            display: none;
          }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn('sidebar', sidebarOpen && 'open')}>
        <div className="sidebar-header">
          <div className="flex items-center space-x-2">
            <Plane className="icon-lg" style={{ color: '#3b82f6' }} />
            <span className="text-xl font-bold gradient-text">
              TravelHub Pro
            </span>
          </div>
          <Button
            className="btn btn-ghost menu-button"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="icon" />
          </Button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="nav-item">
                  <Link href={item.href}>
                    <div className={cn('nav-link', isActive && 'active')}>
                      <Icon className="icon" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-info">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>
            <div className="user-details">
              <p className="user-name">{userName}</p>
              <p className="user-email">{userEmail}</p>
              <Badge
                className={cn('badge', getRoleColor())}
                style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}
              >
                {formatRole(userRole)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
        <header className="top-bar">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <Button
                className="btn btn-ghost menu-button"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="icon" />
              </Button>
              <h1 className="page-title">
                {navItems.find((item) => item.href === pathname)?.label ||
                  'Dashboard'}
              </h1>
            </div>

            <div className="top-bar-right">
              <Button
                className="btn btn-ghost"
                style={{ position: 'relative' }}
              >
                <Bell className="icon" />
                <span className="notification-badge"></span>
              </Button>
              <Button className="btn btn-ghost">
                <Search className="icon" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
