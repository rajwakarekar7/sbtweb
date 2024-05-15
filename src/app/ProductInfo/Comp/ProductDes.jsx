import { AddToCart } from "@/app/Redux/Slice/CartSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DataProvideBYHook } from "@/app/DataProviderContext/DataProviderContext";

export default function ProductDes({ des }) {
  const oldCartData = useSelector((state) => {
    return state.cart;
  });
  const {user} = DataProvideBYHook()

  const dispatch = useDispatch();
  const Router = useRouter();
  const [wght, setWght] = React.useState("");

  const [qnt, setQnt] = React.useState(1);

  const AddtoCart = (
    user,
    product,
    id,
    price,
    image,
    qnt,
    wght,
    stock,
    form,
    oldCartData
  ) => {
    const selPrice = wght.price;
    const selWght = wght.qnt;
    const CartData = {
      product,
      id,
      price,
      image,
      qnt,
      selWght,
      selPrice,
      stock,
      form,
    };

    if (wght === "") {
      toast.error("Please Select Quantity !", {
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
    } else {
      localStorage.setItem(`${user?.email}`, JSON.stringify([...oldCartData, CartData]));
      dispatch(AddToCart(CartData));
      toast.success("Item Added In Cart !", {
        position: "bottom-right",
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
      Router.push("/CartPage");
    }
  };

  useEffect(() => {
    if (qnt === 0) {
      setQnt(1);
    } else if (qnt === Number(des?.stock)) {
      setQnt(1);
    }
  }, [des?.stock, qnt]);

  return (
    <div className="flex justify-start items-start borde border-gray-400 rounded-lg lg:w-[600px] w-[370px] lg:p-3 p-1 ">
      <div className="flex flex-col justify-start items-start borde p-2 gap-4 w-full m-2 border-gray-400 rounded-lg">
        <p className="text-xs font-bold text-black bg-yellow-200 p-2 rounded-lg">
          Sale {des?.off}%
        </p>
        <h1 className="text-2xl  font-bold text-black">{des?.product_name}</h1>

        <p className="text-sm font-semibold text-gray-600">Review(34⭐)</p>
        <div className="flex gap-2 flex-row justify-center items-center">
          <p className="text-3xl font-bold text-teal-500">₹{des?.price}</p>
          <div className="flex flex-col">
            <p className="text-xs font-bold text-yellow-500">{des?.off}%off </p>
            <p className="line-through text-xs font-bold text-gray-400">
              ₹{Number(des?.price) + 10 * Number(des?.off)}
            </p>
          </div>
        </div>
        <p className="text-black text-sm">{des?.description}</p>
        <div className="flex  gap-2 flex-row justify-center items-center">
          <p className="text-black font-bold lg:text-sm text-xs">
            {`Select`}{" "}
          </p>
          <div className="flex gap-4 flex-wrap justify-center items-center ">
            {des?.pricelist?.map((key, index) => {
              return (
                <p
                  key={index}
                  onClick={() =>
                    setWght({ price: key, qnt: des?.Quantity[index] })
                  }
                  className={
                    key === wght?.price
                      ? `text-white font-bold bg-teal-500 lg:p-2 p-1.5 rounded-lg lg:text-xs text-[10px] cursor-pointer`
                      : `cursor-pointer hover:shadow-lg  bg-gray-100 lg:p-2 p-1.5 rounded-lg text-[10px] lg:text-xs`
                  }
                >
                  {`${key}/${des?.Quantity[index]}`}
                  {}
                </p>
              );
            })}
          </div>
        </div>
        {/* <div className="flex justify-center items-center flex-row gap-4">
          <p
            onClick={() => setQnt(qnt - 1)}
            className="flex hover:shadow-lg flex-row  justify-center font-bold hover:-translate-y-1 items-center   text-sm text-black hover:text-white hover:bg-teal-500   cursor-pointer bg-gray-200 p-2 rounded-lg"
          >
            -
          </p>
          <p className="text-sm  2 text-black font-bold p-1 rounded-lg">
            {qnt}
          </p>
          <p
            onClick={() => setQnt(qnt === des.stock ? qnt : qnt + 1)}
            className="flex hover:shadow-lg flex-row  justify-center font-bold hover:-translate-y-1 items-center  text-sm text-black hover:text-white hover:bg-teal-500  rounded-[7px]bg-green-100 cursor-pointer bg-gray-200 p-2 rounded-lg"
          >
            +
          </p>
        </div> */}
        <div className="flex gap-5 mt-3 flex-row">
          {/* <p className="flex hover:shadow-lg flex-row  justify-center font-bold hover:-translate-y-1 items-center bg-green-100  text-sm text-teal-500 hover:text-white hover:bg-teal-500  rounded-[7px]bg-green-100 p-2 rounded-lg cursor-pointer ">
            ❤️
          </p> */}
          <div
            onClick={() =>
              AddtoCart(
                user,
                des.product_name,
                des._id,
                des.price,
                des.image[0],
                qnt,
                wght,
                des.stock,
                des.form,
                oldCartData
              )
            }
            className="flex hover:shadow-lg flex-row cursor-pointer lg:w-[300px] w-[300px] justify-center font-bold hover:-translate-y-1 items-center  p-2 text-[14px] text-white bg-teal-500 rounded-[7px]"
          >
            Order Now
          </div>
        </div>
      </div>
    </div>
  );
}
