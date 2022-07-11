import React, { useEffect, useState } from "react";
import {cBtn, cLink} from "../components/Elements";
import {Link} from "react-router-dom";


const HomePage: React.FC = () => {
    return (
        <div>
            <div className={`${cBtn}`}>hello</div>
            <Link to='login' className={`${cLink}`}>df</Link>
        </div>
    )
};

export default HomePage;
