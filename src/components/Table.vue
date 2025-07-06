<script setup>
// import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import { id } from "vuetify/locale";
import Allordersnew from "./allordersnew.vue";
import {
  VDialog,
  VCard,
  VCardActions,
  VSpacer,
  VBtn,
  VIcon,
  VTooltip,
} from "vuetify/components";

// import Modal from "./modal.vue";
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  columns: Array,
  tableData: Array,
  icon1: String,
  icon2: String,
  titleicon1: String,
  titleicon2: String,
  itemsPerPage: Number,
  page: Number,
  imgsearch: String,
  nosearch: String,
  titlenodata: String,
  modaltext: String,
});
const selectedItem = ref(null);

const selectrole = ["Pendding", "arrived", "canceled"];

const emit = defineEmits(["click", "delete"]);
const dialog = ref(false);

function clickitem(item) {
  emit("click", item._id);
}

function onAgree() {
  emit("delete", selectedItem.value._id);
  dialog.value = false;
}
</script>

<template>
  <v-table class="rounded-lg custom-table">
    <thead>
      <tr class="text-success bg-primary custom-row">
        <th
          v-for="col in columns"
          :key="col.name"
          class="text-center text-body-1 font-weight-semibold pa-0 px-4"
        >
          {{ col.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-if="tableData.length > 0">
        <tr
          v-for="(item, index) in tableData"
          :key="item._id"
          class="custom-row"
        >
          <td
            v-for="col in columns"
            :key="col.Id"
            class="text-center font-weight-semibold text-neutral cursor-default pa-0 px-4"
            style="font-size: 16px; margin-bottom: 20px"
          >
            <template v-if="col.name === 'status'">
              <span
                class="text-center d-inline-block pa-2 rounded-lg cursor-default"
                style="width: 80px"
                :class="{
                  'text-success bg-error  ':
                    item[col.name] === 'Blocked' ||
                    item[col.name] === 'Cancelled',
                  ' text-success bg-lightGray ':
                    item[col.name] === 'active' ||
                    item[col.name] === 'Delivered',
                  'text-success bg-warning  ':
                    item[col.name] === 'vip' || item[col.name] === 'shipping',
                  'text-success bg-blocked  ':
                    item[col.name] === 'inactive' ||
                    item[col.name] === 'pending',
                }"
              >
                {{ item[col.name] }}
              </span>
            </template>
            <template v-else-if="col.name === 'status'">
              <span
                :class="{
                  'text-primary': item[col.name] === 'inactive',
                  'bg-primary': item[col.name] === 'inactive',
                }"
              >
                {{ item[col.name] }}
              </span>
            </template>
            <template v-else-if="col.name === 'Set Status'">
              <div class="d-flex justify-center rounded-lg">
                <v-select
                  v-model="item.Role"
                  :items="selectrole"
                  variant="outlined"
                  hide-details
                  hide-no-data
                  single-line
                  color="#1E88E5"
                  class="role-autocomplete"
                  density="comfortable"
                ></v-select>
              </div>
            </template>
            <template v-else-if="col.name === '_id'">
              {{ (page - 1) * itemsPerPage + (index + 1) }}
            </template>
            <template v-else-if="col.name === 'Orders'">
              <Allordersnew :id="item._id" />
            </template>
            <template v-else-if="col.name === 'Order'">
              <RouterLink :to="`/OrderDetails/${item._id}`">
                <button>📦 Details</button>
              </RouterLink>
            </template>
            <template
              v-else-if="col.name === 'Total Price' || col.name === 'price'"
            >
              {{ item[col.name] }}<span> EGP</span>
            </template>
            <!--  -->
            <template v-else-if="col.name === 'imageUrl'">
              <v-avatar size="80" rounded="0">
                <img
                  :src="item.imageUrl"
                  style="
                    border-radius: 2px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  "
                  alt="image"
                />
              </v-avatar>
            </template>
            <!--  -->
            <template v-else-if="col.name === 'Action'">
              <div class="d-flex justify-center" style="gap: 16px">
                <v-tooltip>
                  <template #activator="{ props }">
                    <v-icon
                      v-bind="props"
                      v-if="icon1"
                      size="24"
                      :key="item.Id"
                      @click="clickitem(item)"
                      class="text-primary cursor-pointer"
                      >{{ icon1 }}</v-icon
                    >
                  </template>
                  {{ titleicon1 }}
                </v-tooltip>

                <v-dialog v-model="dialog" max-width="400" persistent>
                  <template #activator="{ props: activatorProps, on }">
                    <v-tooltip>
                      <template #activator="{ props: tooltipProps }">
                        <v-icon
                          v-if="icon2"
                          size="24"
                          :key="item.Id"
                          @click="selectedItem=item"
                          class="text-error cursor-pointer"
                          v-bind="{ ...activatorProps, ...tooltipProps }"
                          v-on="on"
                        >
                          {{ icon2 }}
                        </v-icon>
                      </template>
                      {{ titleicon2 }}
                    </v-tooltip>
                  </template>

                  <v-card :text="modaltext">
                    <template #actions>
                      <v-spacer />
                      <v-btn @click="dialog = false">Disagree</v-btn>
                      <v-btn @click="onAgree()">Agree</v-btn>
                    </template>
                  </v-card>
                </v-dialog>
              </div>
            </template>
            <template v-else-if="col.name === 'category'">
              {{ item[col.name].name }}
            </template>
            <template v-else>
              {{ item[col.name] }}
            </template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="columns.length" class="text-center pa-8 bg-success">
            <img :src="imgsearch" class="pt-10" style="width: 200px;" />
            <v-item-title
              class="d-block text-primary font-weight-bold text-h5 pt-5"
              >{{ nosearch }}</v-item-title
            >
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>

</style>
