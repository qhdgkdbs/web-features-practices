# Query Invalidation

* 사용자가 접근하기 전에 데이터를 미리 받아두는 것
* prefetchQuery를 통해서 cache에 저장 해둘 수 있음

```javascript
 const prefetchTodos = async () => {
   // The results of this query will be cached like a normal query
   await queryClient.prefetchQuery('todos', fetchTodos)
 }
```
* 유의사항
  * 이미 cached 되어 있고 not invalidated라면, refetched 되지 않음
  * staleTime과 함께 전달되면 데이터가 refetched 됨. ```prefetchQuery('todos', fn, { staleTime: 5000 })```
  * prefetched query를 위한 useQuery의 인스턴스가 없을 경우, cacheTime이 지나면 파기됨.

# Manually Priming a Query
* query를 위한 데이터를 이미 가지고 있다면, prefetch 할 필요가 없음.
* [setQueryData](https://react-query-v2.tanstack.com/reference/QueryClient#queryclientsetquerydata)
를 이용하셈
```javascript
 queryClient.setQueryData('todos', todos)
```