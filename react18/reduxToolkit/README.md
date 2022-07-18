# 리덕스 쿼리
[리덕스 쿼리](https://redux-toolkit.js.org/introduction/getting-started)
를 참고하여 작성하였습니다.

* concepts 폴더에 마크다운으로 정리하였습니다.

## 목적
* 리덕스의 3가지 주요 개념에 돕고자 만들어짐
  * 리덕스 스토어를 설정하는 것은 복잡
  * 리덕스가 useful한 것을 하기 위해 많은 패키지를 설치해야함
  * 리덕스는 초기 코드를 너무 많이 요구

* CRA의 정신으로 몇가지 설정 과정을 추상화하고, 작업을 단순화 할 수 있는 다양한 유틸리티를 포함
* RTK 쿼리를 통해서는 캐싱기능을 활용할 수도 있음
* 리덕스 툴킷은 리덕스 코드를 개선하는데 도움이 됨

## 설치
```npm install @reduxjs/toolkit```

## API
* configureStore(): 
  * createStore를 포함하는 것
  * slice reducers를 자동으로 포함시킬 수 있음 (리덕스 미들웨어나, 각종 데브 툴 포함)
* createReducer():
  * switch 문을 작성하는 대신, 리듀서의 액션 타입을 찾게 해줌
  * 불변성 라이브러리를 함께 제공해줌
* createAction():
  * 액션 타입을 주어진 문자열을 토대로 action create 함수를 생성
* createSlice():
  * 리듀서 함수, slice 이름, 초기값을 받고
  * 액션 타입과 creators와 상응 하는 slice reducer를 자동으로 생성
* createAsyncThunk:
  * promise를 리턴하는 함수를 허용
  * promise에 따라서, pending/fulfilled/rejected 를 dispatch하는 thunk
* createEntityAdapter:
  * 스토어에 있는 nomarlized된 데이터를 다루기 위한 재사용가능한 리듀서와 셀렉터를 만듬


## RTK 쿼리
* 데이터 fetching 및 캐시의 사용을 해결
* 리덕스 툴킷 위에서 built됨
```import { createApi } from '@reduxjs/toolkit/query'```

* createApi():
  * RTK 쿼리의 핵심
  * series of endpoints 에서 어떤식으로 데이터를 가져올지 설정
  * 대부분의 경우에 one API slice per base URL
* fetchBaseQuery():
  * requests를 단순화 하는 목적으로 fetch를 감사는 것
  * 대부분의 유저에게 createApi에 사용된 baseQuery를 사용하는것을 권장
* <ApiProvider />:
  * 리덕스 스토어가 없는 경우에 provider로 사용될 수 있음
* setupListners():
  * refetchOnMount와 refetchOnReconnect의 사용을 가능케하는 유틸리티

## 사용예시
* ```npm install @reduxjs/toolkit react-redux```
* 작은 store를 slice라고 할 수 있음
```javascript
// 1. 스토어를 만들자
// 1-1. 리듀서를 만들자
const reducer = (state, action) => {
    // 3 버튼에 맞는 리듀서를 만들자
    if(action.type === 'up') ({...state, value: state.value + action.step})
    return state;
}

const initialState = {value: 0}
const store = createStore(reducer, initialState)

// 2. 컴포넌트를 감싸자
const App = () => {
    const count = useSelector(state => state.value)
    const dispatch = useDispatch()
    
    return (
      <Provider store={store}>
        <div>
          {count}<button onClick={() => dispatch({type: 'up', step: 2})}>UP</button>
        </div>
      </Provider>)
}
```

* 여러 슬라이스를 하나의 스토어로
```javascript
// // 1. 스토어를 만들자
// // 1-1. 리듀서를 만들자
// const reducer = (state, action) => {
//     // 3 버튼에 맞는 리듀서를 만들자
//     // 불변성 유지를 위한 spread operator
//     if(action.type === 'up') ({...state, value: state.value + action.step})
//     return state;
// }
//
// const initialState = {value: 0}
// const store = createStore(reducer, initialState)
 

// a. 작은 스토어라고 할 수 있는 slice를 만들자 -> 하나의 스토어로 합쳐주면 됨.
// counterSlice, timeSlice.. 등을 여러개 만들면 됨
const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {value: 0},
  // 스토어는 리듀서가 필요해
  reducers:{
      // 리덕스 툴킷에서는 불변성 유지 제공
      up: (state, action) => {state.value = state.value + action.payload} 
  }
})

// b. 여러 slice를 하나의 store로 합쳐
const store = configureStore({
  reducer: {
      counter: counterSlice.reducer
  }
})

// 2. 컴포넌트를 감싸자
const App = () => {
    const count = useSelector(state => state.count.value)
    const dispatch = useDispatch()
    
    return (
      <Provider store={store}>
        <div>
          // {count}<button onClick={() => dispatch({type: 'counterSlice/up', step: 2})}>UP</button>
          {count}<button onClick={() => dispatch( counterSlice.actions.up(2) )}>UP</button>
        </div>
      </Provider>)
}
``` 


## 파일 분리
1. store.js
```javascript
const store = configureStore({
  reducer: {
      counter: counterSlice.reducer
  }
})

export default store
```
2. counterSlice.js
```javascript
const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {value: 0},
  // 스토어는 리듀서가 필요해
  reducers:{
      // 리덕스 툴킷에서는 불변성 유지 제공
      up: (state, action) => {state.value = state.value + action.payload} 
  }
})

export default counterSlice
export const {up} = counterSlice.actions
```
3. index.jsx