import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fDate, fToNow } from "../../../utils/formatTime";
import { getProductList } from "../../product/productSlice";

export default function LastProduct(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const filter = { sortBy: "createdAt.desc", limit: limit };
    dispatch(getProductList(filter));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${products?.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products?.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product?._id}>
            <ListItemAvatar>
              <Box
                component="img"
                sx={{
                  width: 100,
                  height: "100%",
                  ml: 1,
                  mr:1,
                  mt: 1,
                  borderRadius: 1,
                }}
                src={product.image[0]}
                alt="product"
              />
            </ListItemAvatar>
            
            <ListItemText
              primary={product.productName}
              secondary={`Updated ${
                product.updatedAt && fDate(product?.updatedAt, "dd/MM/yyyy")
              }`}
            />
          
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          component={Link}
          to={`/dashboard/products`}
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
