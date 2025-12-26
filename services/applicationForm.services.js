import apiRequest from './api';

export const submitApplicationForm = async (payload) => {
  return apiRequest('/application-form', 'POST', payload);
};
