import { API } from "../utils/api";

export const addItemToOrderList = async (data: Record<string, any>) => {
  console.log(data);
  try {
    const response = await API.post("/list-items", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.message || "Oops - Somthing went wrong.",
    };
  }
};

export const getOrderListItems = async (userId: number) => {
  try {
    const response = await API.post("/list-items/user/" + userId, {});
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.message || "Oops - Somthing went wrong.",
    };
  }
};
