import React from "react";

import "../styles/components/TabHeader.scss"
import { Link } from "react-router-dom";

import { IoPersonCircleSharp } from "react-icons/io5";

const TabHeader = () => {

    return (
        <div className="tabheader-container">
            <Link className="tabheader-content" to="/">
                <IoPersonCircleSharp size={40} />
                <span className="tabheader-title">Controle de Usuários</span>
            </Link>

        </div>
    )
}

export default TabHeader;