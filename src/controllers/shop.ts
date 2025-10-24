import { API } from "../utils/api";
type IdType = string | number;
export const getShopDetails = async (id: IdType) => {
  try {
    const response = await API.get("/shops/" + id);
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

function groupByKey<T, K>(arr: T, key: K) {
  //@ts-ignore
  return arr.reduce((acc: any, item: any) => {
    const value = item[key];
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(item);
    return acc;
  }, {});
}

export const getShopCategories = async (id: IdType) => {
  try {
    const response = await API.get("/categories/shop/" + id);
    const { data } = response;
    const groupByType = groupByKey<any[], string>(data, "type_id");
    const groupCat: any = {};
    for (let key in groupByType) {
      const { data } = await getTypeById(key);
      const type = data.data;
      groupCat[type.type] = groupByType[key];
    }
    return {
      success: true,
      data: groupCat,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.message || "Oops - Somthing went wrong.",
    };
  }
};

export const getShopCategory = async (catId: IdType) => {
  try {
    const response = await API.get("/categories/" + catId);
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

export const getTypeById = async (id: IdType) => {
  try {
    const response = await API.get("/types/" + id);
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

export const getShopItems = async (categoryId: IdType, shopId: IdType) => {
  try {
    const response = await API.get(`/items/${shopId}/${categoryId}`);
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
