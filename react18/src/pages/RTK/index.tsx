import React from "react";
import counterSlice from "../../store/slices/counterSlice";
import { useAppDispatch, useAppSelector } from '../../store/config'


const RtkPage: React.FC = () => {
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()

    return (<div>
        {/*{count}<button onClick={() => dispatch({type: 'counterSlice/up', step: 2})}>UP</button>*/}
        카운트: {count}
        <div onClick={() => dispatch( counterSlice.actions.up(12) ) }> UP </div>
    </div>)
};

export default RtkPage;
