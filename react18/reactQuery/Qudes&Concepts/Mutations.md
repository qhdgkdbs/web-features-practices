# Mutations
[mutations 공식문서 링크](https://react-query-v2.tanstack.com/guides/mutations)

* Queries 와 달리 create/update/delete 하는데 사용함 (서버 사이드)

* 사용 예시
```javascript
function App() {
   const mutation = useMutation(newTodo => {
     return axios.post('/todos', newTodo)
   })
 
   return (
     <div>
       {mutation.isLoading ? (
         'Adding todo...'
       ) : (
         <>
           {mutation.isError ? (
             <div>An error occurred: {mutation.error.message}</div>
           ) : null}
 
           {mutation.isSuccess ? <div>Todo added!</div> : null}
 
           <button
             onClick={() => {
               mutation.mutate({ id: new Date(), title: 'Do Laundry' })
             }}
           >
             Create Todo
           </button>
         </>
       )}
     </div>
   )
 }
```

* mutation의 상태

| 상태                                | 해석                                                         | 데이터   |
|-----------------------------------|------------------------------------------------------------|-------|
| isIdle or status === 'idle'       | The mutation is currently idle or in a fresh/reset state   |       |
| isLoading or status === 'loading' | The mutation is currently running                          |       |
| isError or status === 'error'     | The mutation encountered an error                          | error |
| isSuccess or status === 'success' | The mutation was successful and mutation data is available | data  |

* onSuccess 옵션과 쿼리 클리이언트의 [invalidateQueries method](https://react-query-v2.tanstack.com/reference/QueryClient#queryclientinvalidatequeries) 와
  [setQueryData method](https://react-query-v2.tanstack.com/reference/QueryClient#queryclientsetquerydata)
  를 함께 사용하면 강력해짐
```javascript
 // This will not work in React 16 and earlier
 const CreateTodo = () => {
   const mutation = useMutation(event => {
     event.preventDefault()
     return fetch('/api', new FormData(event.target))
   })
 
   return <form onSubmit={mutation.mutate}>...</form>
 }
```

# Resetting Mutation State
* mutation request의 error와 data를 clear 하기 위한 것
* reset 함수를 사용할 수 있음
```javascript
 const CreateTodo = () => {
   const [title, setTitle] = useState('')
   const mutation = useMutation(createTodo)
 
   const onCreateTodo = e => {
     e.preventDefault()
     mutation.mutate({ title })
   }
 
   return (
     <form onSubmit={onCreateTodo}>
       {mutation.error && (
         <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
       )}
       <input
         type="text"
         value={title}
         onChange={e => setTitle(e.target.value)}
       />
       <br />
       <button type="submit">Create Todo</button>
     </form>
   )
 }
```

# Mutation Side Effects
* useMutation은 빠르고 어떤 라이프 사이클 동안에도 쉽게 사이드 에펙트를 쉽게 허용할 수 있는 옵션을 가지고 있음
* [Invalidation from Mutations](https://react-query-v2.tanstack.com/guides/invalidations-from-mutations) 와
    [Optimistic Updates](https://react-query-v2.tanstack.com/guides/optimistic-updates) 를 통해서 접근 가능
    
```javascript
useMutation(addTodo, {
   onMutate: variables => {
     // A mutation is about to happen!
 
     // Optionally return a context containing data to use when for example rolling back
     return { id: 1 }
   },
   onError: (error, variables, context) => {
     // An error happened!
     console.log(`rolling back optimistic update with id ${context.id}`)
   },
   onSuccess: (data, variables, context) => {
     // Boom baby!
   },
   onSettled: (data, error, variables, context) => {
     // Error or success... doesn't matter!
   },
 })
```
* 만약 promise가 리턴이 된다면, 다음 콜백까지 기다릴 것임
```javascript
 useMutation(addTodo, {
   onSuccess: async () => {
     console.log("I'm first!")
   },
   onSettled: async () => {
     console.log("I'm second!")
   },
 })
```

* 추가적인 callback을 실행시키고 싶다면, mutate를 호출 시 useMutation에 정의하셈
* This can be used to trigger component-specific side effects 
* mutate 함수에 callback 옵션을 제공하셈 (onSuccess, onError and onSettled)
```javascript
 useMutation(addTodo, {
   onSuccess: (data, variables, context) => {
     // I will fire first
   },
   onError: (error, variables, context) => {
     // I will fire first
   },
   onSettled: (data, error, variables, context) => {
     // I will fire first
   },
 })
 
 mutate(todo, {
   onSuccess: (data, variables, context) => {
     // I will fire second!
   },
   onError: (error, variables, context) => {
     // I will fire second!
   },
   onSettled: (data, error, variables, context) => {
     // I will fire second!
   },
 })
```

# Consecutive mutations (연속된 mutations)
* 기존과 onSuccess, onError and onSettled 다루는 방식이 살짝 다름
* When passed to the mutate function, they will be fired up only once and only if the component is still mounted
  * 이것은, mutate 함수가 호출 될때마다 mutation Observer 가 제거되고, 재생성되기 때문에
* 반면에, useMutation 핸들러는 mutate 호출시마다 실행됨.
```javascript
 useMutation(addTodo, {
   onSuccess: (data, error, variables, context) => {
     // Will be called 3 times
   },
 })
 
 ['Todo 1', 'Todo 2', 'Todo 3'].forEach((todo) => {
   mutate(todo, {
     onSuccess: (data, error, variables, context) => {
       // Will execute only once, for the last mutation (Todo 3),
       // regardless which mutation resolves first 
     },
   })
 })
```

# Promises 
* success or error 를 던질 promise를 반환받고자 한다면  mutateAsync 를 사용
```javascript
 const mutation = useMutation(addTodo)
 
 try {
   const todo = await mutation.mutateAsync(todo)
   console.log(todo)
 } catch (error) {
   console.error(error)
 } finally {
   console.log('done')
 }
```

# Retry
* 기본적으로 react query는 에러에 대해서 재시도 하지 않지만, retry 옵션을 통해 수정가능
* 만약에 장치가 꺼져서 실패한거라면, 장치가 연결되면 다시 시도함.
```javascript
const mutation = useMutation(addTodo, {
   retry: 3,
 })
```

# Persist mutations
* mutation은 storage에서 지속될 수 있음 for 나중에 재개하기 위해.
* hydration functions 으로 구현 가능
```javascript
const queryClient = new QueryClient()
 
 // Define the "addTodo" mutation
 queryClient.setMutationDefaults('addTodo', {
   mutationFn: addTodo,
   onMutate: async (variables) => {
     // Cancel current queries for the todos list
     await queryClient.cancelQueries('todos')
 
     // Create optimistic todo
     const optimisticTodo = { id: uuid(), title: variables.title }
 
     // Add optimistic todo to todos list
     queryClient.setQueryData('todos', old => [...old, optimisticTodo])
 
     // Return context with the optimistic todo
     return { optimisticTodo }
   },
   onSuccess: (result, variables, context) => {
     // Replace optimistic todo in the todos list with the result
     queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
   },
   onError: (error, variables, context) => {
     // Remove optimistic todo from the todos list
     queryClient.setQueryData('todos', old => old.filter(todo => todo.id !== context.optimisticTodo.id))
   },
   retry: 3,
 })
 
 // Start mutation in some component:
 const mutation = useMutation('addTodo')
 mutation.mutate({ title: 'title' })
 
 // If the mutation has been paused because the device is for example offline,
 // Then the paused mutation can be dehydrated when the application quits:
 const state = dehydrate(queryClient)
 
 // The mutation can then be hydrated again when the application is started:
 hydrate(queryClient, state)
 
 // Resume the paused mutations:
 queryClient.resumePausedMutations()
```