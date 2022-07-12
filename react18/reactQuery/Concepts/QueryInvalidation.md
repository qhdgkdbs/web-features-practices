# Query Invalidation

* queries 가 다시 fetch가 되기 전에 queries가 stales되는 것을 기다리는 것은 항상 작동 X
  * 특히, 누군가에 의해 완료되어 query 데이터가 오래되었음을 아는 경우.
* 이를 위해 QueryClient는 invalidateQueries를 가짐
  * invalidateQueries는 queries를 오래된 것으로 mark, 그리고 잠재적으로 refetch 함
```javascript
 // Invalidate every query in the cache
 queryClient.invalidateQueries()
 // Invalidate every query with a key that starts with `todos`
 queryClient.invalidateQueries('todos')
```
> normalized caches 를 사용하는 다른 라이브러리가 local queries를 업데이트하는 경우,
> 리액트 쿼리는 maintaining하는데 필요한 툴을 제공함.
> prescribes targeted invalidation, background-refetching and ultimately atomic updates.

* query가 invalidateQueries로 인해 invalidated 되었다면, 두가지가 발생
  * stale로 marked. 해당 stale 상태는 useQuery 혹은 관련된 hooks의 staleTime을 재정의함
  * 만약 query가 useQuery나 관련된 hooks 들에 의해 렌더링 되고 있다면, 백그라운드에서 refetch됨

# Query Matching with invalidateQueries
* invalidateQueries 및 removeQueries 와 같은 API를 사용할때, 다수의 queries를 매치시킬 수 있다
  * 사용할 수 있는 필터의 타입은 [Query Filters](https://react-query-v2.tanstack.com/guides/filters#query-filters)
* todos 접두사를 활용하여, todos로 시작하는 query key를 가지는 queries를 invalidate 시키는 예제
```javascript
import { useQuery, useQueryClient } from 'react-query'
 
 // Get QueryClient from the context
 const queryClient = useQueryClient()
 
 queryClient.invalidateQueries('todos')
 
 // Both queries below will be invalidated
 const todoListQuery = useQuery('todos', fetchTodoList)
 const todoListQuery = useQuery(['todos', { page: 1 }], fetchTodoList)
```

* specific variables를 전달하여 invalidate 시킬 수 있음
```javascript
queryClient.invalidateQueries(['todos', { type: 'done' }])

// The query below will be invalidated
const todoListQuery = useQuery(['todos', { type: 'done' }], fetchTodoList)

// However, the following query below will NOT be invalidated
const todoListQuery = useQuery('todos', fetchTodoList)
```

* more variables or subkeys 를 가지지 않는 todos queries 만을 invalidate 시킬 수 있음 (with {exact : true})
```javascript
 queryClient.invalidateQueries('todos', { exact: true })
 
 // The query below will be invalidated
 const todoListQuery = useQuery(['todos'], fetchTodoList)
 
 // However, the following query below will NOT be invalidated
 const todoListQuery = useQuery(['todos', { type: 'done' }], fetchTodoList)
```

* 더 세부적으로 조건을 달 수 있음. (with predicate function)
  * predicate function는 각 query instance에서 true or false를 반환함.
```javascript
queryClient.invalidateQueries({
   predicate: query =>
     query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
 })
 
 // The query below will be invalidated
 const todoListQuery = useQuery(['todos', { version: 20 }], fetchTodoList)
 
 // The query below will be invalidated
 const todoListQuery = useQuery(['todos', { version: 10 }], fetchTodoList)
 
 // However, the following query below will NOT be invalidated
 const todoListQuery = useQuery(['todos', { version: 5 }], fetchTodoList)
```








