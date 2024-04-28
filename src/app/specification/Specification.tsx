import Image from "next/image";
import React from "react";
import del from "./asset/deli.png";
import Offer from "../Offer/Offer"
import { DataSpec } from "./Data";
export default function Specification() {
  const path = [""];
  return (
    <>
      <div className="bg-white  lg:mt-10">
        <div className="text-center w-full mx-auto py-12 px-2 sm:px-6 lg:py-16 lg:px-8 z-20">
          <Offer link={`https://contents.mediadecathlon.com/s1070609/k$71fe9e69882b323ddcfbe559bf3baf64/defaut.jpg?format=auto&quality=70&f=1480x0`}
/>
        </div>
      </div>
      <div className="flex flex-wrap lg:gap-10 gap-8 justify-center lg:mt-[50px] lg:mb-[100px] mt-[50px] items-center">
        {DataSpec.map((itm) => (
          <a
           href="https://wa.me/+9156047792"
            key={itm.name}
            className="flex flex-row gap-3 justify-center cursor-pointer w-[230px] h-[90px] border  items-center bg-gray-50 rounded-[15px]"
          >
            <Image
              className="hover:-translate-y-1"
              alt="spec"
              width={50}
              height={0}
              src={`${itm.icon}`}
            />
            <div>
              <p className="text-sm font-bold text-black">{itm.name}</p>
              <p className="text-xs font-bold text-gray-500">{itm.des}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
