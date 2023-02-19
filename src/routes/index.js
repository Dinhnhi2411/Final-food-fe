import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import BlankLayout from "../layouts/BlankLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import DashboardPage from "../pages/DashBoard/DashboardPage";
import EditOrderPage from "../pages/DashBoard/EditOrderPage";
import EditProductPage from "../pages/DashBoard/EditProductPage";
import ProductPage from "../pages/DashBoard/ProductPage";
import DetailProduct from "../pages/DetailProduct";
import HomePage from "../pages/HomePage";
import IntroducePage from "../pages/IntroducePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import RegisterPage from "../pages/RegisterPage";
import StorePage from "../pages/StorePage";
import AuthRequire from "./AuthRequired";
import "../theme/App.css"
function Router() {
  let location = useLocation();

  return (
    <>
      <Routes  className="App"
       location={
      location.state?.backgroundLocation
      ? location.state.backgroundLocation
      : location
    }>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="introduce" element={<IntroducePage />} />
          <Route
            path="account"
            element={
              <AuthRequire>
                <AccountPage />
              </AuthRequire>
            }
          />

          <Route path="products/public/:id" element={<DetailProduct />} />
          <Route path="account" element={<AccountPage />} />
          <Route
            path="order"
            element={
              <AuthRequire>
                <OrderPage />
              </AuthRequire>
            }
          />

          <Route
            path="cart"
            element={
              <AuthRequire>
                <CartPage />
              </AuthRequire>
            }
          />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <AuthRequire>
              <DashboardLayout />
            </AuthRequire>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="products/add" element={<EditProductPage />} />
          <Route path="products/clone/:id" element={<EditProductPage />} />
          <Route path="order" element={<EditOrderPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
