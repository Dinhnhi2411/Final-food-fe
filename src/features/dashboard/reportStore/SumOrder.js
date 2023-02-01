import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import calTotalReports from "../../../utils/calReport";
import { fNumber } from "../../../utils/numberFormat";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";


export default function SumOrder({ totalOrders }) {
  const results = calTotalReports(totalOrders, "count");
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ODERS
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <Typography color="textPrimary" variant="h4">
                {fNumber(results?.count)}
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
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
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

