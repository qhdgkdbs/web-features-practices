# Caching Examples

* 4가지 라이프사이클에서의 캐싱
  * 캐시 데이터없는 query instance
  * 백그라운드 refetching
  * Inactivate Queries
  * Garbage Collection

<br/><br/>

* cacheTime: 5분, staleTime: 0 이라고 가정
* useQuery('todos', fetchTodos) 인스턴스가 새롭게 마운트 된 경우
  * 이 쿼리와 변수로 이루어진 queries가 없기 때문에, hard loading 및 네트워크를 통해서 요청을 보냄
  * 'todos' 와 fetchTodos 를 사용, unique 구분자로 캐시를 구분
  * 해당 훅은 staleTime(기본적으로 0, 즉시)이 지나면 stale로 mark 함.
  
* useQuery('todos', fetchTodos)의 두번째 인스턴스가 마운트 된 경우(어디서든지)
  * 첫번째 인스턴스의 쿼리에 남아있기 때문에, 캐시에서 값을 받음
* 화면에 새로운 인스턴스의 등장으로 백그라운드 refetch 작동 for both queries(한쪽의 요청에 의해)
  * 두 인스턴스 모두 업데이트 됨(fetch 성공시)
* 두개의 useQuery('todos', fetchTodos) 인스턴스가 unmounted 되거나 더 이상 사용되지 않는 경우
  * cacheTime(기본 5분)이 지나면 garbage collect 의 대상임
* 타임아웃이 발생하기 전, 새로운 useQuery('todos', fetchTodos)가 마운트된 경우
  * fetchTodos 함수가 백그라운드에 fresh 값을 가져오는 동안에 즉시 사용가능한 캐시된 데이터를 반환함.
* 마지막 useQuery('todos', fetchTodos) 인스턴스가 언마운트 되는 경우 
* 및 useQuery('todos', fetchTodos) 인스턴스가 5분안에 나타나지 않는 경우
  * query와 data는 지워지고,  garbage collected 됨.

