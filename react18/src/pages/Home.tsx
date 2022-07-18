import React from "react";
import {cBtn} from "../components/Elements";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import {getAllProducts} from '../apis/products'


const HomePage: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery("products_list", getAllProducts);
    if (isLoading) <span>Loading...</span>;

    if (isError) {
        console.log(error)
        return <span>Error</span>;
    }

    return (
        <div>
            <div className={`${cBtn}`}>연습 페이지</div>
            <button><Link to="/react-query">리액트 쿼리</Link></button>
            <br />
            <button><Link to="/rtk">리덕스 툴킷</Link></button>
        </div>
    )
};

export default HomePage;
