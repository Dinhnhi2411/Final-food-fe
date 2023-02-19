import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink, useParams } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { fCurrency, fNumber } from "../utils/numberFormat";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import apiService from "../app/apiService";
import { addCart } from "../features/cart/cartSlice";
import ProductTabs from "../features/product/ProductTabs";
import { getProducts } from "../features/product/productSlice";
import Carousel from "../components/carousel/Carousel";
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { toast } from "react-toastify";


function DetailProduct() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [img, setImg] = useState(0);
  const [border, setBorder] = useState(0);
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  let { user } = useAuth();
  const {products} = useSelector((state)=> state?.product)

  //  get product

  useEffect(() => {
    const getSingleProducts = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/products/public/${id}`);

        setProduct(res.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getSingleProducts();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    }
    dispatch(addCart({ productId: id }));
    toast("Add cart successfully")
  };

  useEffect(()=>{
    dispatch(getProducts(page))
  },[page, dispatch])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickImage = (image, index) => {
    setImg(image);
    setBorder(index);
  };

  return (
    <Container>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
         
          mt: { xs: 3, md: 5 },
          mb: { xs: 1, md: 2 },
          fontSize: { xs: 18, md: 25 },
          fontWeight: 600,
        }}
      >
        <Link 
        sx={{color:"#000"}}
        underline="hover" 
        component={RouterLink} 
        to="/store"
        >
          Mini Food
        </Link>
        <Typography
          color="grey.600"
          sx={{
            fontSize: { xs: 16, md: 20 },
            fontWeight: 400,
          }}
        >
          {product.productName}
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          position: "relative",
          height: 1,
        }}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                 { product && (
                  <Box key={product?._id} sx={{ p: 2 }} className="detail-page">
                    <Grid key={product?._id} container>
                      <Grid item xs={12} md={6} key={product?._id}>
                        <Box p={2}>
                          <Box
                            sx={{
                              width: {
                                xs: 300,                
                                md: 400,
                                lg: 500,
                              },
                              height: { xs: 200, md: 300, lg: 350 },
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Card
                              component="img"
                              src={!img ? product?.image[0] : (img)
                              }
                              alt="product"
                            />
                          </Box>

                          {product?.image?.map((img, index) =>
                            index === border ? (
                              <Card
                                key={index}
                                onClick={() => {
                                  handleClickImage(img, index);
                                }}
                                component="img"
                                sx={{
                                  width: "100%wh",
                                  height: 70,
                                  // ml: 1,
                                  mt: 1,
                                  borderRadius: 1,
                                  
                                }}
                                src={img}
                                alt="product"
                              />
                            ) : (
                              <Card
                                key={index}
                                onClick={() => {
                                
                                  handleClickImage(img, index);
                                }}
                                component="img"
                                sx={{
                                  width: "100%wh",
                                  height: 70,
                                  ml: 1,
                                  mt: 1,
                                  borderRadius: 1,
                                }}
                                src={img}
                                alt="product"
                              />
                            )
                          )}
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                         <Chip
                      avatar={< FilterVintageIcon/>}
                      label={product.status}
                      sx={{
                        mt: 2,
                        mb: 1,
                        background:
                          product.status === "Discount"
                            ? "linear-gradient(to right, #f12711, #f5af19)"
                            : "linear-gradient(to left, #f5af19, #FF8095)",
                        textTransform: "uppercase",
                        "& .MuiChip-avatar": {
                          color: "white",
                        },
                      }}
                      color="info"
                      size="medium"
                    />

                        <Typography
                          sx={{
                            fontSize: { xs: 18, md: 25 },
                            fontWeight: 600,
                          }}
                        >
                          {product.productName}
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
                        <Typography
                          sx={{
                            mb: 1,
                            color: "red",
                            fontSize: { xs: 20, md: 30 },
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          <Box
                            component="span"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.price && fCurrency(product.price)}
                        
                          </Box>
                          &nbsp;{fCurrency(product.priceSale)}
                        </Typography>

                        <Typography
                          sx={{
                            mb: 1,
                            font: { xs: 16, md: 23 },
                            fontWeight: 600,
                          }}
                        >
                          Unit: {product.unit}
                        </Typography>

                        <Typography
                          sx={{
                            mb: 3,
                            font: { xs: 16, md: 23 },
                            fontWeight: 600,
                          }}
                        >
                          Products available at Mini Food
                        </Typography>

            
                        <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                          <Button
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => {
                              if (!user) {
                                navigate("/login");
                              } else {
                               (user?._id === product?.author?._id)
                                ? toast("You can't buy your product store")
                                : handleAddToCart()
                              }
                            }}
                          >
                            Add Shopping Cart
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  <Box>
                        <ProductTabs product={product} />
                  </Box>
                   <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                  <Box>
                    <Typography
                    sx={{
                      ml:3
                    }}
                    >
                      Orther products
                    </Typography>
                    <Carousel page={page} products={products}/>
                  </Box>
                  </Box>
                 
                )}
                 
               
                
                {!product && (
                  <Typography variant="h6">404 Product not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Box sx={{ mb: 10 }}></Box>
    </Container>
  );
}

export default DetailProduct;
