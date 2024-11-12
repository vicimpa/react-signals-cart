import { Cart } from "./components/Cart";
import { Item } from "./components/Item";
import { STORE } from "./data/store";

export const App = () => {
  return (
    <div className="container">
      <div className="store">
        {
          [...STORE].map(
            ([id, { name, price }]) => {

              return (
                <Item
                  key={id}
                  id={id}
                  name={name}
                  price={price} />
              );
            }
          )
        }
      </div>
      <Cart />
    </div>
  );
};