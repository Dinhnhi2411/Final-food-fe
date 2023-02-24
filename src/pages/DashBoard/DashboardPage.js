import { Alert, Container, Grid } from "@mui/material";
import { addDays } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportsDashboard } from "../../features/dashboard/dashboardSlice";
import LastOrders from "../../features/dashboard/reportStore/LastOrder";
import { getArrayLastDays } from "../../utils/formatTime";
import AppWidgetSummary from "./components/AppWidgetSummary";
import LastProduct from "../../features/dashboard/reportStore/LastProduct";
import Order from "../../features/dashboard/reportStore/Order";
import editReport from "../../utils/editReport";
import useAuth from "../../hooks/useAuth";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { reports } = useSelector((state) => state?.dashboard);
  const revenue = editReport(reports?.revenue, "total");
  const totalCustomer = editReport(reports?.totalCustomer, "count");
  const totalOrder = editReport(reports?.totalOrder, "count");
  const totalProduct = editReport(reports?.totalProduct, "count");

  const rangeDays = getArrayLastDays(7, false, addDays(new Date(), 1)).join(
    ","
  );

  useEffect(() => {
    const filters = { rangeDays };
    dispatch(getReportsDashboard(filters));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      {user?.role === "admin" ? (
        <Container 
        maxWidth={false} 
        sx={{
          mt:{xs:1, sm:2, md:2, lg:4}
        }}>
          <Grid key="dashboard" container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <AppWidgetSummary
                title="Total Price Sales"
                total={revenue?.total}
                color="primary"
                icon={"twemoji:dollar-banknote"}
              />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="New Users"
                total={totalCustomer?.count}
                color="info"
                icon={"mdi:account-box"}
              />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="Total Orders"
                total={totalOrder?.count}
                color="warning"
                icon={"typcn:device-desktop"}
              />
            </Grid>

            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <AppWidgetSummary
                title="Total Product"
                total={totalProduct?.count}
                color="addins"
                icon={"bi:cart4"}
              />
            </Grid>

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
      ) : (
        <Alert severity="error">You are not admin</Alert>
      )}
    </>
  );
}
