import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className="flex justify-between items-center text-white bg-indigo-500 h-auto p-8 sticky top-0 mx-auto z-50">
      <div className="flex items-center cursor-pointer">
        <div className="rounded-full h-10 w-10  bg-white mr-4 items-center">
          <div className="relative h-4 w-4 translate-x-2 translate-y-2 p-3">
            <Image
              src="/img/telephone.png"
              layout="fill"
              className="absolute"
            />
          </div>
        </div>

        <div>
          <p className="font-bold">Order Now</p>
          <p>+48 999 999 999</p>
        </div>
      </div>
      <div>
        <ul className="lg:flex hidden space-x-4">
          <Link href="/" passHref>
            <li className="hover:underline cursor-pointer">Homepage</li>
          </Link>
          <Link href="/" passHref>
            <li className="hover:underline cursor-pointer">Products</li>
          </Link>
          <Link href="/" passHref>
            <li className="hover:underline cursor-pointer">Menu</li>
          </Link>
          <Link href="/" passHref>
            <li className="hover:underline cursor-pointer">Events</li>
          </Link>
          <Link href="/" passHref>
            <li className="hover:underline cursor-pointer">Blog</li>
          </Link>
          <Link href="/" passHref> 
            <li className="hover:underline cursor-pointer">Contact</li>
          </Link>
        </ul>
      </div>

      <Link href="/cart" passHref>
        <div className="relative h-8 w-8 cursor-pointer">
          <Image src="/img/cart.png" layout="fill" />
          <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-400 rounded-full">
            <div className="translate-x-1.5 text-sm">{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
