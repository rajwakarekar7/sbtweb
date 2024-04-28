import React, { useState, useEffect } from "react";
import axios from "axios";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { DataProvideBYHook } from "../DataProviderContext/DataProviderContext";
import SignIn from "../Auth/SignIn";
import OrderPlaced from "./hooks/OrderPlaceHook";
import SuccessOrder from "./Comp/SuccessOrder";
import Captcha from "../Captcha/Captcha";

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-[#00DDB8]"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function CheckOut({ HandlePlaceOrder, orderfinal, DataCart, total }) {
  const Router = useRouter();
  const { user } = DataProvideBYHook();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState("CASH");
  const [check, setCheck] = useState(false);
  const [orderLoad, setOrderLoad] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (selected === "CARD") {
      // Load Razorpay script when "CARD" is selected
      const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          // Razorpay script loaded successfully
        };
        document.body.appendChild(script);
      };

      loadRazorpayScript();

      return () => {
        // Cleanup function
        // Remove the Razorpay script when component unmounts
        const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, [selected]);

  const handlePayment = async () => {
    if (selected === "CASH") {
      OrderPlaced(orderfinal, setOrderLoad, setStatus, setCheck, onClose);
      // Handle Cash on Delivery logic
      // Example: setOrderLoad(true); setStatus(true); setCheck(true);
    } else if (selected === "CARD") {
      // Handle Razorpay payment logic
      try {
        setOrderLoad(true);
        const response = await axios.post('http://localhost:8000/crorder', {
          amount: Number(total)
        });
        const options = {
          key: 'rzp_test_AwYjl9iEgMP9Zk', // Replace with your Razorpay key
          amount: Number(total * 100), // amount in paise
          currency: 'INR',
          name: 'SPORTO',
          description: 'Test Transaction',
          order_id: response.data.order_id,
          handler: (response) => {
            alert(response.razorpay_payment_id);
            // Handle success callback
            OrderPlaced(orderfinal, setOrderLoad, setStatus, setCheck, onClose);
          },
          prefill: {
            name: 'Test User',
            email: 'test@example.com',
            contact: '1234567890',
          },
          notes: {
            address: 'Test Address',
          },
          theme: {
            color: '#F37254',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error handling Razorpay payment:', error);
      } finally {
        setOrderLoad(false);
      }
    }
  };

  return (
    <>
      <SuccessOrder status={status} setStatus={setStatus} />

      {user?.name ? (
        <>
          <Button
            onClick={() => HandlePlaceOrder(onOpen)}
            size="lg"
            className="bg-teal-500 w-full font-bold text-white"
          >
            PLACE ORDER
          </Button>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-center items-center gap-3">
            <p className="text-sm bg-gray-50 p-2 rounded-lg font-semibold text-black">
              😎 You are not Login 😎
            </p>
          </div>
        </>
      )}

      <Modal
        scrollBehavior="outside"
        size="xl"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
          <ModalBody>
            <div className="flex  flex-col  p-2 justify-center items-center  gap-5">
              <div id="summary" className="  w-full ">
                <div class="flex justify-between mt-10 mb-5">
                  <span class="font-semibold text-sm uppercase">Items</span>
                  <span class="font-semibold text-sm">
                    {DataCart?.length || 0}{" "}
                  </span>
                </div>
                <div>
                  <label class="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select class="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping {String(process.env.SHIPPING)}</option>
                  </select>
                </div>
                <div class="border-t mt-8">
                  <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
              {DataCart?.length > 0 ? check === true ? <p></p> : <Captcha setCheck={setCheck} /> : <p></p>}
              <div className="w-auto">
                <RadioGroup
                  label="Payment Mode"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <CustomRadio
                    description="100% Free Delivery"
                    value="CASH"
                  >
                    Cash On Delivery
                  </CustomRadio>
                  {/* <CustomRadio

                    description="Pay Secure Pay Digitaly"
                    value="UPI"
                  >
                    UPI
                  </CustomRadio> */}
                  <CustomRadio

                    description="Card/Net Banking"
                    value="CARD"
                  >
                    Card/Net Banking
                  </CustomRadio>
                </RadioGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="mt-5">
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              isDisabled={check === true ? false : true}
              color="#00DDB8"
              className="bg-teal-500 text-white font-bold"
              onPress={handlePayment}
            >
              Confirm Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
