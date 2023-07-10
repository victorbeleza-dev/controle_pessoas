import React from "react";
import UserTable from "../components/UserTable";

import { BsPersonFillAdd } from "react-icons/bs";
import '../styles/pages/HomePage.scss'
import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <UserTable />
            </div>
            <Link className="homepage-button-add" to="/register">
                <BsPersonFillAdd size={60} />
            </Link>
        </div>

    )
}

export default HomePage;