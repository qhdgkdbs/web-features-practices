# 리액트 쿼리 팁

## refetchOnWindowFocus
* refetchOnWindowFocus 옵션은 staleTime이 지나지 않았으면, 그 값이 True라 할지라도 작동하지 않음.

## invalidateQueries 와 refetch
  * invalidateQueries 
    * query를 stale 상태로 변경하고 마운트 되어야 refetch
  * refetch
    * 쿼리에 대한 observer가 없더라도 항상 refetch
    
## Pollnig
* 충돌 회피 또는 동기화 처리 등을 목적으로 다른 장치(또는 프로그램)의 상태를 주기적으로 검사하여 일정한 조건을 만족할 때 송수신 등의 자료처리를 하는 방식
```javascript
  const { status, data, error, isFetching } = useQuery(
    "todos",
    async () => {
      const res = await axios.get("/api/data");
      return res.data;
    },
    { refetchInterval: intervalMs }
  );
```

## useQueries
```javascript
function App () {
   // 이렇게 주루륵 있을 때 걍 다 병렬로 처리된다 => 어떻게 구현한거지... redux batch update 같넹
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```
* 단, 동적으로 요청의 수가 변경되는 경우, 쿼리를 수행하는 로직이 hook 룰(어떤 룰...)에 위배될 수 있음 => ```useQueries 를 사용하자```
```javascript
function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
```

* useQuery를 사용하면서 suspense 모드로 동작시킬 때 useQueries 를 사용해야 좋음
  * 만약 비동기 요청이 하나라도 실패하면 계속해서, suspense: true인 상태가 유지됨...


## Mutation
```javascript
useMutation(addTodo, {
   onMutate: variables => {
     // 뮤테이션 시작
     // onMutate가 리턴하는 객체는 이하 생명주기에서 context 파라미터로 참조가 가능하다.
     return { id: 1 }
   },
   onError: (error, variables, context) => {
     // 에러가 났음
     console.log(`rolling back optimistic update with id ${context.id}`)
   },
   onSuccess: (data, variables, context) => {
     // 성공
   },
   onSettled: (data, error, variables, context) => {
     // 성공이든 에러든 어쨌든 끝났을 때
   },
 })
```

## Mutate VS MutateAsync
* Mutate
  * 리턴 값 없음
  * 콜백을 통해 데이터나 오류에 액세스 할 수 있음
  * 오류 처리도 가능
* MutateAsync
  * Promise 리턴
  * 오류를 직접 처리해야함


