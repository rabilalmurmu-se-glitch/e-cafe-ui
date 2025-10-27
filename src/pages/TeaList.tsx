import React from "react";
import Tea from "../components/Tea";

interface TeaListProps {
  teas: any[];
  handleOrder?: (order: any) => void;
  handleRemove?: (id: any) => void;
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
      {teas.map((tea, index) => (
        <Tea
          key={`tea${index}`}
          itemId={tea?.id}
          name={tea.name}
          description={tea.description}
          price={tea.price}
          image={tea.photo}
          onOrder={handleOrder}
          onRemove={handleRemove}
          btnTitle={btnTitle}
          initialQuantity={tea.quantity || 1}
          rowId={tea.rowId}
        />
      ))}
    </div>
  );
};

export default TeaList;
