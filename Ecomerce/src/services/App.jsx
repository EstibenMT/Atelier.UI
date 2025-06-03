// src/main.jsx
import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
