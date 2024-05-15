import React from "react";
import { Divider } from "@nextui-org/react";

export default function TotalCart({ DataCart, total }) {
  return (
    <>
      <div className="flex  bg-white rounded-lg  shadow- smh-[300px] w-full flex-col gap-3 justify-start p-3 items-center">
        <p className="text-start font-normal text-black text-[18px]">
          Price details
        </p>
        <Divider className="" />
        <div className="flex flex-col w-[350px] justify-center items-center gap-4">
          <div className="flex justify-start items-start flex-row gap-40">
            <p className=" inline-flex flex-row gap-40 justify-start font-normal text-black text-[16px]">
              Price({DataCart?.length || 0} item)
            </p>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-start items-start flex-row gap-40">
            {/* <p className=" inline-flex flex-row justify-start gap-40 font-normal text-black text-[16px]">
              Discount({DataCart?.length === 0 ? "0" : process.env.Discount}%)
            </p>
            <span className="text-teal-500">-{DataCart?.length === 0 ? "0" : process.env.Discount}%</span> */}
          </div>
          <div className="flex justify-start items-start flex-row gap-36">
            <p className="text-xs font-semibold text-black">DeliveryCharges : ₹50</p>
          </div>
        </div>
        <Divider className="" />
        <div className="flex justify-center items-center flex-row gap-36">
          <p className=" inline-flex  justify-start flex-row gap-40  text-black font-bold text-lg">
            Total Amount
          </p>
          <span className="text-black font-bold text-lg">₹{Number(total) + 50} </span>
        </div>
        <Divider className="my-1" />
        <p className=" inline-flex  justify-start flex-row gap-40  text-teal-500 font-bold text-sm">
          You Save 10 % Money On this Order!
        </p>
      </div>
    </>
  );
}
