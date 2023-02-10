import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../features/cart/CartList";
import { getCart } from "../features/cart/cartSlice";
import useAuth from "../hooks/useAuth";

function CartPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  let { carts, page } = useSelector((state) => state?.cart);
 

  useEffect(() => {
    if (user) dispatch(getCart(page));
  }, [dispatch, page, user]);

  return (
    <>
      <CartList carts={carts} />
    </>
  );
}

export default CartPage;
