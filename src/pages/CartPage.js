import { Box, Stack, Step, StepButton, Stepper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../features/cart/CartList";
import CartOrder from "../features/cart/CartOrder";
import { getCart, setActiveStep } from "../features/cart/cartSlice";
import useAuth from "../hooks/useAuth";

function CartPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  let { carts, page , activeStep} = useSelector((state) => state?.cart);

  const handleStep = (step) => {
    dispatch(setActiveStep(step));
  };
  useEffect(() => {
    if (user) dispatch(getCart(page));
  }, [dispatch, page, user, activeStep]);

  const handleActiveStep = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const STEPS = [
    {
      value: "Cart",
      Cart: 0,
      component: <CartList carts={carts} handleActiveStep={handleActiveStep} />,
    },


    {
      value: "Payment",
      Payment: 1,
      component: <CartOrder carts={carts.Carts} handleActiveStep={handleActiveStep}/>,
    },

  ];

  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ width: { sx: "100%", md: "60%" }, mx: "auto" }}>
          <Stepper nonLinear activeStep={activeStep} sx={{ flexWrap: "wrap" }}>
            {STEPS.map((step, index) => (
              <Step key={step[step.value]}>
                <StepButton onClick={() => handleStep(step[step.value])}>
                  {step.value}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {STEPS.map((step, idx) => {
          const isMatched = step[step.value] === activeStep;
          return (
            isMatched && <Box key={step[step.value]}>{step.component}</Box>
          );
        })}
      </Stack>
    </>
  );
}

export default CartPage;
