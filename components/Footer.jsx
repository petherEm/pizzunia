import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex bg-blue-400 lg:h-48 md:h-48 w-full space-x-4">
      <div className="relative lg:inline-flex hidden h-full w-[250px]">
        <Image src="/img/bg.png" layout="fill" alt="" />
      </div>
      <div className="text-white">
        <h1 className="lg:text-2xl text-xl font-bold text-white mb-4 mt-4">
          Find our restaurants:
        </h1>
        <div className="flex md:space-x-4 lg:space-x-10 space-x-4">
          <div className="lg:text-xl text-[12px]">
            <p>Al. Krakowska 99</p>
            <p>+48 999 999 991</p>
            <p>Mon - Sat: 12 - 23</p>
          </div>
          <div className="lg:text-xl text-[12px]">
            <p>Al. Jana Pawla 88</p>
            <p>+48 999 999 992</p>
            <p>Mon - Sat: 12 - 23</p>
          </div>
          <div className="lg:text-xl text-[12px]">
            <p>Grzybowska 99</p>
            <p>+48 999 999 998</p>
            <p>Mon - Sat: 12 - 23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
