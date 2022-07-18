import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {Provider} from "react-redux";
import store from './store/config'

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            // 전역으로 옵션을 세팅할 수 있음
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false
        }
    }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ReactQueryDevtools initialIsOpen={true} />
                <App />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);

