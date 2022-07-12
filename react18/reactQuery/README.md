# 리액트 쿼리
[리액트 쿼리 공식문서](https://react-query-v2.tanstack.com/guides/important-defaults)
를 참고하여 작성하였습니다.

* concepts 폴더에 마크다운으로 정리하였습니다.

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

