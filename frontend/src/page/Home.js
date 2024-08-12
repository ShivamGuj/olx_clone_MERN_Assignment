import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/listings/products`
        );
        console.log(res.data);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-5 gap-4">
        {products.map(
          (product) =>
            userId !== product.userId && (
              <Card
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                status={product.status}
                buying={true}
              />
            )
        )}
      </div>
      <div className="flex justify-center gap-10 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
