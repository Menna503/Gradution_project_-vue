<!-- Parent.vue -->
<script setup>
import Templatepage from "../components/Templatepage.vue";
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from "vue";
import Paginationtable from "../components/Paginationtable.vue";
import Pagetitle from "../components/Pagetitle.vue";
import Primarybutton from "../components/Primarybutton.vue";
import Table from "../components/Table.vue";
import Filter from "../components/Filter.vue";
import { useProductStore } from "../Store/Productstore";
import Search from "../components/Search.vue";
import { useFilterCode } from "../main/Searchcode";
import { usePagination } from "../main/Pagination";
import router from "../Router";
import { usetoast } from "../Store/Toast";
const toast=usetoast()
 const {showtoast}=toast
const PoducrcolumnsName = ref([
  { name: "_id", label: "Id" },
  { name: "imageUrl", label: "Image" },
  { name: "name", label: "Product Name" },
  { name: "category", label: "Category" },
  { name: "brand", label: "Brand" },
  { name: "stock", label: "stock" },
  { name: "price", label: "Price" },
  { name: "Action", label: "Action" },
]);
const itemperpage = ref(5);
const productStore = useProductStore();
const searchterm = ref("");

const Filterterm = ref("");
const filteroption = ref([
  { name: "", title: "All" },
  { name: "cloth", title: "cloth" },
  { name: "shoes", title: "shoes" },
  { name: "glasses", title: "glasses" },
  { name: "bags", title: "bags" },
]);

const fields = ["name", "category", "brand"];
const filteredData = useFilterCode(
  computed(() => productStore.productsdata),
  searchterm,
  fields
);

const paginationdata = usePagination(filteredData, itemperpage.value);

// console.log(item.id)
 function handleClick(id) {
 router.push({ name: "EditProduct", params: { id } });
}
async function handeldelete(id) {
  console.log("delete", id);
 await  productStore.deleteProduct(id);
   showtoast("Product removed successfully","rowOdd");

}

onMounted(() => {
  productStore.fetchProducts();
});

watch([searchterm, Filterterm], () => {
  productStore.fetchProducts({ category: Filterterm.value }).then(() => {
    paginationdata.page.value = 1;
  });
});
</script>

<template>
  <div class="text-center">
    <Templatepage
      :statusfetch="productStore.status"
      :length="productStore.dataLength"
      :title="'No Product found.'"
    >
      <template #partone>

        <Pagetitle title="Product Management" />
        
      </template>
      <template #parttwo>
        <div class="d-flex bg-success">
          <Filter :List="filteroption" v-model="Filterterm" />
          <Search v-model="searchterm" label="Search for products..." />
          <Primarybutton
            icon="mdi-plus"
            title="Add New Product"
            to="/AddProduct"
            @click="handleClickAddproduct"
          />
          <!-- <div class="text-primary font-weight-bold text-h6 cursor-default">
          <span >Total Orders: </span
          >
          {{ productStore.existingProduct }}
        </div> -->
        </div>
      </template>
      <template #partthree>
        <Table
          :columns="PoducrcolumnsName"
          :tableData="paginationdata.paginationitem.value"
          icon1="mdi-pencil-outline"
          titleicon1="Edit"
          icon2="mdi-trash-can-outline"
          titleicon2="Delete"
          @click="handleClick"
          @delete="handeldelete"
          nosearch="No product match your search"
          imgsearch="/no product.svg"
          :itemsPerPage="itemperpage"
          :page="paginationdata.page.value"
          modaltext="Are you sure you want to delete this product?"
          type="products"
        />
      </template>
      <template #partfour>
        
         
        <Paginationtable
          :totalpage="paginationdata.totalpage.value"
          v-model:page="paginationdata.page.value"
          :itemperpage="paginationdata.itemperpage"
        />
        
      </template>
    </Templatepage>
  </div>
</template>
