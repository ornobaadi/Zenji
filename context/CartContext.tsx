"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CartItem, Size } from "@/types";

const CART_STORAGE_KEY = "zenji_cart_state";

export interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; slug: string; size: Size }
  | { type: "UPDATE_QTY"; slug: string; size: Size; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "HYDRATE"; items: CartItem[] };

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.slug === action.item.slug && item.size === action.item.size
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.item];
      }

      return {
        ...state,
        items: newItems,
        isDrawerOpen: true,
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.slug === action.slug && item.size === action.size)
        ),
      };
    }
    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.slug === action.slug && item.size === action.size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.slug === action.slug && item.size === action.size
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
        isDrawerOpen: false,
      };
    }
    case "OPEN_DRAWER": {
      return {
        ...state,
        isDrawerOpen: true,
      };
    }
    case "CLOSE_DRAWER": {
      return {
        ...state,
        isDrawerOpen: false,
      };
    }
    case "HYDRATE": {
      return {
        ...state,
        items: action.items,
      };
    }
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: Size) => void;
  updateQuantity: (slug: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // Ignore hydration parse errors
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  const totalItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", item });
  const removeItem = (slug: string, size: Size) =>
    dispatch({ type: "REMOVE_ITEM", slug, size });
  const updateQuantity = (slug: string, size: Size, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", slug, size, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const openDrawer = () => dispatch({ type: "OPEN_DRAWER" });
  const closeDrawer = () => dispatch({ type: "CLOSE_DRAWER" });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
