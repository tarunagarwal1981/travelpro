import {
  User,
  TourOperator,
  TravelAgent,
  Package,
  Lead,
  Booking,
  DashboardStats,
} from '../types';

// Demo Users
export const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@travelplatform.com',
    name: 'Admin User',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'rajesh@incredibleindia.com',
    name: 'Rajesh Kumar',
    role: 'TOUR_OPERATOR',
    status: 'ACTIVE',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    email: 'priya@mumbaitours.com',
    name: 'Priya Sharma',
    role: 'TOUR_OPERATOR',
    status: 'ACTIVE',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b9b1a75f?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    email: 'sarah@globetrotter.co.uk',
    name: 'Sarah Johnson',
    role: 'TRAVEL_AGENT',
    status: 'ACTIVE',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '5',
    email: 'michael@adventureus.com',
    name: 'Michael Chen',
    role: 'TRAVEL_AGENT',
    status: 'ACTIVE',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-02-05'),
  },
];

// Demo Tour Operators
export const demoTourOperators: TourOperator[] = [
  {
    id: '1',
    userId: '2',
    companyName: 'Incredible India Tours',
    description:
      'Premier tour operator specializing in authentic Indian experiences',
    location: 'New Delhi, India',
    phone: '+91-11-2234-5678',
    user: demoUsers[1],
  },
  {
    id: '2',
    userId: '3',
    companyName: 'Mumbai Heritage Tours',
    description: 'Discover the cultural heritage of Mumbai and Maharashtra',
    location: 'Mumbai, India',
    phone: '+91-22-9876-5432',
    user: demoUsers[2],
  },
];

// Demo Travel Agents
export const demoTravelAgents: TravelAgent[] = [
  {
    id: '1',
    userId: '4',
    agencyName: 'Globe Trotter UK',
    location: 'London, UK',
    phone: '+44-20-7123-4567',
    user: demoUsers[3],
  },
  {
    id: '2',
    userId: '5',
    agencyName: 'Adventure US',
    location: 'New York, USA',
    phone: '+1-212-555-0123',
    user: demoUsers[4],
  },
];

// Demo Packages
export const demoPackages: Package[] = [
  {
    id: '1',
    tourOperatorId: '1',
    title: 'Golden Triangle Classic',
    description:
      "Experience India's most iconic destinations: Delhi, Agra, and Jaipur. Visit the magnificent Taj Mahal, explore historic Red Fort, and discover the Pink City's royal palaces.",
    destination: 'Delhi - Agra - Jaipur',
    duration: 7,
    price: 1299,
    originalPrice: 1599,
    inclusions: [
      'Accommodation in 4-star hotels',
      'All meals',
      'Private transportation',
      'English-speaking guide',
      'Monument entrance fees',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
    ],
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop',
    ],
    rating: 4.8,
    reviews: 127,
    isActive: true,
    category: 'Cultural',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 12 },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    tourOperator: demoTourOperators[0],
  },
  {
    id: '2',
    tourOperatorId: '1',
    title: 'Himalayan Adventure Trek',
    description:
      'Embark on an unforgettable journey through the breathtaking Himalayas. Trek through scenic valleys, visit remote mountain villages, and experience the serenity of high-altitude landscapes.',
    destination: 'Manali - Leh - Ladakh',
    duration: 14,
    price: 2499,
    originalPrice: 2899,
    inclusions: [
      'Camping equipment',
      'Professional trek leader',
      'All meals during trek',
      'Permits and fees',
      'Medical kit',
    ],
    exclusions: [
      'Personal trekking gear',
      'Insurance',
      'Emergency evacuation',
      'Extra meals in cities',
    ],
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    ],
    rating: 4.9,
    reviews: 89,
    isActive: true,
    category: 'Adventure',
    difficulty: 'Challenging',
    groupSize: { min: 4, max: 8 },
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12'),
    tourOperator: demoTourOperators[0],
  },
  {
    id: '3',
    tourOperatorId: '2',
    title: 'Mumbai Street Food & Culture',
    description:
      "Dive into Mumbai's vibrant street food scene and rich cultural heritage. Explore bustling markets, taste authentic local cuisine, and discover hidden gems of the Maximum City.",
    destination: 'Mumbai',
    duration: 3,
    price: 399,
    originalPrice: 499,
    inclusions: [
      'Food tastings',
      'Local guide',
      'Transportation',
      'Cultural performances',
    ],
    exclusions: ['Accommodation', 'Additional meals', 'Shopping expenses'],
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595133748484-a30e18e0e7b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&h=600&fit=crop',
    ],
    rating: 4.6,
    reviews: 203,
    isActive: true,
    category: 'Cultural',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 15 },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    tourOperator: demoTourOperators[1],
  },
  {
    id: '4',
    tourOperatorId: '1',
    title: 'Kerala Backwaters & Beaches',
    description:
      "Relax and rejuvenate in God's Own Country. Cruise through tranquil backwaters, enjoy pristine beaches, and experience traditional Ayurvedic treatments in Kerala.",
    destination: 'Kochi - Alleppey - Kovalam',
    duration: 10,
    price: 1899,
    originalPrice: 2199,
    inclusions: [
      'Houseboat accommodation',
      'Ayurvedic spa sessions',
      'Beach resort stay',
      'All transfers',
      'Traditional meals',
    ],
    exclusions: [
      'Flights',
      'Alcohol',
      'Personal expenses',
      'Optional activities',
    ],
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580550103016-1154c93fae02?w=800&h=600&fit=crop',
    ],
    rating: 4.7,
    reviews: 156,
    isActive: true,
    category: 'Relaxation',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 10 },
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18'),
    tourOperator: demoTourOperators[0],
  },
];

// Demo Leads
export const demoLeads: Lead[] = [
  {
    id: '1',
    userId: '4',
    customerName: 'Emma Thompson',
    customerEmail: 'emma.thompson@email.com',
    customerPhone: '+44-7123-456789',
    destination: 'India - Golden Triangle',
    travelDates: new Date('2024-04-15'),
    groupSize: 4,
    budget: 5000,
    requirements:
      'Looking for cultural experiences, comfortable accommodation, and vegetarian meal options.',
    status: 'INTERESTED',
    source: 'Website Inquiry',
    priority: 'HIGH',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-22'),
    user: demoUsers[3],
  },
  {
    id: '2',
    userId: '5',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@email.com',
    customerPhone: '+1-555-0123',
    destination: 'Himalayas - Adventure Trek',
    travelDates: new Date('2024-05-20'),
    groupSize: 2,
    budget: 6000,
    requirements:
      'Experienced trekkers looking for challenging routes and authentic mountain experiences.',
    status: 'PROPOSAL_SENT',
    source: 'Social Media',
    priority: 'HIGH',
    createdAt: new Date('2024-02-21'),
    updatedAt: new Date('2024-02-23'),
    user: demoUsers[4],
  },
  {
    id: '3',
    userId: '4',
    customerName: 'Lisa Brown',
    customerEmail: 'lisa.brown@email.com',
    customerPhone: '+44-7987-654321',
    destination: 'Kerala Backwaters',
    travelDates: new Date('2024-03-10'),
    groupSize: 2,
    budget: 3500,
    requirements:
      'Honeymoon trip, looking for romantic settings and relaxation.',
    status: 'NEW',
    source: 'Referral',
    priority: 'MEDIUM',
    createdAt: new Date('2024-02-24'),
    updatedAt: new Date('2024-02-24'),
    user: demoUsers[3],
  },
];

// Demo Bookings
export const demoBookings: Booking[] = [
  {
    id: '1',
    leadId: '1',
    packageId: '1',
    travelAgentId: '4',
    tourOperatorId: '2',
    customerName: 'Emma Thompson',
    customerEmail: 'emma.thompson@email.com',
    customerPhone: '+44-7123-456789',
    travelDates: new Date('2024-04-15'),
    groupSize: 4,
    totalAmount: 5196, // 1299 * 4
    agentCommission: 779.4, // 15%
    platformFee: 259.8, // 5%
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    notes: 'Customer requested vegetarian meals and early check-in.',
    createdAt: new Date('2024-02-22'),
    updatedAt: new Date('2024-02-23'),
    lead: demoLeads[0],
    package: demoPackages[0],
    travelAgent: demoUsers[3],
    tourOperator: demoUsers[1],
  },
  {
    id: '2',
    leadId: '2',
    packageId: '2',
    travelAgentId: '5',
    tourOperatorId: '2',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@email.com',
    customerPhone: '+1-555-0123',
    travelDates: new Date('2024-05-20'),
    groupSize: 2,
    totalAmount: 4998, // 2499 * 2
    agentCommission: 749.7, // 15%
    platformFee: 249.9, // 5%
    status: 'PENDING',
    paymentStatus: 'PENDING',
    notes: 'Waiting for final confirmation from customer.',
    createdAt: new Date('2024-02-23'),
    updatedAt: new Date('2024-02-23'),
    lead: demoLeads[1],
    package: demoPackages[1],
    travelAgent: demoUsers[4],
    tourOperator: demoUsers[1],
  },
];

// Demo Dashboard Stats
export const demoDashboardStats: DashboardStats = {
  totalRevenue: 145790,
  totalBookings: 89,
  activePackages: 24,
  newLeads: 17,
  conversionRate: 68.5,
  monthlyGrowth: 12.3,
};

// Chart data
export const monthlyRevenueData = [
  { month: 'Jan', revenue: 12000, bookings: 8 },
  { month: 'Feb', revenue: 18500, bookings: 12 },
  { month: 'Mar', revenue: 22000, bookings: 15 },
  { month: 'Apr', revenue: 28000, bookings: 19 },
  { month: 'May', revenue: 32000, bookings: 22 },
  { month: 'Jun', revenue: 33500, bookings: 24 },
];

export const leadSourceData = [
  { source: 'Website', count: 45, percentage: 38 },
  { source: 'Social Media', count: 32, percentage: 27 },
  { source: 'Referrals', count: 28, percentage: 24 },
  { source: 'Email', count: 13, percentage: 11 },
];
