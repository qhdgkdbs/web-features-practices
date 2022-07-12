# 리액트 쿼리
* 3가지 주요개념
  * Queries
  * Mutations
  * Query Invalidation


* 간단 사용 예시
```javascript
 import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider} from 'react-query'
 import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    )
}

function Todos() {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery('todos', getTodos)

    // Mutations(변경)
    const mutation = useMutation(postTodo, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('todos')
        },
    })

    return (
        <div>
            <ul>
                {query.data.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>

            <button
                onClick={() => {
                    mutation.mutate({
                        id: Date.now(),
                        title: 'Do Laundry',
                    })
                }}
            >
                Add Todo
            </button>
        </div>
    )
}

render(<App />, document.getElementById('root'))
```

* important Defaults
  * useQuery 와 useInfiniteQuery 는 캐시된 데이터를 오래되었다고 판단
    * staleTime opt를 통해 변경 가능
  * refetch가 되는 시점
    * 쿼리 마운트의 새로운 인스턴스
    * 윈도우의 refocused
    * 네트워크 재연결시
    * 

