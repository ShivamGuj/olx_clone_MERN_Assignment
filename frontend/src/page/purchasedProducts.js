import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../component/Card";

const PurchasedProducts = () => {
  const [products, setProducts] = useState([]);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/listings/purchased-products/${userId}`
        );
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          alert("Not Fetched");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPurchasedProducts();
  }, [userId]);

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-4">Your Purchased Products</h2>
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <Card
            key={product._id}
            name={product.name}
            price={product.price}
            status={product.status}
            buying={false}
          />
        ))}
      </div>
    </div>
  );
};

export default PurchasedProducts;
