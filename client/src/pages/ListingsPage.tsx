import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchListings } from '../services/listingsService'

export const ListingsPage = () => {
  const [listings, setListings] = useState<any[]>([])
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const data = await fetchListings(filters)
        setListings(data.listings || [])
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [filters.category, filters.minPrice, filters.maxPrice, filters.location])

  const filteredListings = listings.filter((listing) => {
    if (filters.category && listing.category !== filters.category) return false
    if (filters.minPrice && listing.price < parseInt(filters.minPrice)) return false
    if (filters.maxPrice && listing.price > parseInt(filters.maxPrice)) return false
    if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <h1 className="text-xl font-bold text-gray-900">
                Businesses for Sale
              </h1>
            </div>
            <div className="hidden md:block">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                </select>
              </div>
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  id="minPrice"
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="1000000"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading listings...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No listings match your filters.</p>
              )
            ) : (
              <div className="col-span-full">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {listing.category} • {listing.location}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Price:</span> {listing.price.toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">Revenue:</span> {listing.revenue.toLocaleString()}
                        </p>
                        <p>
                          <span className="font-medium">EBITDA:</span> {listing.ebita.toLocaleString()}
                        </p>
                      </div>
                      <p className="mt-4 text-sm text-gray-500 line-clamp-3">
                        {listing.description}
                      </p>
                      <Link to={`/listings/${listing.id}`} className="mt-4 inline-block px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}