import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import calTotalReports from "../../../utils/report";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fNumber } from "../../../utils/numberFormat";

export default function Customers({ totalCustomers }) {
  const results = calTotalReports(totalCustomers, "count");
 

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL CUSTOMERS
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <Typography color="textPrimary" variant="h4">
                {results?.count}
              </Typography>
              {results?.totalLastMonth && (
                <Typography color="textPrimary" variant="body">
                  /{results?.totalLastMonth}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {results?.totalLastMonth > results?.count ? (
            <ArrowDownwardIcon color="error" />
          ) : (
            <ArrowUpwardIcon color="success" />
          )}

          <Typography
            color={
              results?.totalLastMonth > results?.count ? "error" : "success"
            }
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(results?.percent)} %
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
