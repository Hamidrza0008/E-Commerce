import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import ProductDetails from "./Pages/ProductDetails";
import CategoriesProducts from "./Pages/CategoriesProducts";
import Navbar from "./Components/Navbar";
import { Search } from "./Pages/Search";
import AuthPage from "./Pages/AuthPage";
import AdminProfile from "./Pages/ProfilePage";
import Checkout from "./Pages/Checkout";
import ProtectedRoute from "./Components/ProtectedRoutes";
function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product" element={<ProductDetails />} /> */}
        <Route path="/product/catagories" element={<CategoriesProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App
