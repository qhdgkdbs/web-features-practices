import http from "./http";
import { Product } from "../types/products";

export const getAllProducts = async () => {
    const {data} = await http.get("/products")
    return data
};

export const getProduct = async (id?: string) => {
    if(!id) throw new Error('idx 없음')
    const {data} = await http.get(`/products/${id}`)
    return data
};