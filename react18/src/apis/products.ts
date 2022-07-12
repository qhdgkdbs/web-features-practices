import http from "./http";
import { Product } from "../types/products";
import React from "react";
import {useMutation, useQueryClient} from "react-query";

export const getAllProducts = async () => {
    const {data : {products}} = await http.get("/products")
    return products
};

export const getProduct = async (id?: string) => {
    if(!id) throw new Error('idx 없음')
    const {data} = await http.get(`/products/${id}`)
    return data
};


export const useAddProduct = () => {
    const queryClient = useQueryClient()

    return useMutation((newData) => http.post(`/products/add`, newData), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (newPost) => {
            // ✅ update detail view directly
            // @ts-ignore
            queryClient.setQueryData("products_list", old => [...old, newPost.data])
        }
    })
};