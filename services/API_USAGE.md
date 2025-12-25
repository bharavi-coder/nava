# API Service Usage Guide

## Overview
The API service layer (`services/api.js`) provides a centralized way to make all API calls from your Next.js application.

## Configuration
The service automatically reads the API base URL from environment variables:

### Environment Variables
- **NEXT_PUBLIC_API_BASE_URL** - Base URL for all API calls (from .env files)
- **NEXT_PUBLIC_API_TIMEOUT** - Request timeout in milliseconds (default: 30000)
- **NEXT_PUBLIC_ENV** - Environment type (development/production)

### How it Works
1. Reads from `.env.local` in development (overrides `.env`)
2. Uses `.env.production` in production
3. Falls back to `http://localhost:3000/api` if no env variable is set

## Available Functions

### 1. submitSupplyChainForm(formData)
Submit contact/supply chain form data to the API.

**Usage:**
```javascript
import { submitSupplyChainForm } from "../services/api";

try {
  const response = await submitSupplyChainForm(formData);
  console.log("Success:", response);
} catch (error) {
  console.error("Error:", error.message);
}
```

### 2. getProducts(filters)
Retrieve products list with optional filters.

**Usage:**
```javascript
import { getProducts } from "../services/api";

// Without filters
const allProducts = await getProducts();

// With filters
const filteredProducts = await getProducts({ 
  category: "beverages", 
  limit: 10 
});
```

### 3. getCategories()
Retrieve all product categories.

**Usage:**
```javascript
import { getCategories } from "../services/api";

const categories = await getCategories();
```

### 4. getApiConfig()
Get current API configuration (for debugging).

**Usage:**
```javascript
import { getApiConfig } from "../services/api";

const config = getApiConfig();
console.log(config);
// Output: { baseUrl: "http://localhost:3000/api", timeout: 30000, environment: "development" }
```

### 5. Custom API Requests
Use the default export `apiRequest()` for custom endpoints.

**Usage:**
```javascript
import apiRequest from "../services/api";

// GET request
const data = await apiRequest("/endpoint", "GET");

// POST request with data
const response = await apiRequest("/endpoint", "POST", { key: "value" });

// With custom headers
const result = await apiRequest("/endpoint", "POST", data, {
  headers: { Authorization: "Bearer token" }
});
```

## Error Handling
The service includes built-in error handling:

```javascript
try {
  const response = await submitSupplyChainForm(formData);
} catch (error) {
  // Error types:
  // - "Request timeout. Please try again." (timeout)
  // - API error message from server
  // - Network errors
  
  console.error(error.message);
}
```

## Development Features
In development mode (NEXT_PUBLIC_ENV=development):
- Console logs all API requests with [API Request], [API Success], [API Error] prefixes
- Logs the base URL on app load
- Shows detailed error information

## Environment Setup
1. `.env.local` - Local development (localhost:3000/api)
2. `.env` - Default/template values
3. `.env.production` - Production settings (https://api.navadistributor.com)
4. `.env.example` - Documentation template

## Switching Environments
To change the API base URL:
1. Edit `.env.local` for development
2. Set environment variables in Vercel/production dashboard
3. Restart the Next.js dev server to reload env variables
