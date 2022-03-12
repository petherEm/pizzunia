import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  // This values are the props in the UI
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = axios.post("http://localhost:3000/api/orders", data)
      
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset())
    } catch(err) {
      console.log(err)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({ 
                  customer: shipping.name.full_name, 
                  address: shipping.address.address_line_1,
                  total: cart.total,
                  method: 1
              })
            
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="flex lg:flex-row flex-col lg:p-16 p-2 justify-center">
      <div className="flex justify-center items-center lg:mx-auto">
        <table className="table-auto">
          <tbody>
            <tr className="">
              <th className="lg:px-6 lg:inline-flex hidden">Product</th>
              <th className="lg:px-6">Name</th>
              <th className="lg:px-6">Extras</th>
              <th className="lg:px-6">Price</th>
              <th className="lg:px-6">Quantity</th>
              <th className="lg:px-6">Total</th>
            </tr>
          </tbody>

          <tbody>
            {cart.products.map((product) => (
              <tr key={product._id}>
                <td className="lg:inline-flex hidden px-6 py-4">
                  <div className="relative lg:inline-flex hidden lg:h-20 lg:w-20">
                    <Image src={product.img} layout="fill" objectFit="cover" />
                  </div>
                </td>
                <td>
                  <span className="flex lg:px-6 px-2 justify-center items-center">
                    {product.title}
                  </span>
                </td>
                <td>
                  <span className="flex lg:px-6 px-2 justify-center items-center">
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className="flex lg:px-6 px-2 justify-center items-center">
                    ${product.price}
                  </span>
                </td>
                <td>
                  <span className="flex lg:px-6 px-2 justify-center items-center">
                    ${product.quantity}
                  </span>
                </td>
                <td>
                  <span className="flex lg:px-6 px-2 justify-center items-center">
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex lg:inline-flex flex-col lg:w-1/4 justify-center bg-slate-300 p-4 lg:mt-0 mt-4">
        <div className="flex flex-col justify-center gap-y-2">
          <h1 className="text-2xl font-bold">CART TOTAL</h1>
          <h1 className="text-sm">
            SUBTOTAL:{" "}
            <span className="font-bold text-indigo-700">${cart.total}</span>
          </h1>
          <h1 className="text-sm">
            DISCOUNT: <span className="font-bold text-indigo-700">$0</span>
          </h1>
          <h1 className="text-sm">
            TOTAL:{" "}
            <span className="font-bold text-indigo-700">${cart.total}</span>
          </h1>

          {open ? (
            <div className="flex flex-col">
              <button 
                className="m-2 bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-bold rounded-md p-2"
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ARiaV1Mez2VdxXiPNbiMklkMUneztgNRtitnXY1_7FqFeoZ39f1K0cbRaGN-0GhfTWFXzMZlzHN7TomW",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "p24,card",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 p-2 rounded-lg text-white lg:mx-8 hover:bg-blue-300"
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
       {cash && (
         <OrderDetails total={cart.total} createOrder={createOrder}/>
       )}
    </div>
  );
};

export default Cart;
