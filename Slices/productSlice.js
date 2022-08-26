import React, { useState } from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { products_url as url, single_product_url } from "../utils/constants";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isMenu: false,
  products_loading: false,
  products_error: "",
  products: [],
  product_loading: false,
  product_error: "",
  product: {},
  featured_products: [],
  filtered_products: [],
  grid_view: true,
  list_view: false,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await axios.get(`${single_product_url}${id}`);
    return response.data;
  }
);
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(`${url}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    menuState: (state) => {
      state.isMenu = !state.isMenu;
    },
    gridView: (state) => {
      state.grid_view = true;
      state.list_view = false;
    },
    listView: (state) => {
      state.grid_view = false;
      state.list_view = true;
    },
    sortByLowest: (state, action) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price < b.price) return -1;
      });
    },
    sortByHighest: (state, action) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
      });
    },
    sortByName: (state, action) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
      });
    },
    sortByReverseName: (state, action) => {
      state.filtered_products = state.filtered_products.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      });
    },
    searchProducts: (state, action) => {
      state.filtered_products = state.products.filter((product) =>
        product.name.includes(action.payload)
      );
    },
    searchProductsByCategory: (state, action) => {
      if (action.payload === "all") {
        state.filtered_products = state.products.filter(
          (product) => product.category !== "all"
        );
      } else {
        state.filtered_products = state.products.filter(
          (product) =>
            product.category === action.payload && action.payload !== "all"
        );
      }
    },
    searchProductsByCompany: (state, action) => {
      if (action.payload === "all") {
        state.filtered_products = state.products.filter(
          (product) => product.company !== "all"
        );
      } else {
        state.filtered_products = state.products.filter(
          (product) =>
            product.company === action.payload && action.payload !== "all"
        );
      }
    },
    searchProductsByColor: (state, action) => {
      if (action.payload == "all") {
        state.filtered_products = state.products.slice();
      } else {
        state.filtered_products = state.products.filter((product) =>
          product.colors.includes(action.payload)
        );
      }
    },
    searchProductsByPrice: (state, action) => {
      state.filtered_products = state.products.filter(
        (product) => product.price >= 0 && product.price <= action.payload
      );
    },
    searchByFreeShipping: (state, action) => {
      if (action.payload === "not_checked") {
        state.filtered_products = [...state.products];
      } else {
        state.filtered_products = state.products.filter(
          (product) => product.shipping === true
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products_loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      (state.products_loading = false),
        (state.products = action.payload),
        (state.filtered_products = action.payload),
        (state.featured_products = action.payload.filter(
          (product) => product.featured === true
        ));
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products_loading = false;
      state.products = [];
      state.products_error = "There was an error";
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.product_loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      (state.product_loading = false),
        (state.product = action.payload),
        (state.product_error = "");
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      (state.product_loading = false),
        (state.product = {}),
        (state.product_error = "There was an error fetching this Product");
    });
    builder.addCase([HYDRATE], (state, action) => {
      state.product = action.payload.products.product;
      state.featured_products = action.payload.products.featured_products;
      state.products = action.payload.products.products;
      state.isMenu = action.payload.products.isMenu;
      state.product_loading = action.payload.products.product_loading;
      state.products_loading = action.payload.products.products_loading;
      state.products_error = action.payload.products.products_error;
      state.product_error = action.payload.products.product_error;
    });
  },
});

export default productSlice.reducer;
export const {
  menuState,
  gridView,
  listView,
  sortByHighest,
  sortByLowest,
  sortByName,
  sortByReverseName,
  searchProducts,
  searchProductsByCategory,
  searchProductsByCompany,
  searchProductsByColor,
  searchProductsByPrice,
  searchByFreeShipping,
} = productSlice.actions;
