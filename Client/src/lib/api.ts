import AxiosInstance from "./axios";

export const getUser = async () => {
  try {
    const response = await AxiosInstance.get("/users/me");
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signup = async (data: any) => {
  try {
    const response = await AxiosInstance.post("/auth/signup", data);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signin = async (data: any) => {
  try {
    const response = await AxiosInstance.post("/auth/signin", data);
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await AxiosInstance.post("/auth/logout");
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkAuth = async () => {
  try {
    const response = await AxiosInstance.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUsers = async () => {
  try {
    const response = await AxiosInstance.get("/users/all");

    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMessages = async (userId: string) => {


  const response = await AxiosInstance.get(`/message/${userId}`);
  return response.data || [];
};
