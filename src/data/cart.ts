import { ReadonlySignal, Signal, computed, signal, useComputed } from "@preact/signals-react";

import { STORE } from "./store";

export type CartItem = {
  id: number,
  name: string;
  count: Signal<number>;
  price: number;
  ammount: ReadonlySignal<number>;
};
export type Cart = { [key: string]: CartItem; };

export const cartStore = signal<Cart>({});

const getId = (id: number) => `:${id}`;

export const useCartItem = (id: number) => {
  return useComputed<CartItem | null>(() => {
    return cartStore.value[getId(id)] ?? null;
  });
};

export const addCartItem = (id: number) => {
  let { [getId(id)]: _now, ...store } = cartStore.value;
  const item = STORE.get(id);

  if (!item) return;

  if (!_now) {
    const count = signal(0);
    const ammount = computed(() => count.value * item.price);

    cartStore.value = {
      ...store,
      [getId(id)]: (
        _now = {
          id,
          count,
          ammount,
          name: item.name,
          price: item.price,
        }
      )
    };
  }

  _now.count.value++;
};

export const delCartItem = (id: number) => {
  let { [getId(id)]: _now, ...store } = cartStore.value;
  if (!_now) return;
  if (--_now.count.value <= 0) {
    cartStore.value = store;
  }
};