import { Request, Response } from 'express'
import pool from '../config/database'

// Mock data for when database is not available
const mockListings = [
  {
    id: 1,
    title: 'SaaS Business for Sale',
    category: 'Technology',
    price: 500000,
    location: 'United States',
    revenue: 120000,
    ebita: 30000,
    description: 'A profitable SaaS business with recurring revenue.',
    owner_name: 'John Doe',
    owner_email: 'business@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'E-commerce Store',
    category: 'Retail',
    price: 300000,
    location: 'Canada',
    revenue: 80000,
    ebita: 15000,
    description: 'Established e-commerce store with loyal customer base.',
    owner_name: 'John Doe',
    owner_email: 'business@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Franchise Opportunity',
    category: 'Food & Beverage',
    price: 200000,
    location: 'United Kingdom',
    revenue: 0,
    ebita: 0,
    description: 'Established franchise with proven business model.',
    owner_name: 'John Doe',
    owner_email: 'business@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let mockListingId = 4;

export const getListings = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, location } = req.query

    // Handle query parameters that might be arrays or undefined
    const categoryStr = Array.isArray(category) ? (category[0] as string) : (category as string) || '';
    const minPriceStr = Array.isArray(minPrice) ? (minPrice[0] as string) : (minPrice as string) || '';
    const maxPriceStr = Array.isArray(maxPrice) ? (maxPrice[0] as string) : (maxPrice as string) || '';
    const locationStr = Array.isArray(location) ? (location[0] as string) : (location as string) || '';

    let query = 'SELECT l.*, u.name as owner_name FROM listings l JOIN users u ON l.user_id = u.id WHERE 1=1'
    const params: any[] = []

    if (categoryStr) {
      query += ' AND l.category = $' + (params.length + 1)
      params.push(categoryStr)
    }

    if (minPriceStr) {
      query += ' AND l.price >= $' + (params.length + 1)
      params.push(minPriceStr)
    }

    if (maxPriceStr) {
      query += ' AND l.price <= $' + (params.length + 1)
      params.push(maxPriceStr)
    }

    if (locationStr) {
      query += ' AND l.location ILIKE $' + (params.length + 1)
      params.push(`%${locationStr}%`)
    }

    query += ' ORDER BY l.created_at DESC'

    try {
      const result = await pool.query(query, params)
      res.status(200).json({
        listings: result.rows
      });
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for listings');

      let filteredListings = [...mockListings];

      if (categoryStr) {
        filteredListings = filteredListings.filter(l => l.category === categoryStr);
      }

      if (minPriceStr) {
        filteredListings = filteredListings.filter(l => l.price >= parseInt(minPriceStr || '0'));
      }

      if (maxPriceStr) {
        filteredListings = filteredListings.filter(l => l.price <= parseInt(maxPriceStr || '999999999'));
      }

      if (locationStr) {
        const locStr = Array.isArray(locationStr) ? locationStr[0] : locationStr;
        filteredListings = filteredListings.filter(l =>
          l.location.toLowerCase().includes(locStr.toLowerCase())
        );
      }

      res.status(200).json({
        listings: filteredListings
      });
    }
  } catch (error) {
    console.error('Error fetching listings:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Handle params that might be arrays
    const idStr = Array.isArray(id) ? id[0] : id;

    try {
      const result = await pool.query(
        'SELECT l.*, u.name as owner_name, u.email as owner_email FROM listings l JOIN users u ON l.user_id = u.id WHERE l.id = $1',
        [idStr]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Listing not found' })
      }

      res.status(200).json({
        listing: result.rows[0]
      });
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for listing');

      const listing = mockListings.find(l => l.id === parseInt(idStr));

      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' })
      }

      res.status(200).json({
        listing
      });
    }
  } catch (error) {
    console.error('Error fetching listing:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createListing = async (req: Request, res: Response) => {
  try {
    const { title, category, price, location, revenue, ebita, description } = req.body

    // For development, use a mock user ID since we don't have real auth implemented yet
    // In a real app, this would come from authentication middleware or JWT verification
    const userId = 1; // Mock user ID - corresponds to our mock user in the database

    // Basic validation
    if (!title || !category || !price || !location) {
      return res.status(400).json({ error: 'Title, category, price, and location are required' })
    }

    try {
      const result = await pool.query(
        'INSERT INTO listings (user_id, title, category, price, location, revenue, ebita, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [userId, title, category, price, location, revenue || 0, ebita || 0, description]
      )

      const listing = result.rows[0]

      res.status(201).json({
        message: 'Listing created successfully',
        listing
      });
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for listing creation');

      const newListing = {
        id: mockListingId++,
        title,
        category,
        price: parseFloat(price as string),
        location,
        revenue: revenue ? parseFloat(revenue as string) : 0,
        ebita: ebita ? parseFloat(ebita as string) : 0,
        description,
        owner_name: 'Current User', // In a real app, this would come from auth
        owner_email: 'user@example.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      mockListings.push(newListing);

      res.status(201).json({
        message: 'Listing created successfully (using mock data)',
        listing: newListing
      });
    }
  } catch (error) {
    console.error('Error creating listing:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}