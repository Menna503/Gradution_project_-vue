import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usetoast } from "./Toast";

export const useProductStore = defineStore("product", () => {
  const productsdata = ref([]); //all product
  const product = ref(null); // one product
  const status = ref("idle"); // status
  const dataLength = ref(0); //  number of order const token ='  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWFAZ21haWwuY29tIiwiaWQiOiI2ODFmODY0MTk0ODQ2NTcyMmRmNTIyNzUiLCJyb2xlIjoibWFuZ2VyIiwiaWF0IjoxNzQ2OTA4MTg2LCJleHAiOjE3NDcwODA5ODZ9.rEsjup23ZmEuRSn3CmI6upwLDn6vp0adJcv_v48J0fI';
  const token = localStorage.getItem("token");
  const existingProduct = ref(0);
  async function fetchProducts(filter = {}) {
    status.value = "loading";
    try {
      const params = new URLSearchParams();
      if (filter.category) params.append("category", filter.category);
      const url = params.toString()
        ? `/api/products?${params}`
        : `/api/products`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      productsdata.value = res.data.data.products.filter((p) => !p.isDeleted);
      dataLength.value = productsdata.value.length;
      existingProduct.value = res.data.existingProduct;
      status.value = "success";
      return res;
    } catch (err) {
      console.error("Error fetching products:", err);
      status.value = "error";
      throw err;
    }
  }

  async function fetchProductById(id) {
    const res = await axios.get(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    product.value = res.data.data.product;

    return product.value;
  }

  async function updateProduct(id, payload) {
    const res = await axios.patch(`/api/products/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = res.data.data.product;

    const idx = productsdata.value.findIndex((p) => p._id === id);
    if (idx !== -1) productsdata.value[idx] = updated;
    return res;
  }

  async function deleteProduct(id) {
    const res = await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.satus === "success") {
      productsdata.value = productsdata.value.filter((p) => p._id !== id);
      dataLength.value = productsdata.value.length;
    }
    return res;
  }

  async function addProduct(payload) {
    try {
      const res = await axios.post("/api/products", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      productsdata.value.push(res.data.data.product);
      dataLength.value = productsdata.value.length;
      return res;
    } catch (error) {
      console.log(
        "Error adding product:",
        error.response?.data || error.message
      );
    }
  }

  return {
    fetchProducts,
    productsdata,
    status,
    dataLength,
    deleteProduct,
    addProduct,
    updateProduct,
    fetchProductById,
    product,
    existingProduct,
  };
});
