import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {value: 0},
    // 스토어는 리듀서가 필요해
    reducers:{
        // 리덕스 툴킷에서는 불변성 유지 제공
        // up: (state, action: PayloadAction<number>) => {  state.value = state.value + action.payload}
        up(state, action: PayloadAction<number>){  state.value = state.value + action.payload}
    }
})

export default counterSlice
export const {up} = counterSlice.actions