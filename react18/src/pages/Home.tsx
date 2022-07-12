import React, { useEffect, useState } from "react";
import {cBtn, cLink} from "../components/Elements";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import http from "../apis/http";
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
            <div className={`${cBtn}`}>hello</div>
            {/*// @ts-ignore*/}
            {data?.products?.map((item) => <Link to={`/product/${item.id}`} className={`${cLink}`}>{item.title}</Link>)}
        </div>
    )
};

export default HomePage;
