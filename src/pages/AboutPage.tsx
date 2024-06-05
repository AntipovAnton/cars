import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
    return (
        <div className="wrapper">
            <h1>About Us</h1>
            <Link to="/"> Go Back To Home Page</Link>
        </div>
    );
};

export default About;