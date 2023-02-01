import { Card, Stack } from "@mui/material";
import SkeletonLoading from "./SkeletonLoading";

export default function ProductCardSkeleton({ isLoading }) {
  return (
    <Card 
    sx={{
        display:{lg:"flex"}
    }}
    >
      <SkeletonLoading
        isLoading={true}
        style={{ width: "100%", minHeight: "270px" }}
      />

      <Stack spacing={1} sx={{ p: 2 }}>
        <SkeletonLoading isLoading={true} count={3} width="100%" />
      </Stack>
    </Card>
  );
}