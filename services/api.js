// API Base Configuration - Uses environment variable from .env files
const API_BASE_URL = "https://nava-api.weblivelink.com/api";

const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10);

// Log API Base URL in development
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENV === "development") {
  console.log("[API Service] Base URL:", API_BASE_URL);
}

const apiRequest = async (endpoint, method = 'GET', data = null, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const isFormData = data instanceof FormData;

    const config = {
      method,
      signal: controller.signal,
      headers: {
        // ✅ DO NOT set content-type for FormData
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    };

    // ✅ IMPORTANT PART
    if (data && method !== 'GET') {
      config.body = isFormData ? data : JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || 'API Error');
    }

    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default apiRequest;

// export const submitSupplyChainForm = async (formData) => {
//   const payload = {
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     email: formData.email,
//     primaryNumber: formData.phoneFull,
//     businessName: formData.businessName,
//     businessType: formData.businessType,
//     message: formData.message,
//   };

//   return apiRequest("/supply-chain", "POST", payload);
// };

export const getProducts = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";
  return apiRequest(endpoint, "GET");
};

export const getCategories = async () => {
  return apiRequest("/categories", "GET");
};

export const getApiConfig = () => ({
  baseUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  environment: process.env.NEXT_PUBLIC_ENV,
});
