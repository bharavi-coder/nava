// API Base Configuration - Uses environment variable from .env files
const API_BASE_URL = "https://nava-api.weblivelink.com/api";
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10);

// Log API Base URL in development
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENV === "development") {
  console.log("[API Service] Base URL:", API_BASE_URL);
}

/**
 * Common API request handler
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} data - Request payload
 * @param {object} options - Additional options
 * @returns {Promise} API response
 */
const apiRequest = async (endpoint, method = "GET", data = null, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
    };

    if (data && (method === "POST" || method === "PUT")) {
      config.body = JSON.stringify(data);
    }

    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`[API Request] ${method} ${url}`);

    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.message || `API Error: ${response.status}`;
      console.error("[API Error]", errorMessage, result);
      throw new Error(errorMessage);
    }

    console.log(`[API Success] ${method} ${url}`);
    return result;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error(`[API Timeout] Request exceeded timeout of ${API_TIMEOUT}ms`);
      throw new Error("Request timeout. Please try again.");
    }
    console.error("[API Error]", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Submit contact/supply chain form
 * @param {object} formData - Form data to submit
 * @returns {Promise} API response
 */
export const submitSupplyChainForm = async (formData) => {
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    primaryNumber: formData.phoneFull,
    businessName: formData.businessName,
    businessType: formData.businessType,
    message: formData.message,
  };

  return apiRequest("/supply-chain", "POST", payload);
};

/**
 * Get products list
 * @param {object} filters - Optional filters
 * @returns {Promise} API response
 */
export const getProducts = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";
  return apiRequest(endpoint, "GET");
};

/**
 * Get categories
 * @returns {Promise} API response
 */
export const getCategories = async () => {
  return apiRequest("/categories", "GET");
};

/**
 * Get API configuration (for debugging)
 * @returns {object} API configuration
 */
export const getApiConfig = () => ({
  baseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  environment: process.env.NEXT_PUBLIC_ENV,
});

export default apiRequest;
