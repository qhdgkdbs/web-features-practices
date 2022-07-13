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


// 리액트 쿼리를 활용한 데이터 추가
export const useAddProduct = () => {
    const queryClient = useQueryClient()

    return useMutation((newData) => http.post(`/products/add`, newData), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (newPost) => {
            // ✅ update detail view directly
            // @ts-ignore
            queryClient.setQueryData("products_list", old => [...old, newPost.data])

            // or 데이터를 refetch 할 수 있음
            // queryClient.invalidateQueries('products_list')
        }
    })
};