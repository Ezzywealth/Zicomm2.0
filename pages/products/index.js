import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../app/Store";
import { fetchProducts } from "../../Slices/productSlice";
import ProductFilters from "../../components/ProductFilters";
import ProductsSorts from "../../components/ProductsSorts";
import ProductsGridView from "../../components/ProductsGridView";
import ProductsListView from "../../components/ProductsListView";

const Products = () => {
  const products = useSelector((state) => state.productSlice.products);
  const state = useSelector((state) => state.productSlice);
  console.log(products);
  console.log(state);
  const dispatch = useDispatch();

  // const fetchProducts = async () => {
  //   await db.connect();
  //   const products = await Product.find().lean();
  //   await db.disconnect();
  //   console.log(products);
  // };

  // fetchProducts();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      <Layout title='products'>
        <ProductFilters />
        <ProductsSorts />
        <ProductsGridView />
        <ProductsListView />
      </Layout>
    </div>
  );
};

export default Products;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log(context);
    store.dispatch(fetchProducts());

    return {
      props: {},
    };
  }
);
