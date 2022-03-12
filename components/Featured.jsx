import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="flex justify-between lg:p-20 p-10">
      <div className="lg:w-1/2"> 
          <h1 className="font-extrabold lg:text-8xl text-4xl text-indigo-900">Best Pizza in Town</h1>
          <p className="font-extrabold text-4xl text-indigo-500">Try our latest promo <span className="text-red-600">get two pay for one</span></p>
      </div>
      <div className="relative lg:h-80 lg:w-80">
        <Image src="/img/f1.png" layout="fill" className="absolute" />
      </div>
    </div>
  );
};

export default Featured;
