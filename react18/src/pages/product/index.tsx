import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getProduct} from "../../apis/products";

const ProductPage: React.FC = () => {
    const { idx } = useParams<{ idx: string }>();

    const { isLoading, isError, data, error } = useQuery(`product${idx}`, () => getProduct(idx), {
        // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부
        refetchOnWindowFocus: false
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
            ProductPage
        </div>
    )
};

export default ProductPage;
