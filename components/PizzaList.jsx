import React from "react";
import Image from "next/image";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className="flex flex-col lg:p-10 p-4 items-center justify-center">
      <h1 className="lg:text-8xl text-4xl font-bold text-slate-700">Our top selection</h1>
      <p className="text-slate-700 text-xl mt-10 mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta
        velit saepe architecto distinctio obcaecati quam. Omnis saepe
        repudiandae voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta
        velit saepe architecto distinctio obcaecati quam. Omnis saepe
        repudiandae voluptatem!
      </p>
     
      <div className="lg:grid lg:grid-cols-4 lg:gap-1 md:grid md:grid-cols-2 md:gap-1">
        
        {pizzaList.map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
        
        
      </div>
    </div>
  );
};

export default PizzaList;
