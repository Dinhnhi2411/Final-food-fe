
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import calTotalReports from "../../../utils/calReport";
import { fCurrency, fNumber } from "../../../utils/numberFormat";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


export function Revenue({ revenues }) {
  const results = calTotalReports(revenues, "total");
  
return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              revenue
            </Typography>
            <Stack direction="row" alignItems="flex-end" spacing={1}>
              <Typography color="textPrimary" variant="h4">
                {fCurrency(results?.total / 1000) + "K"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
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
          {results?.totallastMonth > results?.total ? (
            <ArrowDownwardIcon color="error" />
          ) : (
            <ArrowUpwardIcon color="success" />
          )}

          <Typography
            color={
              results?.totallastMonth > results?.total ? "error" : "success"
            }
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            {fNumber(results?.percent)}%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}