import React from "react";
import withBanner from "../HOC/WithBanner";
import { useParams } from "react-router-dom";
import TeaList from "./TeaList";
import blackTea from "../assets/black-tea.jpg";
import greenTea from "../assets/glass-green-tea.jpg";
import masalaChai from "../assets/masala-tea.jpg";

const teas = [
  {
    name: "Classic Black Tea",
    description: "A bold and rich tea with a deep aroma and refreshing finish.",
    price: 120,
    image: blackTea,
    id: "item1",
  },
  {
    name: "Green Tea",
    description:
      "Light, fresh, and full of antioxidants — perfect for a healthy start.",
    price: 150,
    image: greenTea,
    id: "item2",
  },
  {
    name: "Masala Chai",
    description:
      "An aromatic blend of tea and Indian spices that warms your soul.",
    price: 130,
    image: masalaChai,
    id: "item3",
  },
];
export interface OrderType {
  name: string;
  quantity: number;
  totalPrice: number;
}
const Item: React.FC = () => {
  const history = useParams();
  const handleOrder = (order: OrderType) => {
    console.log("Order details:", order);
  };
  return (
    <div className="catalogs-root">
      <div className="heading">{history.item}</div>
      <TeaList btnTitle="Add to list" teas={teas} handleOrder={handleOrder} />
    </div>
  );
};

export default withBanner(Item);
