# Query Basics

* unique key에 연결된 비동기적 소스에 의존
* Promised based 메소드와 함께 사용될 수 있음(fetch 등)
* 서버에 있는 데이터를 수정하고 싶다면, Mutations 를 사용

## <span style='background-color: #dcffe4'>사용해보자</span>
* useQuery를 사용하려면 적어도 아래의 것들을 준비하자
  * 쿼리를 위한 unique Key
  * promise 를 리턴하는 함수(resolve data or err)
```javascript
 import { useQuery } from 'react-query'
 
 function App() {
   const info = useQuery('todos', fetchTodoList)
 }
```
* unique key
  * 내부적으로 refatching, caching, sharing queries in application 을 하는데 사용
* useQuery는 정보(템플릿이나 다른 곳에서 필요한 데이터)를 리턴함

```javascript
const result = useQuery('todos', fetchTodoList)
```
* result 는 중요한 정보를 포함(데이터 및 상태)

| 상태                                | 해석                                                                      | 데이터   |
|-----------------------------------|-------------------------------------------------------------------------|-------|
| isLoading or status === 'loading' | The query has no data and is currently fetching                         |       |
| isError or status === 'error'     | The query encountered an error                                          | error |
| isSuccess or status === 'success' | The query was successful and data is available                          | data  |
| isIdle or status === 'idle'       | The query is currently disabled (you'll learn more about this in a bit) |       |

* 위 데이터를 토대로 아래와 같으 구현가능
```javascript
 function Todos() {
   const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
 
   if (isLoading) {
     return <span>Loading...</span>
   }
 
   if (isError) {
     return <span>Error: {error.message}</span>
   }
 
   // We can assume by this point that `isSuccess === true`
   return (
     <ul>
       {data.map(todo => (
         <li key={todo.id}>{todo.title}</li>
       ))}
     </ul>
   )
 }
```

