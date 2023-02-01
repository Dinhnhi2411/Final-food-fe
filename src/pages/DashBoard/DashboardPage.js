import { Box, Container, Grid } from "@mui/material";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportsDashboard } from "../../features/dashboard/dashboardSlice";
import LastOrders from "../../features/dashboard/reportStore/LastOrder";
import { getProductList } from "../../features/product/productSlice";
import { getArrayLastDays } from "../../utils/formatTime";
import AppUserChart from "./components/AppUserChart";
import AppWidgetSummary from "./components/AppWidgetSummary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { getOrder, getOrdersDashboard } from "../../features/order/orderSlice";
import { getUserList } from "../../features/user/userSlice";
import LastProduct from "../../features/dashboard/reportStore/LastProduct";
import Order from "../../features/dashboard/reportStore/Order";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state?.dashboard);
  const totalUser = reports?.totalCustomer;
  const totalOrder = reports?.totalOrder;
  const totalProduct = reports?.totalProduct;
  const revenue = reports?.revenue;

  const rangeDays = getArrayLastDays(7, false, addDays(new Date(), 1)).join(
    ","
  );

  useEffect(() => {
    const filters = { rangeDays };
    dispatch(getReportsDashboard(filters));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Box>
      <Container maxWidth={false}>
        <Grid key="dashboard" container spacing={3}>
          {revenue?.map((sale) => (
            <Grid key={sale.count} item lg={3} sm={6} xl={3} xs={12}>
              <AppWidgetSummary
                title="Total Price Sales"
                total={sale.total}
                color="primary"
                icon={"twemoji:dollar-banknote"}
              />
            </Grid>
          ))}

          {totalUser?.map((user) => (
            <Grid key={user?.count} item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="New Users"
                total={user.count}
                color="info"
                icon={"mdi:account-box"}
              />
            </Grid>
          ))}

          {totalOrder?.map((order) => (
            <Grid key={order.count} item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="Total Orders"
                total={order.count}
                color="warning"
                icon={"typcn:device-desktop"}
              />
            </Grid>
          ))}

          {totalProduct?.map((product) => (
            <Grid key={product.count} item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="Total Product"
                total={product.count}
                color="addins"
                icon={"bi:cart4"}
              />
            </Grid>
          ))}

          <Grid item key={1} xl={12} lg={12} md={12} xs={12}>
            <Order
              lastestOrders={reports.lastestOrders}
              rangeDays={rangeDays}
            />
            {/* <AppUserChart/> */}
          </Grid>
          <Grid item key={2} xl={4} lg={4} md={12} xs={12}>
            <LastProduct />
          </Grid>
          <Grid item key={3} xl={8} lg={8} md={12} xs={12}>
            <LastOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
