import React from "react";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import { DataProvideBYHook } from "@/app/DataProviderContext/DataProviderContext";
import CancelOrder from "../Component/CancelOrder";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/app/Utils/Loader/Loader";
export default function ListOfOrder({ OrderData, refetch, loading }) {
  const { user } = DataProvideBYHook();
  if (loading === true) {
    return (
      <>
        <div className="flex justify-center mt-24 items-center ">
          <Loader />
        </div>
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="flex mt-5 lg:w-3/4 w-full justify-center items-center flex-col gap-5 lg:p-3 p-1">
        <h1 className=" mt-2 lg:text-xl text-sm text-teal-500 font-bold">
          Order Details
        </h1>
        {OrderData?.map((i) => {
          return (
            <>
              <div key={i?.orderid} className="flex w-full lg:border bg:border-gray-100 border-gray-400 border shadow-sm rounded-lg justify-center items-center lg:flex-row flex-col lg:gap-10 gap-2 lg:p-3 p-2">
                {/* Product */}

                <div className="flex flex-col w-full justify-center items-center gap-2">
                  <p className="lg:text-sm text-xs font-semibold  text-black">
                    OrderId :{" "}
                    <span className="bg-gray-50 text-teal-400 rounded-xl p-1">
                      #{i?.orderid}
                    </span>
                  </p>
                  {i?.productsDetails?.map((itm) => {
                    return (
                      <>
                        <div key={itm?.image} className="flex border rounded-lg p-2 flex-row gap-5 w-full justify-center items-center">
                          <Image
                            unoptimized
                            src={itm?.image}
                            width={0}
                            height={0}
                            className="w-16"
                          />

                          {/* product */}
                          <div className="flex flex-col bg-gray-20 items-start w-auto justify-start">
                            <p className="font-bold text-[14px] text-black">
                              {itm?.product}
                            </p>
                            {/* <p className="font-semibold text-gray-600 text-[14px] ">
                              {Number(itm?.selWght)}
                              {itm?.form === "solid" ? "kg" : "Ltr"}
                            </p> */}
                          </div>
                          <div className="flex flex-col bg-gray-20 items-start w-auto justify-start">
                            <p className="font-semibold text-gray-600 text-[14px] ">
                              ₹{Number(itm?.selPrice)}x{Number(itm?.qnt)}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-600 text-[14px] ">
                            {Number(itm?.selPrice) * Number(itm?.qnt)}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
                {/* pro end */}

                <div className="flex flex-col w-full justify-center items-center lg:gap-5 gap-2">
                  <div className="flex flex-row justify-center mt-2 items-center gap-3 ">
                    {i?.canceledByUser === true ? null : (
                      <CancelOrder
                        id={i?._id}
                        isDelivered={i?.delivered}
                        refetch={refetch}
                      />
                    )}
                    <p className="lg:text-xs text-xs font-semibold  text-black">
                      Created :{" "}
                      <span className="bg-gray-50 text-xs text-teal-400 rounded-xl p-1">
                        {i?.createdAt}
                      </span>
                    </p>
                  </div>
                  {/*Adress & *total*/}
                  <div className="flex flex-row  justify-center items-center gap-5">
                    {/* Adress */}
                    <div className="flex flex-col p-1  justify-start items-start">
                      <h1 class="font-medium text-start text-sm text-gray-900">
                        Details
                      </h1>
                      <div class="mt-1 text-xs text-gray-500">
                        <span class="block">{user?.name}</span>
                        {/* <span class="block">{i?.createdAt}</span> */}
                        <span class="block">{i?.email}</span>
                      </div>
                    </div>
                    {/* Total */}
                    <div className="flex flex-col  p-2 justify-center items-center">
                      <div class=" flex items-center justify-between">
                        <dt class="font-medium text-sm text-gray-900">
                          Total :{" "}
                        </dt>
                        <dd class="font-medium text-teal-500">
                          ₹{i?.totalAmount}
                        </dd>
                      </div>
                    </div>
                  </div>
                  {i?.canceledByUser === true ? (
                    <Chip color="danger" variant="dot">
                      Order Canceled
                    </Chip>
                  ) : (
                    <div className="flex justify-center items-center flex-row lg:gap-2 gap-2">
                      <Chip
                        size={`sm`}
                        className="text-xs lg:text-sm"
                        startContent={<CheckIcon size={18} />}
                        variant="faded"
                        color="success"
                      >
                        Ordered
                      </Chip>
                      {i?.process === false ? (
                        <Chip
                          size={`sm`}
                          className="text-xs lg:text-sm"
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="danger"
                        >
                          Not Dispatched
                        </Chip>
                      ) : (
                        <Chip
                          size={`sm`}
                          className="text-xs lg:text-sm"
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success"
                        >
                          Dispatched
                        </Chip>
                      )}

                      {i?.delivered === true ? (
                        <Chip
                          size={`sm`}
                          className="text-xs lg:text-sm"
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="success"
                        >
                          Delivered
                        </Chip>
                      ) : (
                        <Chip
                          size={`sm`}
                          className="text-xs lg:text-sm"
                          startContent={<CheckIcon size={18} />}
                          variant="faded"
                          color="danger"
                        >
                          Not Delivered
                        </Chip>
                      )}
                    </div>
                  )}

                  {/* Adress &  *total*/}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export const CheckIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};
