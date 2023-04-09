import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
// import Navbar1 from './Navbar1';
// import Navbar1 from './Navbar1';

const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Profile = () => {
  const params = useParams();
  const [data, setdata] = useState([]);
  const [profpic, setprofpic] = useState("");
  const preset_key = "x5orflhb";
  const cloud_name = "dgo3xjjvb";
  const [url1, seturl1] = useState("");
  // const [imagename, setimagename] = useState("DROP YOUR IMAGE");

  const handlefile = (e) => {
    const file = e.target.files[0];
    // setimagename(e.target.files[0].name)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => seturl1(res.data.secure_url))
      // .then((res) => setpublicid1(res.data.public_id))

      //   .then((res) => console.log(res.data))

      // .then(() => {
      //   setloading(false);
      // })

      .catch((err) => {
        console.log(err);
      });
  };

  const updateprofile = async () => {
    await fetch(`http://localhost:3002/updateprofile/${params.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url1,
      }),
    })
      .then(alert("Updated Secceesfully !!"))
      .then(window.location.reload())
      // .then(result=>console.log(result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3002/myprofile/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setprofpic(res.data.pic);
        localStorage.setItem("pic", res.data.pic);
      })
      // .then((res)=>localStorage.setItem("pic",res.data.pic))
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    axios
      .get("http://localhost:3002/myposts", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => setdata(res.data.mypost))
      .catch((err) => console.log(err));
  }, []);
  // console.log(data);
  // console.log("new url is ",url1);

  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  const localname = localStorage.getItem("name");
  // const localpic = localStorage.getItem("pic");
  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-gray-900">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
                              <span className="mx-auto ml-2 text-xl font-black leading-none text-gray-400  select-none">CVR<span className="text-indigo-600" data-primary="indigo-600"> <img className="w-16 h-9 rounded-lg mr-2" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBf8pOSlD20PmO3plmeIK9qspAmYe7YheFTBhVhoMi2yLPmDJz_Gk8owfQLePRop38Oei7gRhoRD-QYQXSnDp0ci-W7XM4yEVDrz5GCYfzNOf3v4kkfruUdUFXUqJL2AKPnsD5y1yHcjnuN41QiYYzOn4oYgIy6MUC34VktANtW-1_KMaMA6Lkc1fO/s2048/IMG_20230225_120158.png" alt="hood" /></span></span>

            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              {/* <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign In</Link>
                
                <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign Up</Link> */}
              {/* <Link to="/" className="mr-6 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link> */}
            </nav>
          </div>

          <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {/* <Link to="/signin" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
                Sign up
            </Link> */}
            <Link
              to="/post"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              POST ⏏︎
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-extrabold leading-6 text-slate-900 whitespace-no-wrap bg-slate-400 border border-transparent rounded-md shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              DASHBOARD
            </Link>
            {/* onClick={() => localStorage.removeItem("token")} */}
          </div>
        </div>
      </section>

      <div className="flex flex-col mt-5 items-center sm:px-5 md:flex-row border-4 tails-selected-element ">
        <div className="w-full md:w-1/2 m-3">
          <a href="#_" className="block">
            <img
              className="object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96"
              src={profpic}
              alt="profile"
            />
          </a>
        </div>
        <div className="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
          <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">
            <div className="bg-yellow-500  items-center pl-2 pr-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-black inline-block">
              <span>Your Profile</span>
            </div>
            <h1 className="text-4xl text-gray-300 font-bold leading-none lg:text-5xl xl:text-6xl">
              {" "}
              Hi , 👋 {localname}...!! Welcome Back
            </h1>
            <p className="pt-2 text-sm text-gray-300 font-medium">
              {" "}
              Username : {localname}{" "}
            </p>
            {/* <p className=" text-sm font-medium"> Username : bnreddy </p> */}
            <div className="mb-3 w-96">
              <label
                htmlFor="formFileMultiple"
                className="mb-2 inline-block font-bold text-neutral-300 "
              >
                Update Profile Picture
              </label>

              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-600 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                type="file"
                name="file"
                id="formFileMultiple"
                onChange={handlefile}
              />
              <button
                className="w-36 px-3 py-3 mt-2 text-black font-bold bg-yellow-600 hover:bg-yellow-500 rounded-lg"
                data-primary="blue-600"
                data-rounded="rounded-lg"
                onClick={updateprofile}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <section className="w-full px-8 text-4xl text-gray-300 bg-black">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          Your Posts
        </div>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-3 ">
        {data.map((item) => {
          return (
            <div key={item._id} className="max-w-2xl mx-auto mb-2">
              <div className=" flex flex-col items-center justify-center bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <p>
                  <img className="rounded-t-lg" src={item.url} alt="img" />
                </p>
                <div className="p-5">
                  <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                    {item.quote}
                  </p>
                  <p
                    href="/"
                    className="text-gray-900 bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
                  >
                    Posted At: {item.createdAt.substring(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;
// #endregion

export default Profile;
