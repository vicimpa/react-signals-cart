import { addCartItem, delCartItem, useCartItem } from "../data/cart";

import { FC } from "react";
import { useComputed } from "@preact/signals-react";

export type TItemProps = {
  id: number;
  name: string;
  price: number;
};

export const Item: FC<TItemProps> = (props) => {
  const cartItem = useCartItem(props.id);

  const add = () => addCartItem(props.id);
  const del = () => delCartItem(props.id);

  const cartButtons = useComputed(() => {
    if (!cartItem.value) {
      return (
        <button className="grow" onClick={add}>
          Add
        </button>
      );
    }

    const price = (cartItem.value?.count.value ?? 0) * props.price;

    return (
      <>
        <button onClick={del}>Del</button>
        <p className="grow">x{cartItem.value.count} ({price})</p>
        <button onClick={add}>Add</button>
      </>
    );
  });

  return (
    <div className="item">
      <p>{props.name} - ({props.price.toFixed(2)})</p>
      <div className="buttons">
        {cartButtons}
      </div>
    </div>
  );
};