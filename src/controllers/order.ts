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

export const PlaceOrder = async (
  orderListId: number,
  modOfPay: string,
  user_id: number,
  tableNumber: string
) => {
  // 1. Create order from backend
  try {
    const response = await API.post("/orders/create-order", {
      orderListId,
      modOfPay,
      user_id,
      tableNumber
    });

    const { data } = response.data;
    if (modOfPay === "POSTPAID") {
      return {
        success: true,
        data: response.data,
      };
    }
    console.log(data);
    // 2. Razorpay options
    const options = {
      key: "rzp_test_RY4nlFOyQAnYq8", // replace with your Razorpay key_id
      amount: data.razorOrder.amount,
      currency: data.razorOrder.currency,
      name: "E-Cafe",
      description: "Test Transaction",
      order_id: data.razorOrder.id,
      handler: async function (response: any) {
        alert("Payment successful!");

        console.log(response);
        // 3. Verify payment
        const verify = await API.post("/orders/verify-order", response);

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
  } catch (error: any) {
    return {
      error: true,
      message: error?.message || "Oops - Somthing went wrong.",
    };
  }
};
/**
 * {
      id: "105",
      status: "pending",
      createdAt: new Date().toISOString(),
      total: 340,
      items: [
        { id: "i1", name: "Cold Coffee", quantity: 2, price: 120 },
        { id: "i2", name: "Donut", quantity: 1, price: 100 },
      ],
    },
 */
const structureOrderData = (data: any[]) => {
  console.log(data);
  return data.map((order) => ({
    id: order.order_id,
    status: order.status,
    createdAt: order.createdAt,
    total: order.total_price,
    //@ts-ignore
    paymentStatus: order.Payment[0].status === "captured" ? "Paid" : "Unpaid",
    items: order.order_list.ListItems.map((item: any) => ({
      id: item.item_id,
      name: item.item.name,
      quantity: item.quantity,
      price: item.item.price,
      description: item.item.description,
      picture: item.item?.photo,
      category: item.item.category_id,
    })),
  }));
};

export const getUserOrders = async (userId: number) => {
  try {
    const response = await API.post("/orders/get/user", { userId });
    const structuredData = structureOrderData(response.data.data);
    return {
      success: true,
      data: structuredData,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.message || "Oops - Somthing went wrong.",
    };
  }
};
