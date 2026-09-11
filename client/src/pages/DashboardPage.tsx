import React from 'react'
import { useAuth } from '../context/AuthContext'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <h1 className="text-xl font-bold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <span className="text-sm font-medium text-gray-500">
                  Welcome, {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow-md rounded-lg px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Your Profile
                </h3>
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    <p>
                      <span className="font-medium">Role:</span> {user?.role}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p>
                      <span className="font-medium">Member since:</span> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md rounded-lg px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <a href="#" className="block px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                    Create a Listing
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                    Browse Investors
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                    Use Valuation Tool
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}