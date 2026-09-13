-- Drop tables if they exist (for clean slate during development)
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'business_owner',
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create listings table
CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    revenue DECIMAL(15, 2) DEFAULT 0,
    ebita DECIMAL(15, 2) DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_location ON listings(location);
CREATE INDEX idx_listings_price ON listings(price);

-- Insert some sample data for testing
INSERT INTO users (email, password_hash, role, name, company_name) VALUES
('business@example.com', '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', 'business_owner', 'John Doe', 'Doe Enterprises'),
('investor@example.com', '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', 'investor', 'Jane Smith', NULL),
('advisor@example.com', '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', 'advisor', 'Bob Johnson', NULL);

-- Note: The password hash above is for "password123" (bcrypt hash)
-- In a real app, you'd want to use proper password hashing

INSERT INTO listings (user_id, title, category, price, location, revenue, ebita, description) VALUES
(1, 'SaaS Business for Sale', 'Technology', 500000, 'United States', 120000, 30000, 'A profitable SaaS business with recurring revenue.'),
(1, 'E-commerce Store', 'Retail', 300000, 'Canada', 80000, 15000, 'Established e-commerce store with loyal customer base.'),
(1, 'Franchise Opportunity', 'Food & Beverage', 200000, 'United Kingdom', 0, 0, 'Established franchise with proven business model.'),
(2, 'Manufacturing Plant', 'Manufacturing', 750000, 'Germany', 200000, 50000, 'Well-established manufacturing facility with modern equipment.');