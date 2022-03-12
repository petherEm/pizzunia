import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className="flex lg:p-32 p-2">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold">{pizza.title}</h1>
        <span className="text-3xl font-bold text-gray-700">${price}</span>
        <p className="text-slate-600 mt-4">{pizza.desc}</p>
        <h1 className="text-xl font-bold mt-4">Choose the size</h1>

        <div className="flex m-4 space-x-4 items-center">
          <div
            className="relative h-5 w-5 cursor-pointer"
            onClick={() => handleSize(0)}
          >
            <Image src="/img/size.png" layout="fill" />
          </div>
          <div
            className="relative h-7 w-7 cursor-pointer"
            onClick={() => handleSize(1)}
          >
            <Image src="/img/size.png" layout="fill" />
          </div>
          <div
            className="relative h-9 w-9 cursor-pointer"
            onClick={() => handleSize(2)}
          >
            <Image src="/img/size.png" layout="fill" />
          </div>
        </div>
        <h1 className="text-xl font-bold mt-4">Choose Ingredients</h1>

        {pizza.extraOptions.map((option) => (
          <div className="flex items-center" key={option.text}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              onChange={(e) => handleChange(e, option)}
            />
            <label className="ml-2" htmlFor="garlic">
              {option.text}
            </label>
          </div>
        ))}

        {/* Add to Cart */}
        <div className="flex mt-4">
          <input
            type="number"
            defaultValue={1}
            className="w-10 items-center text-center border-indigo-900 border-2"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="ml-4 bg-indigo-400 p-2 rounded-xl text-white focus:outline-none"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="relative lg:h-[360px] lg:w-[360px] h-[180px] w-[180px]">
        <Image src={pizza.img} layout="fill" />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
