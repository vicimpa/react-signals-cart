import { addCartItem, cartStore, delCartItem } from "../data/cart";

import { useComputed } from "@preact/signals-react/runtime";

export const Cart = () => {
  const cart = useComputed(() => {
    return Object.values(cartStore.value);
  });

  const cartAmmount = useComputed(() => {
    return cart.value.reduce((acc, item) => {
      return acc + item.ammount.value;
    }, 0);
  });

  const cartItems = useComputed(() => {
    if (!cart.value.length)
      return <p>Cart empty</p>;

    return cart.value.map(item => (
      <div key={item.id}>
        <p>{item.name} [{item.price} x {item.count}]</p>
        <p>
          <button onClick={() => delCartItem(item.id)}>Del</button>
          <button onClick={() => addCartItem(item.id)}>Add</button>
        </p>
      </div>
    ));
  });

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cartItems}
      <hr />
      <p>Total Ammount: <b>{cartAmmount}</b></p>
    </div>
  );
};