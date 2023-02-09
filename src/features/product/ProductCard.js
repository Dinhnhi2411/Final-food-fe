import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./product.css";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import SkeletonLoading from "../../components/skeletonLoading/SkeletonLoading";

export default function ProductCard({ product, isLoading }) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        onClick={() => navigate(`/products/public/${product._id}`)}
        className="card_product"
        sx={{
          width: "100%wh",
          borderRadius: 5,
          m: 3,
          // backgroundColor: "primary.lighter",
        }}
      >
        {isLoading ? (
          <SkeletonLoading
            isLoading={isLoading}
            style={{ width: "100%", pt: "100%" }}
          />
        ) : (
          <CardActionArea>
            <CardMedia
              className="card_media"
              sx={{
                height: {
                  xs: 130,
                  md: 200,
                  lg: 250,
                },
               
              }}
              component="img"
              image={product.image[0]}
              alt=""
              key={product._id}
            />
            <CardContent
              sx={{
                height: { xs: 90 },
                mt: { xs: 2 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                gutterBottom
                component="span"
                sx={{
                  color: "primary.darker",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: { xs: 14, md: 18, lg: 20 },
                  fontWeight: "700",
                }}
              >
                {product.productName}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  display: "flex",
                  justifyContent: "center",
                  color:"#000"
                }}
              >
                {fCurrency(product.price)} / {product.unit}
              </Typography>
            </CardContent>
          </CardActionArea>
        )}
      </Card>
    </>
  );
}
