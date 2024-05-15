import React from "react";

export default function Banner() {
  return (
    <>
      <div className="relative w-full h-[30px]  flex flex-wrap text-white bg-teal-500 justify-center items-center ">
        <div className="lg:text-sm text-xs">
          Shop Now !
        </div>

        <div className="order-2 flex w-1/12 items-start justify-end sm:absolute sm:right-0 sm:order-none sm:mr-1 sm:w-auto xl:mr-3">
          <button
            type="button"
            className="text-white transition duration-100 hover:text-indigo-100 active:text-indigo-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
