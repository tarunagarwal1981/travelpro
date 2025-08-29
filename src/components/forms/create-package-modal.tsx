'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Camera,
  Plus,
  Minus,
  Star,
  Globe,
  Mountain,
  Waves,
  Building,
  Heart,
  Zap,
  Award,
  Clock,
  Shield,
} from 'lucide-react';

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (packageData: any) => void;
}

interface PackageData {
  title: string;
  destination: string;
  duration: number;
  price: number;
  originalPrice: number;
  category: string;
  difficulty: string;
  groupSize: { min: number; max: number };
  description: string;
  inclusions: string[];
  exclusions: string[];
  images: string[];
  highlights: string[];
}

const predefinedDestinations = [
  {
    name: 'Golden Triangle',
    description: 'Delhi - Agra - Jaipur',
    image:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
  },
  {
    name: 'Kerala Backwaters',
    description: 'Kochi - Alleppey - Kovalam',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop',
  },
  {
    name: 'Himalayan Trek',
    description: 'Manali - Leh - Ladakh',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    name: 'Rajasthan Heritage',
    description: 'Jaipur - Udaipur - Jodhpur',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop',
  },
  {
    name: 'Goa Beaches',
    description: 'North & South Goa',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
  },
  {
    name: 'Tamil Nadu Temples',
    description: 'Chennai - Madurai - Thanjavur',
    image:
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop',
  },
];

const packageTemplates = [
  {
    category: 'Cultural',
    icon: <Building className="icon" />,
    color: '#3b82f6',
    templates: [
      'Heritage Tours',
      'Temple Circuits',
      'Cultural Immersion',
      'Historical Sites',
    ],
  },
  {
    category: 'Adventure',
    icon: <Mountain className="icon" />,
    color: '#10b981',
    templates: [
      'Trekking',
      'Mountain Climbing',
      'Wildlife Safari',
      'River Rafting',
    ],
  },
  {
    category: 'Relaxation',
    icon: <Waves className="icon" />,
    color: '#8b5cf6',
    templates: [
      'Beach Resort',
      'Spa Retreat',
      'Wellness Tours',
      'Luxury Getaway',
    ],
  },
  {
    category: 'Spiritual',
    icon: <Heart className="icon" />,
    color: '#f59e0b',
    templates: [
      'Pilgrimage',
      'Meditation Retreat',
      'Yoga Tours',
      'Sacred Sites',
    ],
  },
];

const sampleInclusions = [
  'Accommodation in premium hotels',
  'All meals (breakfast, lunch, dinner)',
  'Private air-conditioned transportation',
  'Professional English-speaking guide',
  'All monument entrance fees',
  'Airport transfers',
  'Travel insurance',
  'Cultural performances',
];

const sampleExclusions = [
  'International flights',
  'Personal expenses',
  'Tips and gratuities',
  'Alcoholic beverages',
  'Optional activities',
  'Visa fees',
  'Medical expenses',
  'Shopping expenses',
];

export default function CreatePackageModal({
  isOpen,
  onClose,
  onSuccess,
}: CreatePackageModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [packageData, setPackageData] = useState<PackageData>({
    title: '',
    destination: '',
    duration: 7,
    price: 1000,
    originalPrice: 1200,
    category: '',
    difficulty: 'Easy',
    groupSize: { min: 2, max: 12 },
    description: '',
    inclusions: [],
    exclusions: [],
    images: [],
    highlights: [],
  });

  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [customInclusions, setCustomInclusions] = useState('');
  const [customExclusions, setCustomExclusions] = useState('');

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDestinationSelect = (destination: any) => {
    setSelectedDestination(destination);
    setPackageData({
      ...packageData,
      destination: destination.description,
      images: [destination.image],
      title: `${destination.name} Experience`,
    });
  };

  const handleCategorySelect = (category: string) => {
    setPackageData({
      ...packageData,
      category,
      title: `${selectedDestination?.name} ${category} Tour`,
    });
  };

  const toggleInclusion = (inclusion: string) => {
    const updatedInclusions = packageData.inclusions.includes(inclusion)
      ? packageData.inclusions.filter((item) => item !== inclusion)
      : [...packageData.inclusions, inclusion];
    setPackageData({ ...packageData, inclusions: updatedInclusions });
  };

  const toggleExclusion = (exclusion: string) => {
    const updatedExclusions = packageData.exclusions.includes(exclusion)
      ? packageData.exclusions.filter((item) => item !== exclusion)
      : [...packageData.exclusions, exclusion];
    setPackageData({ ...packageData, exclusions: updatedExclusions });
  };

  const addCustomInclusion = () => {
    if (customInclusions.trim()) {
      setPackageData({
        ...packageData,
        inclusions: [...packageData.inclusions, customInclusions.trim()],
      });
      setCustomInclusions('');
    }
  };

  const addCustomExclusion = () => {
    if (customExclusions.trim()) {
      setPackageData({
        ...packageData,
        exclusions: [...packageData.exclusions, customExclusions.trim()],
      });
      setCustomExclusions('');
    }
  };

  const handleSubmit = () => {
    const newPackage = {
      id: Date.now().toString(),
      ...packageData,
      rating: 4.8,
      reviews: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onSuccess(newPackage);
    onClose();
    // Reset form
    setCurrentStep(1);
    setPackageData({
      title: '',
      destination: '',
      duration: 7,
      price: 1000,
      originalPrice: 1200,
      category: '',
      difficulty: 'Easy',
      groupSize: { min: 2, max: 12 },
      description: '',
      inclusions: [],
      exclusions: [],
      images: [],
      highlights: [],
    });
    setSelectedDestination(null);
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>Choose Your Destination</h3>
              <p>
                Select a popular destination or create your own custom route
              </p>
            </div>
            <div className="destinations-grid">
              {predefinedDestinations.map((destination, index) => (
                <div
                  key={index}
                  className={`destination-card ${
                    selectedDestination?.name === destination.name
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleDestinationSelect(destination)}
                >
                  <div className="destination-image">
                    <img src={destination.image} alt={destination.name} />
                    {selectedDestination?.name === destination.name && (
                      <div className="selected-overlay">
                        <Check className="icon" />
                      </div>
                    )}
                  </div>
                  <div className="destination-info">
                    <h4>{destination.name}</h4>
                    <p>{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>Package Category & Details</h3>
              <p>Define your package type and basic information</p>
            </div>

            <div className="category-selection">
              <h4>Choose Package Category</h4>
              <div className="categories-grid">
                {packageTemplates.map((template, index) => (
                  <div
                    key={index}
                    className={`category-card ${
                      packageData.category === template.category
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => handleCategorySelect(template.category)}
                    style={{
                      borderColor:
                        packageData.category === template.category
                          ? template.color
                          : '#e5e7eb',
                    }}
                  >
                    <div
                      className="category-icon"
                      style={{ color: template.color }}
                    >
                      {template.icon}
                    </div>
                    <h5>{template.category}</h5>
                  </div>
                ))}
              </div>
            </div>

            <div className="package-details">
              <div className="form-grid">
                <div className="form-group">
                  <label>Package Title</label>
                  <Input
                    value={packageData.title}
                    onChange={(e) =>
                      setPackageData({ ...packageData, title: e.target.value })
                    }
                    placeholder="Enter package title"
                  />
                </div>

                <div className="form-group">
                  <label>Duration (Days)</label>
                  <div className="number-input">
                    <button
                      onClick={() =>
                        setPackageData({
                          ...packageData,
                          duration: Math.max(1, packageData.duration - 1),
                        })
                      }
                    >
                      <Minus className="icon" />
                    </button>
                    <span>{packageData.duration}</span>
                    <button
                      onClick={() =>
                        setPackageData({
                          ...packageData,
                          duration: packageData.duration + 1,
                        })
                      }
                    >
                      <Plus className="icon" />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Difficulty Level</label>
                  <div className="difficulty-buttons">
                    {['Easy', 'Moderate', 'Challenging'].map((level) => (
                      <button
                        key={level}
                        className={`difficulty-btn ${
                          packageData.difficulty === level ? 'active' : ''
                        }`}
                        onClick={() =>
                          setPackageData({ ...packageData, difficulty: level })
                        }
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Group Size</label>
                  <div className="group-size-inputs">
                    <div>
                      <span>Min:</span>
                      <Input
                        type="number"
                        value={packageData.groupSize.min}
                        onChange={(e) =>
                          setPackageData({
                            ...packageData,
                            groupSize: {
                              ...packageData.groupSize,
                              min: parseInt(e.target.value) || 1,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <span>Max:</span>
                      <Input
                        type="number"
                        value={packageData.groupSize.max}
                        onChange={(e) =>
                          setPackageData({
                            ...packageData,
                            groupSize: {
                              ...packageData.groupSize,
                              max: parseInt(e.target.value) || 1,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Package Description</label>
                <textarea
                  value={packageData.description}
                  onChange={(e) =>
                    setPackageData({
                      ...packageData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your amazing package experience..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>Inclusions & Exclusions</h3>
              <p>Define what's included and excluded in your package</p>
            </div>

            <div className="inclusions-exclusions">
              <div className="inclusions-section">
                <h4>
                  <Check className="icon" style={{ color: '#10b981' }} />
                  What's Included
                </h4>
                <div className="items-grid">
                  {sampleInclusions.map((inclusion, index) => (
                    <div
                      key={index}
                      className={`item-card ${
                        packageData.inclusions.includes(inclusion)
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => toggleInclusion(inclusion)}
                    >
                      <div className="item-checkbox">
                        {packageData.inclusions.includes(inclusion) && (
                          <Check className="icon" />
                        )}
                      </div>
                      <span>{inclusion}</span>
                    </div>
                  ))}
                </div>
                <div className="custom-input">
                  <Input
                    value={customInclusions}
                    onChange={(e) => setCustomInclusions(e.target.value)}
                    placeholder="Add custom inclusion..."
                    onKeyPress={(e) =>
                      e.key === 'Enter' && addCustomInclusion()
                    }
                  />
                  <Button onClick={addCustomInclusion}>
                    <Plus className="icon" />
                  </Button>
                </div>
              </div>

              <div className="exclusions-section">
                <h4>
                  <X className="icon" style={{ color: '#ef4444' }} />
                  What's Not Included
                </h4>
                <div className="items-grid">
                  {sampleExclusions.map((exclusion, index) => (
                    <div
                      key={index}
                      className={`item-card ${
                        packageData.exclusions.includes(exclusion)
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => toggleExclusion(exclusion)}
                    >
                      <div className="item-checkbox">
                        {packageData.exclusions.includes(exclusion) && (
                          <Check className="icon" />
                        )}
                      </div>
                      <span>{exclusion}</span>
                    </div>
                  ))}
                </div>
                <div className="custom-input">
                  <Input
                    value={customExclusions}
                    onChange={(e) => setCustomExclusions(e.target.value)}
                    placeholder="Add custom exclusion..."
                    onKeyPress={(e) =>
                      e.key === 'Enter' && addCustomExclusion()
                    }
                  />
                  <Button onClick={addCustomExclusion}>
                    <Plus className="icon" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>Pricing & Final Review</h3>
              <p>Set your pricing and review all package details</p>
            </div>

            <div className="pricing-section">
              <div className="pricing-inputs">
                <div className="form-group">
                  <label>Package Price (USD)</label>
                  <div className="price-input">
                    <DollarSign className="icon" />
                    <Input
                      type="number"
                      value={packageData.price}
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Original Price (Optional)</label>
                  <div className="price-input">
                    <DollarSign className="icon" />
                    <Input
                      type="number"
                      value={packageData.originalPrice}
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          originalPrice: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pricing-preview">
                <h5>Pricing Preview</h5>
                <div className="price-display">
                  <span className="current-price">${packageData.price}</span>
                  {packageData.originalPrice > packageData.price && (
                    <span className="original-price">
                      ${packageData.originalPrice}
                    </span>
                  )}
                  {packageData.originalPrice > packageData.price && (
                    <Badge className="discount-badge">
                      {Math.round(
                        (1 - packageData.price / packageData.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="package-preview">
              <h5>Package Preview</h5>
              <div className="preview-card">
                {selectedDestination && (
                  <div className="preview-image">
                    <img
                      src={selectedDestination.image}
                      alt={packageData.title}
                    />
                    <div className="preview-badges">
                      <Badge className="category-badge">
                        {packageData.category}
                      </Badge>
                      <Badge className="rating-badge">
                        <Star className="icon" />
                        New
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="preview-content">
                  <h4>{packageData.title}</h4>
                  <div className="preview-details">
                    <div className="detail-item">
                      <MapPin className="icon" />
                      <span>{packageData.destination}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar className="icon" />
                      <span>{packageData.duration} days</span>
                    </div>
                    <div className="detail-item">
                      <Users className="icon" />
                      <span>
                        {packageData.groupSize.min}-{packageData.groupSize.max}{' '}
                        travelers
                      </span>
                    </div>
                  </div>
                  <p className="preview-description">
                    {packageData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-container {
          background: white;
          border-radius: 1.5rem;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          padding: 2rem 2rem 1rem 2rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .close-button {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          background: #f1f5f9;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .close-button:hover {
          background: #e2e8f0;
          color: #475569;
        }

        .progress-bar {
          padding: 1rem 2rem;
          background: #f8fafc;
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-step {
          flex: 1;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-step.active {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }

        .progress-step.completed {
          background: #10b981;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .step-header {
          text-align: center;
        }

        .step-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
        }

        .step-header p {
          color: #64748b;
          margin: 0;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .destination-card {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .destination-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .destination-card.selected {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .destination-image {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .destination-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .selected-overlay {
          position: absolute;
          inset: 0;
          background: rgba(59, 130, 246, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .destination-info {
          padding: 1rem;
        }

        .destination-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
        }

        .destination-info p {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .category-card {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .category-card:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .category-card.selected {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .category-icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto 1rem auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .category-card h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: all 0.15s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .number-input {
          display: flex;
          align-items: center;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .number-input button {
          width: 2.5rem;
          height: 2.5rem;
          border: none;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .number-input button:hover {
          background: #e2e8f0;
        }

        .number-input span {
          flex: 1;
          text-align: center;
          font-weight: 500;
          padding: 0.5rem;
        }

        .difficulty-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .difficulty-btn {
          flex: 1;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background: white;
          color: #64748b;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: 0.875rem;
        }

        .difficulty-btn:hover {
          border-color: #3b82f6;
        }

        .difficulty-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .group-size-inputs {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .group-size-inputs > div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .group-size-inputs span {
          font-size: 0.875rem;
          color: #64748b;
        }

        .group-size-inputs input {
          width: 4rem;
        }

        .inclusions-exclusions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .inclusions-section h4,
        .exclusions-section h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem 0;
        }

        .items-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .item-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.15s ease;
          font-size: 0.875rem;
        }

        .item-card:hover {
          border-color: #3b82f6;
          background: #f8fafc;
        }

        .item-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .item-checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #d1d5db;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .item-card.selected .item-checkbox {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .custom-input {
          display: flex;
          gap: 0.5rem;
        }

        .custom-input input {
          flex: 1;
        }

        .pricing-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .pricing-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .price-input {
          position: relative;
        }

        .price-input .icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .price-input input {
          padding-left: 2.5rem;
        }

        .pricing-preview {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
        }

        .pricing-preview h5 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-display {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .current-price {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
        }

        .original-price {
          font-size: 1.25rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .discount-badge {
          background: #dc2626;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .package-preview {
          margin-top: 2rem;
        }

        .package-preview h5 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .preview-card {
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          overflow: hidden;
          background: white;
        }

        .preview-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-badges {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .category-badge {
          background: rgba(59, 130, 246, 0.9);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .rating-badge {
          background: rgba(255, 255, 255, 0.9);
          color: #1e293b;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .preview-content {
          padding: 1.5rem;
        }

        .preview-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 1rem 0;
        }

        .preview-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
        }

        .detail-item .icon {
          color: #3b82f6;
        }

        .preview-description {
          font-size: 0.875rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }

        .modal-footer {
          padding: 1.5rem 2rem;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
        }

        .footer-buttons {
          display: flex;
          gap: 1rem;
        }

        .step-info {
          font-size: 0.875rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .modal-container {
            margin: 0.5rem;
            max-height: 95vh;
          }

          .destinations-grid {
            grid-template-columns: 1fr;
          }

          .categories-grid {
            grid-template-columns: 1fr 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .inclusions-exclusions {
            grid-template-columns: 1fr;
          }

          .pricing-inputs {
            grid-template-columns: 1fr;
          }

          .footer-buttons {
            flex-direction: column-reverse;
            width: 100%;
          }
        }
      `}</style>

      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create New Package</h2>
          <button className="close-button" onClick={onClose}>
            <X className="icon" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-container">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`progress-step ${
                  step < currentStep
                    ? 'completed'
                    : step === currentStep
                    ? 'active'
                    : ''
                }`}
              />
            ))}
          </div>
          <div className="step-indicator">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">{renderStepContent()}</div>

        {/* Footer */}
        <div className="modal-footer">
          <div className="step-info">
            {currentStep === 1 && 'Choose your destination to get started'}
            {currentStep === 2 && 'Set up your package details'}
            {currentStep === 3 && 'Define inclusions and exclusions'}
            {currentStep === 4 && 'Review and publish your package'}
          </div>
          <div className="footer-buttons">
            {currentStep > 1 && (
              <Button className="btn btn-outline" onClick={handlePrevious}>
                <ArrowLeft className="icon mr-2" />
                Previous
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={currentStep === 1 && !selectedDestination}
              >
                Next
                <ArrowRight className="icon ml-2" />
              </Button>
            ) : (
              <Button className="btn btn-primary" onClick={handleSubmit}>
                <Check className="icon mr-2" />
                Create Package
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
