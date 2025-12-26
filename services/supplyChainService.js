import apiRequest from "./api";

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
