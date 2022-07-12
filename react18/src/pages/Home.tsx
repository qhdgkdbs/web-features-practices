import React, { useEffect, useState } from "react";
import {cBtn, cLink} from "../components/Elements";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import http from "../apis/http";
import {getAllProducts} from '../apis/products'


const HomePage: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery("products_list", getAllProducts, {
        refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
        retry: 0, // 실패시 재호출 몇번 할지
        // onSuccess: data => console.log(data),
        // onError: e => console.log(e)
    });
    if (isLoading) <span>Loading...</span>;

    if (isError) {
        console.log(error)
        return <span>Error</span>;
    }

    return (
        <div>
            <div className={`${cBtn}`}>hello</div>
            <Link to='/product/1' className={`${cLink}`}>df</Link>
            <Link to='/product/2' className={`${cLink}`}>df</Link>
        </div>
    )
};

export default HomePage;
