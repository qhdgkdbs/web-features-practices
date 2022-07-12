import http from "./http";
import { Product } from "../types/products";

export const getAllProducts = () => {
    return http.get("/products")
};

export const getProduct = (id?: string) => {
    if(!id) throw new Error('idx 없음')
    return http.get(`/products/${id}`)
};