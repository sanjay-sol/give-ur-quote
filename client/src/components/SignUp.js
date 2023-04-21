
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
// import Navbar from "./Navbar";
// import Navbar1 from "./Navbar1";
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
    axios.post(`${process.env.BACKEND_API}/signup`,user)
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
<section className="w-full px-8 text-gray-700 bg-gray-900">
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
            <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-2 text-xl font-black leading-none text-gray-400  select-none">CVR<span className="text-indigo-600" data-primary="indigo-600"> <img className="w-16 h-9 rounded-lg mr-2" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBf8pOSlD20PmO3plmeIK9qspAmYe7YheFTBhVhoMi2yLPmDJz_Gk8owfQLePRop38Oei7gRhoRD-QYQXSnDp0ci-W7XM4yEVDrz5GCYfzNOf3v4kkfruUdUFXUqJL2AKPnsD5y1yHcjnuN41QiYYzOn4oYgIy6MUC34VktANtW-1_KMaMA6Lkc1fO/s2048/IMG_20230225_120158.png" alt="hood" /></span></span>

            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                 {/* <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Dashboard</Link> */}
                
                {/* <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign Up</Link>  */}
               {/* <Link to="/" className="mr-6 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link> */}
               
               
                {/* <Link to={`/profile/${localid}`}  className="mr-5  font-bold leading-6 text-yellow-600 hover:text-yellow-500">My Profile</Link> */}

           
            
                
            </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {/* <Link to="/signin" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
                Sign up
            </Link> */}
                    <Link to="/signin" className="inline-flex items-center justify-center mr-2 px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600" data-rounded="rounded-md" data-primary="indigo-600">
               Sign In
            </Link>
            
        </div>
    </div>
</section>
      <section className="w-full px-8 lg:mt-10 md:mt-10 py-16 bg-black xl:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="w-full space-y-5 md:w-3/5 md:pr-16">
              {/* <p
                className="font-medium text-blue-500 uppercase"
                data-primary="blue-500"
              >
                Building Businesses
              </p> */}
              <h2 className="text-2xl font-extrabold leading-none text-yellow-600 hover:text-yellow-500 sm:text-3xl md:text-5xl">
              Share your thoughts anonymously.
              </h2>
              <p className="text-xl text-gray-500 md:pr-16">
              Hey Look ! this a place where honesty and anonymity meet .We Protect your privacy with our secure bcrypt encryption . So , what you are waiting for ? SignUp now..LFG !!!
              
              </p>
            </div>

            <div className="w-full mt-16 md:mt-0 md:w-2/5">
              <div
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-gray-800 border-b-2 border-gray-800 rounded-lg shadow-2xl px-7"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-6  text-2xl font-bold text-gray-300 text-center">
                  Sign Up..!!
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=> setname(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400 rounded-lg focus:ring text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  
                  placeholder="Name"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e)=> setemail(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400  rounded-lg text-white placeholder:text-gray-300 focus:ring-gray-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Email address"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e)=> setpassword(e.target.value)}
                  className="block w-full px-4 py-3 mb-4  border-2 border-transparent bg-gray-500 border-slate-400  rounded-lg text-white placeholder:text-gray-300 focus:ring-yellow-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Password"
                />
                <div className="block">
                  <button
                    className="w-full px-3 py-4  text-black font-bold bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
                <p className="w-full mt-4 text-sm text-center text-gray-500">
                  Have an Account .??{" "}
                  <Link to="/signin" className="text-yellow-500 underline">
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
