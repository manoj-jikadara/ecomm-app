import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page = 1) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
    );
    const data = await response.json();

    return data.products.map((product) => ({
      productId: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
    }));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const newProducts = action.payload;

        const uniqueProducts = newProducts.filter((newProduct) => {
          return !state.products.some(
            (existingProduct) =>
              existingProduct.productId === newProduct.productId
          );
        });

        state.products = [...state.products, ...uniqueProducts];
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
