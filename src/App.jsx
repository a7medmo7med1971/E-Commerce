import React from 'react'; // ✅ مهم جدًا
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './component/Home/Home.jsx';
import Login from './component/Login/Login.jsx';
import Brands from './component/Brands/Brands.jsx';
import Products from './component/Products/Products.jsx';
import Register from './component/Register/Register.jsx';
import Carts from './component/Carts/Carts.jsx';
import Notfound from './component/Notfound/Notfound.jsx';
import Layout from './component/Layout/Layout.jsx';
import UserContext from './component/UserContext/UserContext.jsx';
import ContextCarts from './component/ContextCarts/ContextCarts.jsx'
import ProductDetiels from './component/ProductDetiels/ProductDetiels.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import Payment from './component/Payment/Payment.jsx';
import AllOrders from './component/AllOrders/AllOrders.jsx';
import UserOrders from './component/UserOrders/UserOrders.jsx';
import ContextWshlist from './component/ContextWshlist/ContextWshlist.jsx';
import WshlistProducts from './component/WshlistProducts/WshlistProducts.jsx';
import Protected from './component/Protected/Protected.jsx';
import PaymentOnline from './component/paymentOnline/PaymentOnline.jsx';





function App() {
//react query tanStack
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', element:  <Home /> },
        { path: 'Login', element: <Login /> },
        // { path: 'Brands', element: <Protected><Brands /></Protected>  },
        { path: 'Products', element:  <Protected><Products /></Protected> },
        { path: 'WshlistProducts', element:  <Protected><WshlistProducts /></Protected> },
        { path: 'ProductDetiels/:id/:category', element: <Protected><ProductDetiels/></Protected> },
        { path: 'Register', element: <Register /> },
        { path: 'Carts', element: <Protected><Carts /> </Protected>},
        { path: 'Payment', element: <Protected><Payment /></Protected>},
        { path: 'AllOrders', element: <Protected><AllOrders /></Protected>},
        { path: 'UserOrders', element: <Protected><UserOrders /></Protected>},
        { path: 'PaymentOnline', element: <Protected><PaymentOnline /></Protected>},
        { path: '*', element: <Notfound /> },
      ],
    },
  ]);

  return <UserContext>
<ContextWshlist>
        <ContextCarts>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ContextCarts>
</ContextWshlist>
    </UserContext>
  
 
}

export default App;
