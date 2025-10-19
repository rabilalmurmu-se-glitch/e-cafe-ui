import React from "react";
import Tea from "../components/Tea";
import type { OrderType } from "./Item";

interface TeaListProps {
  teas: any[];
  handleOrder?: (order: OrderType) => void;
  handleRemove?: (id: string) => void;
  btnTitle: string;
}

const TeaList: React.FC<TeaListProps> = ({
  teas,
  handleOrder,
  handleRemove,
  btnTitle,
}) => {
  return (
    <div className="teaList-root">
      {teas.map((tea) => (
        <Tea
          key={tea.id}
          name={tea.name}
          description={tea.description}
          price={tea.price}
          image={tea.image}
          onOrder={handleOrder}
          // @ts-ignore
          onRemove={() => handleRemove(tea.id)}
          btnTitle={btnTitle}
        />
      ))}
    </div>
  );
};

export default TeaList;
