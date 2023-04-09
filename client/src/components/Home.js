import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import Navbar from './Navbar';
// import Navbar1 from './Navbar1';
import axios from "axios";
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Home = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allposts", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => setdata(res.data.posts))
      .catch((err) => console.log(err));
  }, []);
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/signin" />;
  }
  const likePost = (id) => {
    // let newpostId = {
    //     postid:id
    // };
    fetch("http://localhost:3002/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const newData = data.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((updated) => console.log(updated));
  };
  const unlikePost = async (id) => {
    // let newpostId = {
    //     postid:id
    // };
    await fetch("http://localhost:3002/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const newData = data.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((updated) => console.log(updated));
  };

  const makeComment = async (text, postId) => {
    await fetch("http://localhost:3002/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        console.log(updated);
        const newData = data.map((item) => {
          if (item._id === updated._id) {
            return updated;
          } else {
            return item;
          }
        });
        setdata(newData);
      })
      .catch((err) => console.log(err));
  };
  // const makepComment = async (text, postId) => {
  //   await fetch("http://localhost:3002/pcomment", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId,
  //       text,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((updated) => {
  //       console.log(updated);
  //       const newData = data.map((item) => {
  //         if (item._id === updated._id) {
  //           return updated;
  //         } else {
  //           return item;
  //         }
  //       });
  //       setdata(newData);
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  
  const deletePost = async (postid) => {
    await fetch(`http://localhost:3002/deletepost/${postid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(alert("Post Deleted Secceesfully !!"))
      .then(window.location.reload())
      // .then(result=>console.log(result))
      .catch((err) => console.log(err));
  };
  const deleteComment = async (id, commentId) => {
    await fetch(`http://localhost:3002/deletecomment/${id}/${commentId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id,
        commentId,
      }),
    })
      .then(alert("Comment Deleted Secceesfully !!"))
      .then(window.location.reload())
      // .then(result=>console.log(result))
      .catch((err) => console.log(err));
  };
  const localid = localStorage.getItem("_id");
  const localname = localStorage.getItem("name");
  // console.log(data.postedBy);
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

              <Link
                to={`/profile/${localid}`}
                className="mr-5  font-bold leading-6 text-yellow-600 hover:text-yellow-500"
              >
                My Profile
              </Link>
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
              POST ⏏
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-extrabold leading-6 text-slate-900 whitespace-no-wrap bg-slate-400 border border-transparent rounded-md shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
              onClick={() => localStorage.removeItem("jwt")}
            >
              LOGOUT 
            </Link>
            {/* onClick={() => localStorage.removeItem("token")} */}
          </div>
        </div>
      </section>

      <div className="container p-2 bg-black mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-6">
        {data.map((item) => {
          return (
            <div key={item._id} className="rounded-xl pl-2 overflow-scroll scrollbar-hide bg-gray-900 border-gray-700 border-2 h-[700px]">
              {/* <div className="w-full h-4/5 overflow-auto border mt-5 border-gray-600 rounded-lg shadow-black shadow-lg hover:shadow-violet-600 hover:shadow-2xl"> */}
              <div className=" bg-opacity-80 text-yellow-600 bg-gray-900 text-xl font-extrabold flex flex-row items-start justify-start  p-3">
                <img
                  className="h-9 w-9  rounded-full mr-2 cursor-pointer"
                  src={`${item.pic}`}
                  alt="img"
                />
                {item.postedBy.name} ( { item.branch ==='M' ? "♂︎" : "♀︎" } )
                {item.postedBy._id === localid && (
                  <button onClick={() => deletePost(item._id)}>
                    <img
                      className="h-6 w-6 ml-4 cursor-pointer"
                      src="/images/del.png"
                      alt="del"
                    />
                  </button>
                )}
                {/* <img className="h-6 w-6 ml-4 cursor-pointer"  src="https://cdn-icons-png.flaticon.com/512/1345/1345874.png" alt="del" /> */}
              </div>

              {/* <div className="flex flex-col max-h-screen overflow-scroll items-start justify-start pl-3 " > */}
              {item.url && <div className="flex flex-row pr-2 justify-center cursor-pointer">
                <Link to="/">
                  <img
                    className="h-fit max-w-full rounded-lg cursor-pointer"
                    src={item.url}
                    alt="cover img"
                  />
                </Link>
              </div> }
              
              

              {/* <span className="text-xs font-extrabold m-3">
      DS-A
    </span> */}

              <div className="text-sm font-bold p-3 border-gray-500 rounded-lg  text-slate-400  border-[1px]  ml-2 mr-2 mt-2 ">
                {item.quote}
              </div>
              <div>
                <div className="grid grid-cols-2  border-2 border-b-gray-900 border-t-gray-900 border-l-gray-900 border-r-gray-900 border-b-2 mt-2 mr-2   ">
                  <div className="min-h-[30px] pl-6 text-sm font-bold text-slate-400 pt-4 rounded-l-lg  bg-gray-900 ">
                    {item.createdAt.substring(0,10)} ⎪
                    {item.createdAt.substring(11,16)}

                  </div>
                  <div className="min-h-[30px] pl-32 bg-gray-900 rounded-r-lg ">
                    {item.likes.includes(localid) ? (
                      <button  onClick={() => unlikePost(item._id)}>
                        <img
                          className="w-8 h-8 opacity-90"
                          src="/images/nl2.png"
                          alt="likes"
                        />
                      </button>
                    ) : (
                      <button className="pr-2"
                        onClick={() => {
                          likePost(item._id);
                        }}
                      >
                         <img
                          className="w-10 h-8 opacity-90"
                          src="/images/nul2.png"
                          alt="likes"
                        />
                      </button>
                    )}
                    {/* <img  className="w-8 h-8 opacity-90" src="/images/likeimg.png" alt="likes" /> */}
                    <div className="pl-[12px] font-semibold text-slate-400">
                      {item.likes.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-lg pb-2 font-extrabold text-slate-300 underline">
                Comments ({item.comments.length}) :{" "}
              </div>

              <span>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }} >
                  <div className="relative mr-[14px]">
                    <input
                      type="search"
                      id="search"
                      className=" w-[253px]  p-4 pl-3 mb-2  text-sm font-semibold text-gray-200 border border-gray-300 rounded-lg bg-gray-200 bg-transparent placeholder-slate-400   "
                      placeholder="Write a Comment..."
                    />
                    <button
                      type="submit"
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                      className="text-gray-200 absolute right-2.5 bottom-2.5 bg-yellow-600 hover:bg-yellow-700   font-extrabold rounded-lg text-3xl px-4 py-1  "
                    >
                      <img className="w-9 h-10" src="/images/sub.png" alt="Add" />
                    </button>
                  </div>
                </form>
              </span>
              {/* {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span>{record.postedBy.name}</span>
                    {record.text}
                    { record.postedBy.name ===localname && <button onClick={() => deleteComment(item._id,record._id)}>:::del</button> }
                  </h6>
                );
              })} */}
              {item.comments.map((record) => {
                return (
                  <>
                    <div key={record._id} className="text-sm pl-2 font-extrabold text-slate-300  underline ">
                      ➤ {record.postedBy.name}
                      
                      {record.postedBy.name === localname && (
                      <button className="mt-2 ml-2"
                        onClick={() => deleteComment(item._id, record._id)}
                      >
                         <img
                            className="h-5   w-5 "
                            src="/images/del.png"
                            alt="del"
                          />
                      </button>
                    )}
                      
                    </div>
                    <div  className="text-sm text-slate-400  font-medium ml-7 ">
                      {" "}
                      {record.text}
                    </div>
                    
                  </>
                );
              })}

              {/* </div> */}
              {/* <span className="text-xl font-extrabold flex flex-row items-start justify-start p-3">hi</span> */}
            </div>
          );
        })}
      </div>
      
    </>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
// #endregion

export default Home;
