import React from "react";
import {cBtn, cLink} from "../../components/Elements";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";
import {getAllProducts} from '../../apis/products'


const ReactQueryPage: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery("products_list", getAllProducts);
    if (isLoading) <span>Loading...</span>;

    if (isError) {
        console.log(error)
        return <span>Error</span>;
    }

    return (
        <div>
            <div className={`${cBtn}`}>hello</div>
            <Link to={'/product/upload'}>업로드!</Link>
            {/*// @ts-ignore*/}
            {data?.map((item) => <Link key={item.id} to={`/product/${item.id}`} className={`${cLink}`}>{item.title}</Link>)}
        </div>
    )
};

export default ReactQueryPage;
