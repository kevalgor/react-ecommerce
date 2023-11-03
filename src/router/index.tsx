import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ConsumerPrivateRoute,
} from "./private.routes";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ConsumerLogin from "../pages/consumer/login";
import ConsumerRegister from "../pages/consumer/register";
import ConsumerProfile from "../pages/consumer/profile";
import ConsumerProducts from "../pages/consumer/products";
import ConsumerCart from "../pages/consumer/cart";
import ConsumerWishlist from "../pages/consumer/wishlist";
import ConsumerOrders from "../pages/consumer/orders";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* consumer related all routes */}
        <Route path="/consumer/login" element={<ConsumerLogin />} />
        <Route path="/consumer/register" element={<ConsumerRegister />} />
        <Route
          path="/consumer/profile"
          element={<ConsumerPrivateRoute routeName={<ConsumerProfile />} />}
        />
        <Route
          path="/consumer/products"
          element={<ConsumerPrivateRoute routeName={<ConsumerProducts />} />}
        />
        <Route
          path="/consumer/cart"
          element={<ConsumerPrivateRoute routeName={<ConsumerCart />} />}
        />
        <Route
          path="/consumer/wishlist"
          element={<ConsumerPrivateRoute routeName={<ConsumerWishlist />} />}
        />
        <Route
          path="/consumer/orders"
          element={<ConsumerPrivateRoute routeName={<ConsumerOrders />} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
