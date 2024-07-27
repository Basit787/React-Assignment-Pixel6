import React from "react";
import { BsList } from "react-icons/bs";
import logo from "../assets/logo.jpeg";

const Page = ({ children }) => {
  return (
    <div className="m-5 border-gray-200 border-2 rounded">
      <div className="flex flex-row justify-between items-center m-2 ">
        <img src={logo} alt={logo} className="h-14" />
        <BsList className="mx-5 text-red-500 text-xl font-bold cursor-pointer" />
      </div>
      <hr />
      <div className="m-2">{children}</div>
    </div>
  );
};

export default Page;
