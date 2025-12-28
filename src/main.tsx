import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProvider from './utils/react-queries/QueryProvider.tsx'
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './utils/routes/index.tsx';

createRoot(document.getElementById('root')!).render(
    <QueryProvider>
        <Provider store={store}>
            <BrowserRouter>
      <Routes>
        <Route element={<App/>} path='/'>
            {routes.map((route)=>route.layout!=null? (<Route element={route.layout} path="/">
          <Route path={route.path} element={route.element}/>
        </Route>): <Route path={route.path} element={route.element}/>)}
        </Route>
        
      </Routes>
    </BrowserRouter>
        </Provider>
    </QueryProvider>,
)
