import React from 'react';
import { Link } from 'react-router-dom';
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Navbar1 = () => {
    // const [item, setitem] = useState(null)
    // useEffect(()=>{
    //     setitem(localStorage.getItem("jwt"))
    // },[])
    // const token = localStorage.getItem("jwt");
  const localid = localStorage.getItem("_id");
    

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
               
               
                <Link to={`/profile/${localid}`}  className="mr-5  font-bold leading-6 text-yellow-600 hover:text-yellow-500">My Profile</Link>

           
            
                
            </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {/* <Link to="/signin" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" data-rounded="rounded-md" data-primary="indigo-600">
                Sign up
            </Link> */}
                    <Link to="/" className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold leading-6 text-slate-900 whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600" data-rounded="rounded-md" data-primary="indigo-600">
               Dashboard
            </Link>
            
        </div>
    </div>
</section>
     </>
    );
}

Navbar1.propTypes = propTypes;
Navbar1.defaultProps = defaultProps;
// #endregion

export default Navbar1;