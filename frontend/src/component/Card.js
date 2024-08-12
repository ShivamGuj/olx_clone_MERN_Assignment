import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ name, price, status, buying, productId }) => {
  
  console.log(productId);

  const userId = useSelector((state) => state.user._id);
  const navigate = useNavigate();

  const handlePurchase = async () => {
    
    if (userId) {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/buy`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            userId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Purchase successful!");
          navigate('/purchased-products')
        } else {
          alert("Purchase failed: " + data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please login to buy it!!");
    }
  };

  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px] flex flex-col">
      {name ? (
        <>
          <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
            {name}
          </h3>
          <p className="text-center font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          <p className="text-center font-semibold">
            <span>{status}</span>
          </p>
          {buying && (
            <div className="flex justify-center mt-5">
              <button
                onClick={handlePurchase}
                disabled={status === "sold"}
                className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
              >
                Buy
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};

export default Card;
