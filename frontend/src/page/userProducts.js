import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "../component/Card";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/listings/products/${user._id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error: ", error);
        alert("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserProducts();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Products</h1>
      <div className="grid grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              price={product.price}
              status={product.status}
              buying={false}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
