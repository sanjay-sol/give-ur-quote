import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
        pic:url1
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
          setprofpic(res.data.pic)
          localStorage.setItem("pic",res.data.pic)
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
    if(!token){
      return <Navigate to="/signin" />;
    }
    const localname = localStorage.getItem("name");
    // const localpic = localStorage.getItem("pic");
    return (
    <>
    <section className="w-full px-8 text-gray-700 bg-white">
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
            <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">Quotes<span className="text-indigo-600" data-primary="indigo-600">.</span></span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                {/* <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign In</Link>
                
                <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign Up</Link> */}
               <Link to="/" className="mr-6 font-medium leading-6 text-gray-600 hover:text-gray-900">Dashboard</Link>
               
                {/* <Link to="/profile" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">My Profile</Link> */}

           
            
                
            </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {/* <Link to="/signin" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
                Sign up
            </Link> */}
                     <Link to="/post" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
               POST
            </Link>
            
        </div>
    </div>
</section>
<div className="m-4">
    
    <h1>Hi <strong>👋 {localname}</strong> </h1>
    <h1>Prof oic: <strong> {profpic}</strong> </h1>
    <input type="file" name="file" onChange={handlefile} />
    <br />
    <button onClick={updateprofile} > <strong>Update</strong> </button>
    {/* <span>{imagename}</span> */}
    {/* <h1>Hi ,👋 {localpic}</h1> */}
    <li>..............</li>
      {data.map((item) => {
        return (
            <ul key={item._id} >
                {/* <li>Name : {item.postedBy.name}</li> */}
                <li>url :{`${item.url}`}</li>
                <li>Branch :{item.branch}</li>
                <li>Qoute : {item.quote}</li>
                <li>Posted At : {item.updatedAt}</li>
                {/* <li>Qoute : {item.quote}</li> */}
                <li>----------------------------------------------------------------</li>
            </ul>
        );
      })}
      </div>
    </>
    );
}

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;
// #endregion

export default Profile;