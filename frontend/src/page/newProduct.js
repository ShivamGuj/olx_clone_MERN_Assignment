import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Newproduct = () => {
  const userId = useSelector((state) => state.user._id);
  console.log(userId);
  const [data, setData] = useState({
    name: "",
    price: "",
    status: "unsold",
    userId : userId
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, price } = data;

    if (name && price) {
      try {
        const fetchData = await fetch(`http://localhost:5000/api/listings/newProduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });

        const fetchRes = await fetchData.json();
        console.log(fetchRes);
        alert(fetchRes.message);

        setData(() => ({
          name: "",
          price: "",
          status: "unsold",
          userId: userId
        }));
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      alert("Enter required Fields");
    }
  };

  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          className='bg-slate-200 p-1 my-1'
          onChange={handleOnChange}
          value={data.name}
        />
        <label htmlFor='price' className='my-1'>Price</label>
        <input
          type="text"
          className='bg-slate-200 p-1 my-1'
          name='price'
          onChange={handleOnChange}
          value={data.price}
        />
        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
