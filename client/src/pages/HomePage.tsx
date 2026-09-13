import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl font-bold mb-6">
            Making investment banking accessible to SMEs
          </h1>
          <p className="text-lg mb-8">
            Connect with investors, buyers, and advisors to sell or grow your business
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get Started - Create Profile
            </Link>
            <Link to="/listings" className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors">
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m-9 4h12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as a business owner, investor, advisor, or franchise to get started.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 19a2 2 0 01-2 2m4-4a2 2 0 012-2m4 0a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">Explore Opportunities</h3>
              <p className="text-gray-600">
                Browse businesses for sale, franchise opportunities, or investors looking for deals.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H3m8 4V3m-6 4h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 002-2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-3">Connect & Close</h3>
              <p className="text-gray-600">
                Send proposals, negotiate deals, and complete transactions securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Join thousands of business owners and investors already using our platform.
          </p>
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Create Your Profile
          </Link>
        </div>
      </section>
    </div>
  )
}