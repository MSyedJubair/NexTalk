import AxiosInstance from "./axios";

export const getUser = async () => {
  try {
    await AxiosInstance.get("/check")
      .then((res) => {
        console.log(res.data);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
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
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
