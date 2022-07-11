import http from "./http";
import { Product } from "../types/products";

export const getAllProducts = () => {
    return http.get("/products")
        .then((res) => res.data as Product)
        .catch((error) => {console.log(error); alert('상품 목록을 불러오는데 에러가 발생했습니다.');})
};

export const getProduct = (id: number) => {
    return http.get(`/products/${id}`)
        .then((res) => res.data)
        .catch((error) => {console.log(error); alert('상품을 불러오는데 에러가 발생했습니다.');})
};