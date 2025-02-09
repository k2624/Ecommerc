import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import  CheckOut from './Components/CheckOut/CheckOut.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import VerifyCode from './Components/VerifyCode/VerifyCode.jsx';
import UserContextProvider from './Components/Context/UserContext.jsx'
import ProdectedRoute from './Components/ProdectedRoute/ProdectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './Components/Context/CartContext.jsx'
import BrandsDetails from './Components/BrandsDetails/BrandsDetails.jsx'
import WishList from './Components/WishList/WishList.jsx'
import WishListContextProvider from './Components/Context/WishListContext.jsx'


let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {path : 'register' , element: <Register/>},
    {path:'login' , element: <Login/>},
    { index: true , element: <ProdectedRoute><Home/> </ProdectedRoute>},
    {path : 'allorders' , element: <ProdectedRoute> <AllOrders/> </ProdectedRoute> },
    {path:'cart' , element:  <ProdectedRoute><Cart/> </ProdectedRoute>},
    {path:'brands' , element:<ProdectedRoute> <Brands/> </ProdectedRoute>},
    {path:'wishList' , element:<ProdectedRoute> <WishList/> </ProdectedRoute>},
    {path:'forget-password' , element: <ForgotPassword/> },
    {path: 'reset-password' , element : <ResetPassword/>},
    {path:'verify-code' , element: <VerifyCode/> },
    {path:'brand-detail/:_id' , element:<ProdectedRoute> <BrandsDetails/> </ProdectedRoute>},
    {path:'categories' , element:<ProdectedRoute><Categories/></ProdectedRoute>},
    {path:'products' , element:<ProdectedRoute> <Products/> </ProdectedRoute>},
    {path: 'checkOut' , element: <ProdectedRoute> <CheckOut/> </ProdectedRoute>},
    {path:'productDetails/:id' , element:<ProdectedRoute><ProductDetails/></ProdectedRoute>},
    {path:'*' , element: <NotFound/>},
  ]
}])

function App() {
  return (

      <UserContextProvider>
    <CartContextProvider>
    <WishListContextProvider>
        <RouterProvider router={routers} />
        <Toaster />

    </WishListContextProvider>
    </CartContextProvider>
      </UserContextProvider>
  );
}

export default App;
