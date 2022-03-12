import React from "react";
import Image from "next/image";
import Link from "next/link";

const PizzaCard = ({ pizza }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto cursor-pointer">
      <Link href={`/products/${pizza._id}`} passHref>
        <Image src={pizza.img} width={150} height={150} objectFit="contain" />
      </Link>

      <h1 className="text-xl font-bold">{pizza.title}</h1>
      <span className="text-slate-500 font-bold text-xl">
        ${pizza.prices[0]}
      </span>
      <p className="text-slate-500 text-xl w-50">{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
