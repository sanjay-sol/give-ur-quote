
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setauth] = useState(false);

  const handleSubmit = ()=>{
    
    let user = {
        name:name,
        email:email,
        password:password
    }
  
    //eslint-disable-next-line
    if(!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(email)){
        alert("Invali Email") 
        return
    }
    axios.post('http://localhost:3002/signup',user)
    .then(res => {
        alert(res.data.message)
        setauth(true)
    })
    .catch(err=> alert(err.response.data.message))
  }
  if (auth) {
    return <Navigate to="/signin" />;
  }
  return (
    <>
    <Navbar/>
      <section className="w-full px-8 lg:mt-10 md:mt-10 py-16 bg-gray-100 xl:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="w-full space-y-5 md:w-3/5 md:pr-16">
              <p
                className="font-medium text-blue-500 uppercase"
                data-primary="blue-500"
              >
                Building Businesses
              </p>
              <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                Changing The Way People Do Business.
              </h2>
              <p className="text-xl text-gray-600 md:pr-16">
                Learn how to engage with your visitors and teach them about your
                mission. We're revolutionizing the way customers and businesses
                interact.
              </p>
            </div>

            <div className="w-full mt-16 md:mt-0 md:w-2/5">
              <div
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-6  text-2xl font-medium text-center">
                  Sign Up..!!
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=> setname(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent border-slate-400 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  
                  placeholder="Name"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e)=> setemail(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent border-slate-400 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Email address"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e)=> setpassword(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent border-slate-400 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Password"
                />
                <div className="block">
                  <button
                    className="w-full px-3 py-4 font-medium text-white bg-indigo-600 rounded-lg"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
                <p className="w-full mt-4 text-sm text-center text-gray-500">
                  Have an Account .??{" "}
                  <Link to="/signin" className="text-blue-500 underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SignUp.propTypes = propTypes;
SignUp.defaultProps = defaultProps;
// #endregion

export default SignUp;
