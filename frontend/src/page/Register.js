import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPass = () => {
    setShowConfirmPass((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = data;
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `http://localhost:5000/api/auth/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        console.log(dataRes);
        alert("Registered");
        navigate("/login");
      } else {
        alert("password and confirm password are not equal");
      }
    } else {
      alert("Please enter required field");
    }
  };

  return (
    <div className="p-2 mt-16">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h1 className="text-center text-xl font-bold shadow-md m-auto rounded p-2">
          Sign Up
        </h1>

        <form className="w-full py-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-sm font-bold">
            Name
          </label>
          <input
            type={"text"}
            id="name"
            name="name"
            className="mb-2 mt-0.5 w-full bg-slate-200 px-1 py-0 rounded border-none outline-none"
            value={data.name}
            onChange={handleOnChange}
          />

          <label htmlFor="email" className="text-sm font-bold">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mb-2 mt-0.5 w-full bg-slate-200 px-1 py-0 rounded border-none outline-none"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password" className="text-sm font-bold">
            Password
          </label>
          <div className="flex px-1 py-0 bg-slate-200 rounded mb-2 mt-0.5">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="  w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword" className="text-sm font-bold">
            Confirm Password
          </label>
          <div className="flex px-1 py-0 bg-slate-200 rounded mb-8 mt-0.5">
            <input
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="  w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowConfirmPass}>
              {showConfirmPass ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="text-white font-medium max-w-[120px] text-center center w-full bg-slate-700 hover:bg-slate-950 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
        <p className="text-left-side text-sm">
          Already have an Account?{" "}
          <Link to={"/login"} className="text-slate-950 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
