"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState, useReducer } from "react";

export default function UseReducerPage() {
  const sections = [
      { label: "Objective", href: "#objective" },
      { label: "Explanation", href: "#explanation" },
      { label: "References", href: "#references" },
    ];

    const initialCartState = { cart:[], quantity: 0, total: 0 };

    // Reducer function to manage cart state                                                          
    function cartReducer(state: any, action: any) {
      switch(action.type) {                                                 
        case "ADD_ITEM":
          const updatedCart = [...state.cart, action.payload];
          const updatedQuantity = state.quantity + 1;
          const updatedTotal = state.total + action.payload.price;
          return {
            cart: updatedCart,
            quantity: updatedQuantity,
            total: updatedTotal
          };
        case "REMOVE_ITEM":
          const itemIndex = state.cart.findIndex((item: any) => item.id === action.payload.id);
          if (itemIndex < 0) return state;
          const newCart = [...state.cart];
          newCart.splice(itemIndex, 1);
          const newQuantity = state.quantity - 1;
          const newTotal = state.total - action.payload.price;
          return {
            cart: newCart,
            quantity: newQuantity,
            total: newTotal
          };
        default:
          return state;
      }
    }

    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    const addItem = (item: string, price: number) => {
      dispatch({ type: "ADD_ITEM", payload: { id: Date.now(), item, price } });
    }

    const removeItem = (item: any) => {
      dispatch({ type: "REMOVE_ITEM", payload: item });
    }
  
    return (
      <TutorialLayout title="useReducer Tutorial" sections={sections}>
        {/* Objective */}
        <section id="objective" className="space-y-2 mb-6">
          <h2 className="h2">Objective</h2>
          <p>Use useReducer to manage a shopping cart state.</p>
        </section>

        {/* Shopping Cart */}
        <section>
          <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-6">
          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => addItem("Item 1", 10)}
              className="btn btn-active"
            >
              Add Item 1 ($10)
            </button>
            <button 
              onClick={() => addItem("Item 2", 20)}
              className="btn btn-active"
            >
              Add Item 2 ($20)
            </button>
          </div>

          {/* Cart items */}
          <ul className="divide-y divide-gray-200">
            {cartState.cart.map((item: any) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.item}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
            
                <button
                  onClick={() => removeItem(item)}
                  className="px-3 py-1 text-xs font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          {/* Summary */}
          <div className="pt-4 border-t border-gray-200 space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Total Quantity</span>
              <span className="font-medium text-gray-900">
                {cartState.quantity}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Total Price</span>
              <span className="font-semibold text-gray-900">
                ${cartState.total}
              </span>
            </p>
          </div>
        </div>
        </section>

        <section className="space-y-2">
        <p className="font-semibold">Requirements</p>
        <ol className="ol">
          <li>Create a reducer that manages a shopping cart with add and remove item actions.</li>
          <li>Initialize the cart state with an empty array, quantity of 0, and total of 0.</li>
          <li>Implement the ADD_ITEM action to add an item to the cart and update quantity and total.</li>
          <li>Implement the REMOVE_ITEM action to remove an item from the cart and update quantity and total.</li>
        </ol>
      </section>

      {/* Explanation */}
      <section className="space-y-2" id="explanation">
        <h2 className="h2">What is Happening Here</h2>
        <p>Let's take the example from the useState tutorial and convert it to use useReducer instead.</p>
        <p>We would see that there are a few issues present</p>
        <ol className="ol">
            <li>State updates become tightly coupled. In useState, all related fields are updated together, which can lead to bugs and make the code harder to maintain.</li>
            <li>Business logic leaks into event handlers. As feature grows, event handlers become more complex and harder to test.</li>
            <li>Scaling becomes painful. Adding new features requires modifying existing event handlers and state update logic.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono mb-3">
          {`"use client";

import TutorialLayout from "@/components/Tutorial";
import React, { useState } from "react";

export default function UseStateCartPage() {
  const initialCartState = {
    cart: [],
    quantity: 0,
    total: 0,
  };

  const [cartState, setCartState] = useState<any>(initialCartState);

  const addItem = (item: string, price: number) => {
    setCartState((prev: any) => ({
      cart: [...prev.cart, { id: Date.now(), item, price }],
      quantity: prev.quantity + 1,
      total: prev.total + price,
    }));
  };

  const removeItem = (itemToRemove: any) => {
    setCartState((prev: any) => {
      const index = prev.cart.findIndex(
        (item: any) => item.id === itemToRemove.id
      );
      if (index < 0) return prev;

      const newCart = [...prev.cart];
      newCart.splice(index, 1);

      return {
        cart: newCart,
        quantity: prev.quantity - 1,
        total: prev.total - itemToRemove.price,
      };
    });
  };

  return (
    <TutorialLayout title="useState Cart Example">
      <section className="max-w-md mx-auto p-6 bg-white border rounded-lg space-y-6">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => addItem("Item 1", 10)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Item 1 ($10)
          </button>
          <button
            onClick={() => addItem("Item 2", 20)}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Add Item 2 ($20)
          </button>
        </div>

        <ul className="divide-y">
          {cartState.cart.map((item: any) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.item} – {item.price}
              </span>
              <button
                onClick={() => removeItem(item)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="text-sm space-y-1 border-t pt-3">
          <p>Total Quantity: {cartState.quantity}</p>
          <p>Total Price: ${cartState.total}</p>
        </div>
      </section>
    </TutorialLayout>
  );
}
`}
        </pre>
        <p>By using useReducer, we centralize state update logic in a single reducer function, making it easier to manage complex state transitions and improving testability.</p>
        <ol className="ol">
          <li>All related updates live in one centralized place.</li>
          <li>Logic lives in the reducer, not the UI.</li>
          <li>It's easier to test and debug due to "typed" actions like "ADD_ITEM", "REMOVE_ITEM", etc.</li>
        </ol>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 overflow-x-auto text-sm font-mono">
{`"use client";

import React, { useState, useReducer } from "react";

export default function UseReducerPage() {
 
    const initialCartState = { cart:[], quantity: 0, total: 0 };

    function cartReducer(state: any, action: any) {
      switch(action.type) {
        case "ADD_ITEM":
          const updatedCart = [...state.cart, action.payload];
          const updatedQuantity = state.quantity + 1;
          const updatedTotal = state.total + action.payload.price;
          return {
            cart: updatedCart,
            quantity: updatedQuantity,
            total: updatedTotal
          };
        case "REMOVE_ITEM":
          const itemIndex = state.cart.findIndex((item: any) => item.id === action.payload.id);
          if (itemIndex < 0) return state;
          const newCart = [...state.cart];
          newCart.splice(itemIndex, 1);
          const newQuantity = state.quantity - 1;
          const newTotal = state.total - action.payload.price;
          return {
            cart: newCart,
            quantity: newQuantity,
            total: newTotal
          };
        default:
          return state;
      }
    }

    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    const addItem = (item: string, price: number) => {
      dispatch({ type: "ADD_ITEM", payload: { id: Date.now(), item, price } });
      // logic is moved to the reducer
    }

    const removeItem = (item: any) => {
      dispatch({ type: "REMOVE_ITEM", payload: item });
    }`}
        </pre>
      </section>

      {/* References */}
      <section id="references" className="space-y-2 mb-6">
        <h2 className="h2">References</h2>

          {/* Video Reference */}
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=43H_PNDPHtg&t=176s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              🎥 Master React Hooks in easy way | useState & useReducer
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Beginner-friendly walkthrough of the <code>useReducer</code> hook in React, showing how to manage complex state transitions.
            </p>
          </div>

          {/* Official Docs */}
          <div className="space-y-2">
            <a
              href="https://react.dev/reference/react/useReducer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              📘 React Official Docs — useReducer Reference
            </a>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Official documentation on how <code>useReducer</code> works.
            </p>
          </div>
      </section>
      </TutorialLayout>
    )
}
