import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
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
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!fetchData.ok) {
        const errorData = await fetchData.json();
        alert(
          errorData.message ||
            "Login failed. Please check your email and password."
        );
        return;
      }

      const dataRes = await fetchData.json();
      console.log(dataRes);

      alert("Login Successfull");
      dispatch(loginRedux(dataRes));
      navigate("/");
    } else {
      alert("Please Enter required fields");
    }
  };

  return (
    <div className="p-2 mt-16">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h1 className="text-center text-xl font-bold shadow-md m-auto rounded p-2">
          Log In
        </h1>

        <form className="w-full py-4" onSubmit={handleSubmit}>
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
          Create an Account?{" "}
          <Link to={"/Signup"} className="text-slate-950 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
