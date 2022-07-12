# Updates from Mutation Responses
* mutation을 통해 데이터를 업데이트하고, 서버 측의 데이터를 다시 내려받는 네트워크의 낭비를 안할수 있는 장치
* [setQueryData](https://react-query-v2.tanstack.com/reference/QueryClient#queryclientsetquerydata)
를 활용하면 됨.

```javascript
const queryClient = useQueryClient()
 
 const mutation = useMutation(editTodo, {
   onSuccess: data => {
     queryClient.setQueryData(['todo', { id: 5 }], data)
   }
 })
 
 mutation.mutate({
   id: 5,
   name: 'Do the laundry',
 })
 
 // The query below will be updated with the response from the
 // successful mutation
 const { status, data, error } = useQuery(['todo', { id: 5 }], fetchTodoById)
```

* onSuccess 의 로직을 재사용가능한 mutation으로 만들 수 있음 (with  hook)
```javascript
 const useMutateTodo = () => {
   const queryClient = useQueryClient()
 
   return useMutation(editTodo, {
     // Notice the second argument is the variables object that the `mutate` function receives
     onSuccess: (data, variables) => {
       queryClient.setQueryData(['todo', { id: variables.id }], data)
     },
   })
 }
```