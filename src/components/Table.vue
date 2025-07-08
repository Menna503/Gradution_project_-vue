<script setup>
import { RouterLink } from "vue-router";
import Allordersnew from "./allordersnew.vue";
import { ref, defineProps, defineEmits } from "vue";
import {
  VDialog,
  VCard,
  VSpacer,
  VBtn,
  VIcon,
  VTooltip,
  VAvatar,
  VSelect,
} from "vuetify/components";

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
  modaltext: String,
  type: String, // "customer" or "orders"
});

const emit = defineEmits(["click", "delete", "status-update"]);
const dialog = ref(false);
const selectedItem = ref(null);

const orderStatusOptions = [
  { title: " Processing", value: "processing" },
  { title: "Shipped", value: "shipped" },
  { title: " Delivered", value: "delivered" },
];
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
            :key="col.name"
            class="text-center font-weight-semibold pa-0 px-4"
            style="font-size: 16px"
          >
            <!-- ✅ Order Status as Dropdown -->
            <template v-if="col.name === 'status' && type === 'orders'">
              <v-select
                v-model="item.status"
                :items="orderStatusOptions"
                item-title="title"
                item-value="value"
                variant="outlined"
                density="compact"
                hide-details
                hide-no-data
                style="width: 120px"
                @update:modelValue="$emit('status-update', item)"
              />
            </template>

            <!-- ✅ Customer Status as Colored Badge -->
            <template v-else-if="col.name === 'status'">
              <span
                class="d-inline-block pa-2 rounded-lg text-success"
                style="width: 80px"
                :class="{
                  'bg-error': ['Blocked', 'Cancelled'].includes(item.status),
                  'bg-lightGray': ['active', 'Delivered'].includes(item.status),
                  'bg-warning': ['vip', 'shipping'].includes(item.status),
                  'bg-blocked': ['inactive', 'pending'].includes(item.status),
                }"
              >
                {{ item[col.name] }}
              </span>
            </template>

            <!-- Auto index -->
            <template v-else-if="col.name === '_id'">
              {{ (page - 1) * itemsPerPage + (index + 1) }}
            </template>

            <!-- Order details link -->
            <template v-else-if="col.name === 'Order'">
              <RouterLink :to="`/OrderDetails/${item._id}`">
                <button>📦 Details</button>
              </RouterLink>
            </template>

            <!-- Popup for customer's orders -->
            <template v-else-if="col.name === 'Orders'">
              <Allordersnew :id="item._id" />
            </template>

            <!-- Price formatting -->
            <template
              v-else-if="col.name === 'Total Price' || col.name === 'price'"
            >
              {{ item[col.name] }}<span> EGP</span>
            </template>

            <!-- Image -->
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

            <!-- Category -->
            <template v-else-if="col.name === 'category'">
              {{ item[col.name]?.name }}
            </template>

            <!-- Action Buttons -->
            <template v-else-if="col.name === 'Action'">
              <div class="d-flex justify-center" style="gap: 16px">
                <v-tooltip>
                  <template #activator="{ props }">
                    <v-icon
                      v-bind="props"
                      v-if="icon1"
                      size="24"
                      :key="item._id"
                      @click="$emit('click', item._id)"
                      class="text-primary cursor-pointer"
                    >
                      {{ icon1 }}
                    </v-icon>
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
                          :key="item._id"
                          @click="selectedItem = item"
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
                      <v-btn
                        @click="
                          $emit('delete', selectedItem._id);
                          dialog = false;
                        "
                        >Agree</v-btn
                      >
                    </template>
                  </v-card>
                </v-dialog>
              </div>
            </template>

            <!-- Default Text -->
            <template v-else>
              {{ item[col.name] }}
            </template>
          </td>
        </tr>
      </template>

      <!-- No Data Fallback -->
      <template v-else>
        <tr>
          <td :colspan="columns.length" class="text-center pa-8 bg-success">
            <img :src="imgsearch" class="pt-10" style="width: 200px" />
            <v-item-title
              class="d-block text-primary font-weight-bold text-h5 pt-5"
            >
              {{ nosearch }}
            </v-item-title>
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<style scoped>
.custom-table {
  margin-top: 16px;
}
</style>
