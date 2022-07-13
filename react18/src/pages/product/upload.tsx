import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getProduct, useAddProduct} from "../../apis/products";

const UploadPage: React.FC = () => {
    // 'BOSE SOUND LINK mini', 'speaker', 10.99,9.8, 'bose'
    const uploadProduct = useAddProduct()

    return (
        <div>
            <h1>title: <input /> </h1>
            {/*// @ts-ignore*/}
            <button onClick={() => uploadProduct.mutate({title: 'BOSE SOUND LINK mini', description: 'speaker', price: 10.99, rating: 9.8, brand: 'bose'})}>업로드</button>

        </div>
    )
};

export default UploadPage;
