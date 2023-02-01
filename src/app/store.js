import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from"../features/order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
const rootReducer = {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    dashboard: dashboardReducer,
}; 


const store = configureStore({
    reducer: rootReducer,
});
export default store;