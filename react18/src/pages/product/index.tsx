import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getProduct} from "../../apis/products";

const ProductPage: React.FC = () => {
    const { idx } = useParams<{ idx: string }>();

    const { isLoading, isError, data, error } = useQuery(`product${idx}`, () => getProduct(idx), {
        refetchOnWindowFocus: true,
        staleTime: 0,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (error) {
        console.error("err", error)
        return <span>Error</span>;
    }

    return (
        <div>
            <h1>title: {data.title}</h1>
            <div>description: {data.description}</div>
            <div>price: {data.price}</div>
            <div>rating: {data.rating}</div>
            <div>brand: {data.brand}</div>
        </div>
    )
};

export default ProductPage;
