export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'TOUR_OPERATOR' | 'TRAVEL_AGENT';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  avatar?: string;
  createdAt: Date;
}

export interface TourOperator {
  id: string;
  userId: string;
  companyName: string;
  description?: string;
  location: string;
  phone: string;
  user: User;
}

export interface TravelAgent {
  id: string;
  userId: string;
  agencyName: string;
  location: string;
  phone: string;
  user: User;
}

export interface Package {
  id: string;
  tourOperatorId: string;
  title: string;
  description: string;
  destination: string;
  duration: number; // in days
  price: number;
  originalPrice?: number;
  inclusions: string[];
  exclusions: string[];
  images: string[];
  rating?: number;
  reviews?: number;
  isActive: boolean;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: { min: number; max: number };
  createdAt: Date;
  updatedAt: Date;
  tourOperator?: TourOperator;
}

export interface Lead {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination?: string;
  travelDates?: Date;
  groupSize?: number;
  budget?: number;
  requirements?: string;
  status:
    | 'NEW'
    | 'CONTACTED'
    | 'INTERESTED'
    | 'PROPOSAL_SENT'
    | 'CONVERTED'
    | 'LOST';
  source?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Booking {
  id: string;
  leadId: string;
  packageId: string;
  travelAgentId: string;
  tourOperatorId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDates: Date;
  groupSize: number;
  totalAmount: number;
  agentCommission: number;
  platformFee: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  createdAt: Date;
  updatedAt: Date;
  lead?: Lead;
  package?: Package;
  travelAgent?: User;
  tourOperator?: User;
}

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activePackages: number;
  newLeads: number;
  conversionRate: number;
  monthlyGrowth: number;
}
