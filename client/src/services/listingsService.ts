import axios from 'axios'

const getApiBaseUrl = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  return 'http://localhost:5001/api' // Updated to use port 5001
}

const API_BASE_URL = getApiBaseUrl()

export const fetchListings = async (filters: {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string
}) => {
  const queryParams = new URLSearchParams()

  if (filters.category) queryParams.append('category', filters.category)
  if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
  if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
  if (filters.location) queryParams.append('location', filters.location)

  const response = await axios.get(`${API_BASE_URL}/listings?${queryParams.toString()}`)
  return response.data
}

export const fetchListingById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/listings/${id}`)
  return response.data
}

export const createListing = async (listingData: {
  title: string
  category: string
  price: number
  location: string
  revenue?: number
  ebita?: number
  description?: string
}) => {
  const response = await axios.post(`${API_BASE_URL}/listings`, listingData)
  return response.data
}