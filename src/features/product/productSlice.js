import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,

  productById: {},

  
  selectedProduct: null,
  currentPageProducts: [],
  

  products: [],
  product: {},
  

  totalProduct: 0,
  totalPages:1,

  currentPage:1,

  totalProductList: 0,
  totalProductDashboard:0,
  totalProductCurrent: 0,

  productsTopSelling: [],
  productsNew: [],
  productsDiscount: [],

   filters: {
    sortBy: "",
    

  },
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.products;
      state.currentPage = action.payload.page;
      state.totalProduct = action.payload.count
      state.totalPages = action.payload.totalPages;

      state.isLoading = false;
      state.error = null;

    },
    getProductTopSellingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.productsTopSelling = action.payload.Products;
    },
    getProductNewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.productsNew = action.payload.Products;
    },

    getProductDiscountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.productsDiscount = action.payload.Products;
    },
    getProductListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    
      state.products = action.payload.products;
      state.totalProductList = action.payload.count
      state.totalProductDashboard = action.payload.count
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.totalPages
    },
    getSingleProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedProduct = action.payload;
    },
    resetProducts(state, action) {
      state.productById = {};
      state.currentPageProducts = [];
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;

      state.currentPageProducts.unshift(newProduct);
      state.currentPageProducts.unshift(newProduct._id);
    },
    updataProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentPageProducts.shift();
    },
     handleChangeFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
     handleClearFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },
  },
});
export const {
  handleChangeFilters,
  handleClearFilters,
  getProductListSuccess
} = slice.actions;

export default slice.reducer;

//  CREATE NEW PRODUCT

export const createProduct = ({
    productName, types, status, price, priceSale, unit, rating, image, description
}) =>
 async(dispatch) => {
    dispatch(slice.actions.startLoading());
try{
const imageUrl = await cloudinaryUpload(image);
const response = await apiService.post("/products", {
    productName, types, status, price, priceSale, unit, rating, description, image: imageUrl,
});
dispatch(slice.actions.createProductSuccess(response.data));
toast.success("Create Product Successfully");

}catch(error) {
dispatch(slice.actions.hasError(error.message));
toast.error(error.message);
}
};

// GET ALL PRODUCTS

export const getProducts = ({page=1, limit=PER_PAGE, name, types, filter}) =>
async(dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try{
       
        const params = { page, name, types, limit, filter};
        if(name) params.name = name
        if(types) params.types = types

        const response = await apiService.get(`/products/public`, {params});
        if(page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductSuccess(response.data));


    }catch(error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }

};



// GET PRODUCT TOP SELLING

export const getProductsTopSelling =
  ({ page = 1, limit = 8, name, types }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit, types};
        if (name) params.name = name;
        if(types) params.types = types;

        const response = await apiService.get(`/products/public/productsTopSelling`, { params });
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductTopSellingSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

// GET PRODUCT NEW 

export const getProductsNew =
  ({ page = 1, limit = 8, name, types }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit, types};
        if (name) params.name = name;
        if(types) params.types = types;

        const response = await apiService.get(`/products/public/productsNew`, { params });
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductNewSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

// GET PRODUCT DISCOUNT 

export const getProductsDiscount =
  ({ page = 1, limit = 8, name, types }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit, types};
        if (name) params.name = name;
        if(types) params.types = types;

        const response = await apiService.get(`/products/public/productsDiscount`, { params });
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductDiscountSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };


//  GET SINGLE PRODUCT 

export const getSingleProducts =
  (id) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.get(`/products/public/${id}`);

        dispatch(slice.actions.getSingleProductSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

//  EDIT/UPDATE PRODUCT

export const editProduct =
  ({ id, productName, types, price, priceSale, unit, image, status, description, userId, page }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const data = { productName, types, price, priceSale, unit, image, status, description }

        if (image instanceof File) {
          const imageUrl = await cloudinaryUpload(image);
          data.image = imageUrl;
        }

        const response = await apiService.put(`/products/${id}`, data);
        dispatch(slice.actions.updataProductSuccess(response.data))
        toast.success("Edit Product Successessfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

//  DELETE PRODUCT

export const deleteProduct =
  (id) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.delete(`/products/${id}`);
        dispatch(slice.actions.deleteProductSuccess(response.data));
        dispatch(getProducts(response));
        toast.success("Delete Successfully");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };



// GET PRODUCTS LIST 
 export const getProductList = (filters) => async (dispatch, getState) => {
  dispatch(slice.actions.startLoading());
  try {
    filters = { ...filters, ...getState().product.filters };

    const response = await apiService.get("/products", { params: filters });
    dispatch(getProductListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};