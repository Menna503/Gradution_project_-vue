<!-- Parent.vue -->
<script setup>
import Templatepage from "../components/Templatepage.vue";
import Paginationtable from "../components/Paginationtable.vue";
import Pagetitle from "../components/Pagetitle.vue";
import Primarybutton from "../components/Primarybutton.vue";
import Table from "../components/Table.vue";
import { computed, watch } from "vue";
// import templateeeror from "../components/Templateerror.vue";
import { useAdminStore } from "../Store/AdminStore";
import { usePagination } from "../main/Pagination";
import { ref, onBeforeMount, onMounted } from "vue";
import Addnewadmin from "./Addnewadmin.vue";
const admincolumnsName = ref([
  { name: "_id", label: "Id" },
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "role", label: "Role" },
  { name: "Action", label: "Action" },
]);
const adminStore = useAdminStore();

const datapagination = computed(() => adminStore.alladmins);

const paginationdata = usePagination(datapagination, 6);

onBeforeMount(() => {
  adminStore.fetchproduct();
});
function handleClick(id) {
  const admin = adminStore.alladmins.find((c) => c._id === id);
  if (!admin) return;
  adminStore.updateadminIdm(id, admin);
  adminStore.fetchproduct();
}
</script>

<template>
  <div class="text-center">
    <Templatepage
      :statusfetch="adminStore.status"
      :length="adminStore.datalength"
      :title="'No admin data found.'"
    >
      <template #partone>
        <Pagetitle title="Admins" />
      </template>
      <template #parttwo>
        <div class="d-flex justify-end bg-success">
          <Addnewadmin />
        </div>
      </template>
      <template #partthree>
        <Table
          :columns="admincolumnsName"
          :tableData="paginationdata.paginationitem.value"
          icon1="mdi-delete"
          titleicon1="Delete"
          @click="handleClick"
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
