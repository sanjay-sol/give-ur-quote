import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar1 from './Navbar1';

const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Dashboard = () => {
    const token = localStorage.getItem("jwt");
    if(!token){
      return <Navigate to="/signin" />;
    }
    return (
        <>
        <Navbar1/>
        <div>Dashboard</div>
        </>
    );
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
// #endregion

export default Dashboard;