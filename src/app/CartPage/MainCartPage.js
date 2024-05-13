"use client";
import React from "react";
import AddressField from "../Utils/CartComp/AddressField";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CheckOut from "./CheckOut";
import CartedProduct from "../Utils/CartComp/CartedProduct";
import TotalCart from "../Utils/CartComp/TotalCart";
import { DataProvideBYHook } from "../DataProviderContext/DataProviderContext";
import DOMPurify from "dompurify";
export default function MainCartPage() {
  const { user } = DataProvideBYHook();
  console.log(user);
  React.useEffect(() => {
    const adress = localStorage?.getItem("address");
    const dataAdress = JSON.parse(adress);

    setFormValue(dataAdress);
  }, []);
  const [formValue, setFormValue] = React.useState({
    state: "",
    city: "",
    pincode: "",
    referenceMobileNumber: "",
    deliveryAddress: "",
  });
  const handleAdrsForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue((prv) => ({
      ...prv,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  const DataCart = useSelector((state) => {
    return state.cart;
  });
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    const cartTotal = DataCart?.reduce(
      (acc, item) => acc + Number(item?.selPrice) * Number(item?.qnt),
      0
    );
    setTotal(cartTotal);
  }, [DataCart]);

  const orderfinal = {
    productsDetails: DataCart,
    address: formValue,
    orderid: String(Date.now()),
    email: user?.email,
    name: user?.name,
    time: String(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ),
    totalAmount: total,
    active: true,
    process: false,
    delivered: false,
    canceled: false,
    canceledByUser: false,
    createdAt: String(
      new Date().toJSON().slice(0, 10).split("-").reverse().join("/")
    ),
  };

  const HandlePlaceOrder = (onOpen) => {
    if (
      !formValue?.state ||
      !formValue?.city ||
      !formValue?.referenceMobileNumber ||
      !formValue?.deliveryAddress
    ) {
      toast.error("Fill the Address!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
        style: {
          borderRadius: 10,
          font: "bold",
          fontSize: 15,
        },
      });
    } else if (DataCart?.length === 0) {
      toast.error("Your Cart is Empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        progress: false,
        theme: "light",
        style: {
          borderRadius: 10,
          font: "bold",
          fontSize: 15,
        },
      });
    } else {
      onOpen();
    }
  };

  return (
    <>
      {/* Same as */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex lg:flex-row flex-col gap-5 justify-center p-3 items-start  ">
        {/* adress start */}
        <div className="flex flex-col lg:w-3/5 w-full borde gap-4  rounded-lg justify-center p-3 items-center">
          <div className="border rounded-lg w-full p-4  bg-white ">
            <div className="flex justify-between  items-center flex-row gap-0">
              {formValue?.city &&
                formValue?.deliveryAddress &&
                formValue?.pincode &&
                formValue?.referenceMobileNumber ? (
                <div className="flex justify-start flex-col gap-0">
                  <p className="text-sm font-normal">
                    Deliver-To:
                    <span className="text-sm font-bold text-black">
                      {user?.name},{formValue.pincode}
                    </span>
                  </p>
                  <p className="text-[12px]">{`${formValue?.city},${formValue?.deliveryAddress},${formValue?.referenceMobileNumber}`}</p>
                </div>
              ) : (
                <p className="text-sm ">No Address Found</p>
              )}
              <div className="flex flex-col justify-end">
                {" "}
                <AddressField
                  formValue={formValue}
                  setFormValue={setFormValue}
                  handleAdrsForm={handleAdrsForm}
                />{" "}
              </div>
            </div>
          </div>
          <div className=" rounded-lg w-full ">
            <CartedProduct DataCart={DataCart} />
          </div>
        </div>
        {/* adress end */}
        <div className="flex flex-col lg:w-1/3 w-full  gap-5 justify-center items-center">
          <div className="flex flex-col   rounded-lg  border   lg:mt-5 justify-center items-center">
            <TotalCart DataCart={DataCart} total={total} />
          </div>
          <div className="w-3/4">
            <CheckOut
              HandlePlaceOrder={HandlePlaceOrder}
              orderfinal={orderfinal}
              DataCart={DataCart}
              total={Number((Number(total)+50))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
