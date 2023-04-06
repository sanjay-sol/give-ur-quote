import React, { useState } from "react";
import {  Navigate } from "react-router-dom";
import axios from "axios";
import data from "./cloud.json";
import Navbar1 from "./Navbar1";

// import { Link } from 'react-router-dom';

const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Post = () => {
  const randomnumber = (Math.random() * 10).toFixed(0);
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";
  const [versionid1, setversionid1] = useState(data[randomnumber].versionid1);
  const [publicid1, setpublicid1] = useState(data[randomnumber].publicid1);
  const [format1, setformat1] = useState(data[randomnumber].format);
  const [quote, setquote] = useState("");
  const [branch, setbranch] = useState("");
  const [imagename, setimagename] = useState("DROP YOUR IMAGE");
  const [auth, setauth] = useState(false);

  const getValue = () => {
    var selectedvalue = document.getElementById("mySelect").value;
    setbranch(selectedvalue);
  };
  const handlefile = (e) => {
    const filename = e.target.files[0].name;
    setimagename(filename);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    // setloading(true);
      axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
      .then((res)=>console.log(res.data))
      .then((res) => setversionid1(res.data.version))
      .then((res) => setpublicid1(res.data.public_id))
      .then((res) => setformat1(res.data.format))
    //   .then((res) => console.log(res.data))

      // .then(() => {
      //   setloading(false);
      // })
      
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleSubmit =async()=>{
    let post = {
        versionid:versionid1,
        publicid:publicid1,
        format:format1,
        branch:branch,
        quote:quote,
    } ;
    const token = "Bearer "+localStorage.getItem("jwt")
    console.log(token);
    await axios.post('http://localhost:3002/createpost', post,{
        headers: {
          "Authorization": token,
        },
      })
    .then(res => {
        console.log(res.data);
        alert("Posted Successfully")
        setauth(true)
    })
    .catch(err=> alert(err.response.data.message))
  }
  
  if (auth) {
    return <Navigate to="/" />;
  }
  const token = localStorage.getItem("jwt");
  if(!token){
    return <Navigate to="/signin" />;
  }
  return (
    <>
    <Navbar1/>
      <section className="w-full px-8 lg:mt-10 md:mt-10 py-16 xl:px-8">
        <div className="max-w-7xl md:ml-48 ">
          <div className="flex flex-col  md:flex-row">
            <div className="w-full mt-16 md:mt-0 md:ml-5 lg:ml-60 md:w-2/5">
              <div
                className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
                data-rounded="rounded-lg"
                data-rounded-max="rounded-full"
              >
                <h3 className="mb-6  text-2xl font-medium text-center">
                  Post Your Quote
                </h3>
                <div className="relative">
                  <label className="font-medium text-gray-500 ">
                    Choose Cover Image..!
                  </label>
                  <div className="extraOutline p-4  bg-white w-max bg-whtie mt-4 rounded-lg ">
                    <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                      <svg
                        className="text-indigo-500 w-24 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <div className="input_field flex flex-col w-max mx-auto text-center">
                        <label>
                          <input
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                            onChange={handlefile}
                          />
                          <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                            Upload
                          </div>
                        </label>

                        <div className="title text-indigo-500 uppercase">
                          {imagename}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-medium text-gray-900">
                  Section <span className="text-xl text-red-600 "> * </span>
                </p>
                <select
                  id="mySelect"
                  className="border-2 w-44 h-10 bg-white rounded"
                  onChange={getValue}
                >
                  <option value="CSE">Select</option>

                  <option value="CSE">CSE</option>
                  <option value="DS">DS</option>
                  <option value="AI-ML">AI-ML</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="ECE">ECE</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="EIE">EIE</option>
                  <option value="CS-IT">CSIT</option>
                  <option value="CS">CS</option>
                  <option value="CS">IT</option>
                  <option value="OTHERS">Others</option>
                </select>
                <textarea
                  type="text"
                  value={quote}
                  className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                  data-rounded="rounded-lg"
                  data-primary="blue-500"
                  placeholder="Quote.."
                  onChange={(e)=> setquote(e.target.value)}
                />

                {/* <input type="email" className="block w-full px-4 mt-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" data-rounded="rounded-lg" data-primary="blue-500" placeholder="Email address"/>
                    <input type="password"  className="block w-full px-4 py-3 mb-4  border-2 border-transparent border-slate-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none" data-rounded="rounded-lg" data-primary="blue-500" placeholder="Password"/> */}
                <div className="block">
                  <button
                    className="w-full px-3 py-4 font-medium text-white bg-indigo-600 rounded-lg"
                    data-primary="blue-600"
                    data-rounded="rounded-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;
// #endregion

export default Post;
