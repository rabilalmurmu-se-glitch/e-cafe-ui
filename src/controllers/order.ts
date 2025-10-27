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

export async function formatItemArray(data: any[]) {
  const listItems = data.map((d: any) => ({
    ...d.item,
    quantity: d.quantity,
    total: +d.item.price * +d.quantity,
    rowId: d.id,
    listId: d.order_list_id,
  }));
  const total = listItems.reduce((sum: any, item: any) => sum + item.total, 0);
  return { listItems, total };
}

export const updateItemToOrderList = async (data: {
  quantity: number;
  id: number;
}) => {
  try {
    const { quantity, id } = data;
    const response = await API.put("/list-items/" + id, { quantity });
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

export const removeItemFromList = async (id: number) => {
  try {
    const response = await API.delete("/list-items/" + id);
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

export const handlePayment = async (orderListId: number) => {
  // 1. Create order from backend
  const response = await API.post("/payment/create-order", { orderListId });

  const { data } = response.data;

  // 2. Razorpay options
  const options = {
    key: "rzp_test_RY4nlFOyQAnYq8", // replace with your Razorpay key_id
    amount: data.amount,
    currency: data.currency,
    name: "E-Cafe",
    description: "Test Transaction",
    order_id: data.id,
    handler: async function (response: any) {
      alert("Payment successful!");

      console.log(response);
      // 3. Verify payment
      const verify = await API.post("/payment/verify", response);

      const verifyData = verify.data;
      console.log(verifyData);
    },
    prefill: {
      name: "Rabilal Murmu",
      email: "rabilal@example.com",
      contact: "9999999999",
    },
    theme: {
      color: "#528FF0",
    },
  };

  // 4. Open Razorpay checkout
  //@ts-ignore
  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
