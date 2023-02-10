import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./product.css";
import { Box, CardActionArea, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import SkeletonLoading from "../../components/skeletonLoading/SkeletonLoading";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import IconButton from "@mui/material/IconButton";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

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
          m: 1,
        }}
      >
        <>
          <CardActionArea>
            <CardMedia
              className="card_media"
              sx={{
                height: {
                  xs: 130,
                  md: 150,
                  lg: 180,
                },
                width: "100%",
              }}
              component="img"
              image={product.image[0]}
              alt=""
              key={product._id}
            />

            <CardContent
              sx={{
                height: { xs: 80 },
                m: 1,
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
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  fontWeight: 500,
                  fontFamily: "Comic Sans MS"
                }}
              >
                {product.productName}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 14, md: 16, lg: 18 },
                  display: "flex",
                  justifyContent: "center",
                  color: "#000",
                  fontFamily: "Comic Sans MS"
                }}
              >
                price: {fCurrency(product.price)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </>
      </Card>
    </>
  );
}
