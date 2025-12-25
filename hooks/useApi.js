// hooks/useApi.js - Custom hook for using the API service in components

import { useState, useCallback } from "react";
import { getApiConfig } from "../services/api";

/**
 * Custom hook for API calls with loading and error states
 * @param {function} apiFunction - API function to call
 * @returns {object} { data, loading, error, execute }
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage = err.message || "An error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
};

/**
 * Get current API configuration
 * @returns {object} API config
 */
export const useApiConfig = () => {
  return getApiConfig();
};
