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
  const makepComment = async (text, postId) => {
    await fetch("http://localhost:3002/pcomment", {
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
  const deleteComment = async (id,commentId) => {
    await fetch(`http://localhost:3002/deletecomment/${id}/${commentId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id,
        commentId
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
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <Link
              to="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                Quotes
                <span className="text-indigo-600" data-primary="indigo-600">
                  .
                </span>
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              {/* <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign In</Link>
                
                <Link to="/" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Sign Up</Link> */}
              {/* <Link to="/" className="mr-6 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</Link> */}

              <Link
                to="/profile"
                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
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
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              data-rounded="rounded-md"
              data-primary="indigo-600"
            >
              POST
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
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

      <div className="m-4">
        {data.map((item) => {
          return (
            <ul key={item._id}>
              <li>Name : {item.postedBy.name}</li>
              {/* <li>Name : {item._id}</li> */}
              <li>
                url :
                {`${item.url}`}
              </li>
              <li>Branch :{item.branch}</li>
              <li>Qoute : {item.quote}</li>
              <li>Posted At : {item.updatedAt}</li>
              {/* <li className="cursor-pointer " onClick={likePost(item._id)} > 👍🏻Like  </li>
                <li  className="cursor-pointer " onClick={unlikePost(item._id)}> 👎🏻Unlike  </li> */}
              {item.likes.includes(localid) ? (
                <button onClick={() => unlikePost(item._id)}>Unlike</button>
              ) : (
                <button
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  Like
                </button>
              )}
              <br />
              {item.postedBy._id === localid && (
                <button onClick={() => deletePost(item._id)}>delete </button>
              )}

              <li>Likes : {item.likes.length}</li>
              <strong>Comments :</strong>
              <li>------</li>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span>{record.postedBy.name}</span>
                    {record.text}
                    { record.postedBy.name ===localname && <button onClick={() => deleteComment(item._id,record._id)}>:::del</button> }
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
              <strong> Anonymous comments</strong>
              {item.pcomments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span>{record.postedBy.name}</span>
                    {record.text}
                    { record.postedBy.name ===localname && <button onClick={() => deleteComment(item._id,record._id)}>:::del</button> }
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makepComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add anonymous comments" />
              </form>
              <li>--------</li>
              {/* <li>Qoute : {item.quote}</li> */}
              <li>
                ----------------------------------------------------------------
              </li>
            </ul>
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
