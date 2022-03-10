import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Webfont from "webfontloader";
import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignup from "./components/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeRoute from "./components/Route/StripeRoute";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import NotFound from "./components/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <div className='App'>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/account' element={<ProtectedRoute />}>
            <Route exact path='/account' element={<Profile />} />
          </Route>
          <Route exact path='/me/update' element={<ProtectedRoute />}>
            <Route exact path='/me/update' element={<UpdateProfile />} />
          </Route>
          <Route exact path='/password/update' element={<ProtectedRoute />}>
            <Route exact path='/password/update' element={<UpdatePassword />} />
          </Route>
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route
            exact
            path='/password/reset/:token'
            element={<ResetPassword />}
          />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/shipping' element={<ProtectedRoute />}>
            <Route exact path='/shipping' element={<Shipping />} />
          </Route>
          <Route exact path='/order/confirm' element={<ProtectedRoute />}>
            <Route exact path='/order/confirm' element={<ConfirmOrder />} />
          </Route>
          {stripeApiKey && (
            <Route
              exact
              path='/process/payment'
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <StripeRoute>
                    <Payment />
                  </StripeRoute>
                </Elements>
              }
            />
          )}
          <Route exact path='/success' element={<ProtectedRoute />}>
            <Route exact path='/success' element={<OrderSuccess />} />
          </Route>
          <Route exact path='/orders' element={<ProtectedRoute />}>
            <Route exact path='/orders' element={<MyOrders />} />
          </Route>
          <Route exact path='/order/:id' element={<ProtectedRoute />}>
            <Route exact path='/order/:id' element={<OrderDetails />} />
          </Route>
          <Route
            exact
            path='/admin/dashboard'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/dashboard' element={<Dashboard />} />
          </Route>
          <Route
            exact
            path='/admin/products'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/products' element={<ProductList />} />
          </Route>
          <Route
            exact
            path='/admin/product'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/product' element={<NewProduct />} />
          </Route>
          <Route
            exact
            path='/admin/product/:id'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route
              exact
              path='/admin/product/:id'
              element={<UpdateProduct />}
            />
          </Route>
          <Route
            exact
            path='/admin/orders'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/orders' element={<OrderList />} />
          </Route>
          <Route
            exact
            path='/admin/order/:id'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/order/:id' element={<ProcessOrder />} />
          </Route>
          <Route
            exact
            path='/admin/users'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/users' element={<UsersList />} />
          </Route>
          <Route
            exact
            path='/admin/user/:id'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/user/:id' element={<UpdateUser />} />
          </Route>
          <Route
            exact
            path='/admin/reviews'
            element={<ProtectedRoute isAdmin={true} />}
          >
            <Route exact path='/admin/reviews' element={<ProductReviews />} />
          </Route>
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate replace to='/404' />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
