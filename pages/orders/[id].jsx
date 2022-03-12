import React from "react";
import Image from "next/image";
import axios from "axios";

const Order = ({ order }) => {

  const status = order.status;

  return (
    <div className="flex p-16 justify-center">
      <div className="flex flex-col justify-center items-start mx-auto">
        <div className="flex justify-center items-center mx-auto">
          <table className="table-auto">
            <tr className="">
              <th className="px-6">Order ID</th>
              <th className="px-6">Customer</th>
              <th className="px-6">Address</th>
              <th className="px-6">Total</th>
            </tr>
            <tr>
              <td>
                <span className="flex px-6 justify-center items-center">
                  {order._id}
                </span>
              </td>
              <td>
                <span className="flex px-6 justify-center items-center">
                  {order.customer}
                </span>
              </td>
              <td>
                <span className="flex px-6 justify-center items-center">
                  {order.address}
                </span>
              </td>
              <td>
                <span className="flex px-6 justify-center items-center">
                  ${order.total}
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-black m-4">
            <Image
              src="/img/paid.png"
              width="40px"
              height="40px"
              objectFit="cover"
            />
            <p className="text-sm">Payment</p>
            <div className="relative h-4 w-4">
              <Image src="/img/checked.png" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="text-slate-400 m-4">
            <Image
              src="/img/bake.png"
              width="40px"
              height="40px"
              objectFit="cover"
            />
            <p className="text-sm">Preparing</p>
            {/* <div className="relative h-4 w-4">
              <Image src="/img/checked.png" layout="fill" objectFit="cover" />
            </div> */}
          </div>
          <div className="text-slate-400 m-4">
            <Image
              src="/img/bike.png"
              width="40px"
              height="40px"
              objectFit="cover"
            />
            <p className="text-sm">En route</p>
            {/* <div className="relative h-4 w-4">
              <Image src="/img/checked.png" layout="fill" objectFit="cover" />
            </div> */}
          </div>
          <div className="text-slate-400 m-4">
            <Image
              src="/img/delivered.png"
              width="40px"
              height="40px"
              objectFit="cover"
            />
            <p className="text-sm">Delivered</p>
            {/* <div className="relative h-4 w-4">
              <Image src="/img/checked.png" layout="fill" objectFit="cover" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 justify-center bg-slate-300 p-4">
        <div className="flex flex-col justify-center gap-y-2">
          <h1 className="text-2xl font-bold">CART TOTAL</h1>
          <h1 className="text-sm">
            SUBTOTAL: <span className="font-bold text-indigo-700">$34.40</span>
          </h1>
          <h1 className="text-sm">
            DISCOUNT: <span className="font-bold text-indigo-700">$0</span>
          </h1>
          <h1 className="text-sm">
            TOTAL: <span className="font-bold text-indigo-700">$34.40</span>
          </h1>
          <h1 className="bg-green-600 text-white p-2 text-center rounded-lg">
            PAID
          </h1>
        </div>
      </div>
    </div>
    
  );
};


export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)

  return {
    props: { order: res.data }
  }
}


export default Order;
