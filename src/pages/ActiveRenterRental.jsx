import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  MapPin, 
  User, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  Truck,
  Home,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  ArrowLeft,
  MoreVertical,
  PauseCircle,
  PlayCircle,
  Truck as TruckIcon,
  PackageCheck,
  RefreshCw
} from 'lucide-react';

import {BASE_URL} from '../baseUrl'

function ActiveRenterRentals() {
  const [activeRentals, setActiveRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchActiveRentals();
    
    
    const intervalId = setInterval(fetchActiveRentals, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const fetchActiveRentals = async () => {
    try {
      setRefreshing(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${BASE_URL}/getActiveRenterRentals`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log("DATA")
      console.log(data)
      if (data.success) {
        setActiveRentals(data.rentals);
      } else {
        throw new Error(data.message || 'Failed to load rentals');
      }
    } catch (err) {
      console.error('Error fetching active rentals:', err);
      setError(err.message || 'Failed to load active rentals');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (rentalId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/updateRentalStatus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rentalId,
          status: newStatus
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchActiveRentals();
        alert(`Status updated to ${newStatus}`);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status: ' + err.message);
    }
  };

  const exportToCSV = () => {
    if (activeRentals.length === 0) {
      alert('No rentals to export');
      return;
    }

    const headers = [
      'Order Number',
      'Product',
      'Customer',
      'Status',
      'Monthly Rent',
      'Total Amount',
      'Your Payout',
      'Delivery Date',
      'Rental Start',
      'Rental End',
      'Payment Status',
      'Transfer Status'
    ];

    const rows = activeRentals.map(rental => [
      rental.orderNumber || '',
      rental.listing?.title || '',
      rental.user?.name || '',
      rental.status || '',
      `$${rental.monthlyRent?.toFixed(2) || '0'}`,
      `$${rental.totalAmount?.toFixed(2) || '0'}`,
      `$${rental.vendorPayout?.toFixed(2) || '0'}`,
      rental.deliveryDate ? new Date(rental.deliveryDate).toLocaleDateString() : '',
      rental.rentalStartDate ? new Date(rental.rentalStartDate).toLocaleDateString() : '',
      rental.rentalEndDate ? new Date(rental.rentalEndDate).toLocaleDateString() : '',
      rental.paymentStatus || '',
      rental.transferStatus || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `active-rentals-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
      processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' },
      in_transit: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'In Transit' },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
      active: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Active Rental' },
      paused: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Paused' },
      completed: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      refunded: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Refunded' }
    };

    const config = statusConfig[status] || statusConfig.confirmed;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getTransferStatusBadge = (status) => {
    const config = {
      pending: { icon: Clock, bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Payment Pending' },
      completed: { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-800', label: 'Paid Out' },
      cancelled: { icon: XCircle, bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
      failed: { icon: AlertCircle, bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' }
    };

    const statusInfo = config[status] || config.pending;
    const Icon = statusInfo.icon;

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
        <Icon className="w-3 h-3" />
        <span>{statusInfo.label}</span>
      </span>
    );
  };

  const RentalActions = ({ rental }) => {
    const [showActions, setShowActions] = useState(false);
    
    const availableActions = {
      confirmed: [
        { label: 'Mark as Processing', status: 'processing', icon: PackageCheck, color: 'text-blue-600' }
      ],
      processing: [
        { label: 'Mark as In Transit', status: 'in_transit', icon: TruckIcon, color: 'text-purple-600' }
      ],
      in_transit: [
        { label: 'Mark as Delivered', status: 'delivered', icon: CheckCircle, color: 'text-green-600' }
      ],
      delivered: [
        { label: 'Start Rental (Active)', status: 'active', icon: PlayCircle, color: 'text-emerald-600' }
      ],
      active: [
        { label: 'Pause Rental', status: 'paused', icon: PauseCircle, color: 'text-yellow-600' },
        { label: 'Complete Rental', status: 'completed', icon: CheckCircle, color: 'text-slate-600' }
      ],
      paused: [
        { label: 'Resume Rental', status: 'active', icon: PlayCircle, color: 'text-emerald-600' },
        { label: 'Complete Rental', status: 'completed', icon: CheckCircle, color: 'text-slate-600' }
      ]
    };

    const actions = availableActions[rental.status] || [];

    if (actions.length === 0) return null;

    return (
      <div className="relative">
      
        
        {showActions && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowActions(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleStatusUpdate(rental._id, action.status);
                      setShowActions(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <Icon className={`w-4 h-4 ${action.color}`} />
                    <span className="text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  const StatusFilterTabs = () => {
    const statusCounts = {
      all: activeRentals.length,
      active: activeRentals.filter(r => r.status === 'active').length,
      processing: activeRentals.filter(r => r.status === 'processing').length,
      in_transit: activeRentals.filter(r => r.status === 'in_transit').length,
      delivered: activeRentals.filter(r => r.status === 'delivered').length,
      confirmed: activeRentals.filter(r => r.status === 'confirmed').length,
      pending_payout: activeRentals.filter(r => r.transferStatus === 'pending').length
    };

    const tabs = [
      { key: 'all', label: 'All', count: statusCounts.all },
      { key: 'active', label: 'Active', count: statusCounts.active },
      { key: 'processing', label: 'Processing', count: statusCounts.processing },
      { key: 'in_transit', label: 'In Transit', count: statusCounts.in_transit },
      { key: 'delivered', label: 'Delivered', count: statusCounts.delivered },
      { key: 'pending_payout', label: 'Pending Payout', count: statusCounts.pending_payout }
    ];

    return (
     ''
    );
  };

  const filteredRentals = activeRentals.filter(rental => {
    const matchesSearch = 
      rental.listing?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || rental.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: activeRentals.length,
    active: activeRentals.filter(r => r.status === 'active').length,
    totalRevenue: activeRentals.reduce((sum, r) => sum + (r.vendorPayout || 0), 0),
    pendingPayouts: activeRentals.filter(r => r.transferStatus === 'pending').length,
    confirmed: activeRentals.filter(r => r.status === 'confirmed').length,
    inTransit: activeRentals.filter(r => r.status === 'in_transit').length,
    delivered: activeRentals.filter(r => r.status === 'delivered').length
  };

  const RentalSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded-lg w-12 ml-auto"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <RentalSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={fetchActiveRentals}
            className="mt-4 bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  const hasNoRentalsAtAll = activeRentals.length === 0 && !loading;
  
  if (hasNoRentalsAtAll) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-teal-700">Active Rentals</h1>
                  <p className="text-sm text-gray-600">Manage your rental orders</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No active rentals yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              When customers rent your products, they'll appear here for you to manage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/vendor/listings'}
                className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium"
              >
                View Your Listings
              </button>
              <button
                onClick={() => window.location.href = '/vendor/analytics'}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-teal-700">Active Rentals</h1>
                <p className="text-sm text-gray-600">Manage your rental orders</p>
              </div>
              <button
                onClick={fetchActiveRentals}
                disabled={refreshing}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
           
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Rentals</p>
                <p className="text-3xl font-bold text-teal-700">{stats.total}</p>
              </div>
              <div className="bg-blue-500 rounded-lg p-3">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Now</p>
                <p className="text-3xl font-bold text-teal-700">{stats.active}</p>
              </div>
              <div className="bg-green-500 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-teal-700">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-500 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Payouts</p>
                <p className="text-3xl font-bold text-teal-700">{stats.pendingPayouts}</p>
              </div>
              <div className="bg-purple-500 rounded-lg p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by order number, product, or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-700 focus:border-transparent"
              />
            </div>

            
          </div>
          
          <StatusFilterTabs />
        </div>

        {/* Rentals List */}
        <div className="space-y-6">
          {filteredRentals.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rentals found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `No rentals match "${searchTerm}"`
                  : `No rentals with status "${filterStatus}"`}
              </p>


              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                className="text-teal-700 hover:text-teal-800 font-medium text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredRentals.map((rental) => (
            <div key={rental._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {rental.listing?.images?.[0]?.url ? (
                        <img 
                          src={rental.listing.images[0].url} 
                          alt={rental.listing?.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-teal-700 mb-1">
                        {rental.listing?.title || 'Product Name'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">Order #{rental.orderNumber}</p>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(rental.status)}
                        {getTransferStatusBadge(rental.transferStatus)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RentalActions rental={rental} />
                    <button
                      onClick={() => setSelectedRental(selectedRental?._id === rental._id ? null : rental)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">
                        {selectedRental?._id === rental._id ? 'Hide' : 'View'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <User className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {rental.user?.name || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${rental.monthlyRent?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Your Payout</p>
                      <p className="text-sm font-medium text-green-600">
                        ${rental.vendorPayout?.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Delivery Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {rental.deliveryDate 
                          ? new Date(rental.deliveryDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRental?._id === rental._id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Delivery Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-teal-700" />
                          Delivery Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium capitalize">{rental.deliveryType}</span>
                          </div>
                          {rental.installationType && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Installation:</span>
                              <span className="font-medium capitalize">{rental.installationType}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium">{rental.deliveryTime || 'N/A'}</span>
                          </div>
                          {rental.deliveryAddress && (
                            <div className="mt-3">
                              <p className="text-gray-600 mb-1">Address:</p>
                              <p className="font-medium">
                                {rental.deliveryAddress.street}<br />
                                {rental.deliveryAddress.city}, {rental.deliveryAddress.state} {rental.deliveryAddress.zipCode}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-teal-700" />
                          Payment Breakdown
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Rent:</span>
                            <span className="font-medium">${rental.monthlyRent?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Fee:</span>
                            <span className="font-medium">${rental.deliveryFee?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Fee:</span>
                            <span className="font-medium">${rental.serviceFee?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="font-semibold">Total Amount:</span>
                            <span className="font-semibold">${rental.totalAmount?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                            <span className="text-gray-600">Platform Fee:</span>
                            <span className="text-red-600">-${rental.platformFee?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold text-green-600">Your Payout:</span>
                            <span className="font-semibold text-green-600">${rental.vendorPayout?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rental Period */}
                    {(rental.rentalStartDate || rental.rentalEndDate) && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-teal-700" />
                          Rental Period
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {rental.rentalStartDate && (
                            <div>
                              <p className="text-gray-600">Start Date:</p>
                              <p className="font-medium">
                                {new Date(rental.rentalStartDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                          {rental.rentalEndDate && (
                            <div>
                              <p className="text-gray-600">End Date:</p>
                              <p className="font-medium">
                                {new Date(rental.rentalEndDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {rental.notes && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                        <p className="text-sm text-gray-700">{rental.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}

export default ActiveRenterRentals;