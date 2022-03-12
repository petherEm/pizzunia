import React, { useState } from "react";

const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
        createOrder({customer, address, total, method: 0})
  }

  return (
    <div className="absolute top-40 left-0 flex justify-center w-full h-screen bg-violet-600 bg-opacity-25">
      <div className="flex flex-col bg-white h-60 w-100 justify-center items-center m-8 p-8 rounded-md">
        <h1 className="text-xl font-light m-2">
          You will pay $12 after delivery.
        </h1>
        <div className="flex items-center">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            placeholder=" John Doe"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="">Address:</label>
          <textarea 
            rows={3}
            placeholder=" Al. Jerozolimskie 500, Warsaw 00-000"
            type="text"
            className="mt-4"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button 
            className="bg-violet-300 hover:bg-violet-500 px-10 py-2 rounded-md m-4"
            onClick={handleClick}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
