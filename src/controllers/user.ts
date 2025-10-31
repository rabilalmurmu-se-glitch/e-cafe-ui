import { API } from "../utils/api";

export interface Login {
  email: string;
  password: string;
}

export interface SignUp extends Login {
  name: string;
  gender: string;
}

export interface CreateUser extends SignUp {
  address?: string;
  about?: string;
  phone?: string;
  type?: string;
}

export type UpdateUser = Partial<CreateUser>;

export const login = async (data: Login) => {
  try {
    const response = await API.post("/users/login", data);
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
export const signup = async (data: SignUp) => {
  try {
    const response = await API.post("/users/registration", data);
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

export const UpdateProfileInfo = async (
  data: UpdateUser,
  id: string | number
) => {
  try {
    const response = await API.put(`/users/${id}`, data);
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

export const getUserById = async (id: string | number) => {
  try {
    const response = await API.get(`/users/${id}`);
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
