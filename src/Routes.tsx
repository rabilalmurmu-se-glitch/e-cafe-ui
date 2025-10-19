import { createBrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import Catalogs from "./pages/Catalogs";
import Item from "./pages/Item";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import OrderList from "./pages/OrderList";
import PaymentPage from "./pages/Payment";
import OrderConfirmedPage from "./pages/OrderConfirmed";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
    children: [
      {
        path: "",
        element: <Catalogs />,
      },
      {
        path: "tea/:item",
        element: <Item />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "order-confirmed",
        element: <OrderConfirmedPage />,
      },
    ],
  },
]);
