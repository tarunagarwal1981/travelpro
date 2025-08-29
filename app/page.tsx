'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import {
  Plane,
  Users,
  Bot,
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Bot className="icon-lg" style={{ color: '#3b82f6' }} />,
      title: 'AI-Powered Lead Generation',
      description:
        'Automatically generate and qualify leads using advanced AI algorithms and social media integration.',
    },
    {
      icon: <Users className="icon-lg" style={{ color: '#10b981' }} />,
      title: 'Smart Marketplace',
      description:
        'Connect travel agents with tour operators through an intelligent matching system.',
    },
    {
      icon: <TrendingUp className="icon-lg" style={{ color: '#8b5cf6' }} />,
      title: 'Revenue Optimization',
      description:
        'Maximize earnings with transparent commission tracking and automated revenue sharing.',
    },
  ];

  const stats = [
    {
      label: 'Active Agents',
      value: '2,500+',
      icon: <Users className="icon" />,
    },
    {
      label: 'Tour Packages',
      value: '15,000+',
      icon: <MapPin className="icon" />,
    },
    {
      label: 'Bookings/Month',
      value: '8,500+',
      icon: <Calendar className="icon" />,
    },
    {
      label: 'Revenue Generated',
      value: '$2.8M+',
      icon: <DollarSign className="icon" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="flex items-center space-x-2">
            <Plane className="icon-lg" style={{ color: '#3b82f6' }} />
            <span className="text-2xl font-bold gradient-text">
              TravelHub Pro
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/tour-operator" className="btn btn-ghost">
              Tour Operator
            </Link>
            <Link href="/dashboard/travel-agent" className="btn btn-ghost">
              Travel Agent
            </Link>
            <Link href="/dashboard/admin" className="btn btn-outline">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl text-center">
          <div
            className="badge mb-4"
            style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
          >
            ✨ AI-Powered Travel Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect. Book. <span className="gradient-text">Grow.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform connecting travel agents with tour operators
            through intelligent lead generation, seamless booking management,
            and AI-powered revenue optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/tour-operator"
              className="btn btn-primary btn-lg"
            >
              Start as Tour Operator
            </Link>
            <Link
              href="/dashboard/travel-agent"
              className="btn btn-outline btn-lg"
            >
              Join as Travel Agent
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card card-hover text-center backdrop-blur"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="card-content pt-6">
                  <div
                    className="flex justify-center mb-2"
                    style={{ color: '#3b82f6' }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of travel business management with
              cutting-edge features designed for growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover"
                style={{
                  border: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="card-header text-center pb-4">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <div className="card-content">
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="max-w-7xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Travel Business?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: '#dbeafe' }}
          >
            Join thousands of travel professionals who are already growing their
            business with TravelHub Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex space-x-4">
              <Link
                href="/dashboard/tour-operator"
                className="btn btn-lg"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#3b82f6',
                  border: 'none',
                }}
              >
                Tour Operator Demo
              </Link>
              <Link
                href="/dashboard/travel-agent"
                className="btn btn-lg"
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: '1px solid #ffffff',
                }}
              >
                Travel Agent Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="icon" style={{ color: '#60a5fa' }} />
            <span className="text-xl font-bold">TravelHub Pro</span>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting the world, one journey at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>© 2024 TravelHub Pro</span>
            <span>•</span>
            <span>AI-Powered Travel Platform</span>
            <span>•</span>
            <span>Demo Version</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
