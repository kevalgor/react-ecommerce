// consumer session
export const setConsumerAccessToken = (consumerAccessToken: string) => {
  localStorage.setItem("consumerAccessToken", consumerAccessToken);
};

export const getConsumerAccessToken = () => {
  return localStorage.getItem("consumerAccessToken");
};

export const removeConsumerAccessToken = () => {
  localStorage.removeItem("consumerAccessToken");
};

export const setConsumerDetails = (consumerDetails: Record<string, any>) => {
  localStorage.setItem("consumerDetails", JSON.stringify(consumerDetails));
};

export const getConsumerDetails = () => {
  return localStorage.getItem("consumerDetails");
};

export const removeConsumerDetails = () => {
  localStorage.removeItem("consumerDetails");
};

export const consumerLogout = () => {
  removeConsumerAccessToken();
  removeConsumerDetails();
};
