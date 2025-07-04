<template>
  <v-card-text class="pa-0">
    <div class="d-flex justify-end">
      <v-dialog
        v-model="dialog"
        max-width="700"
        @update:modelValue="onDialogToggle"
      >
        <template #activator="{ props }">
          <span
            v-bind="props"
            class="text-primary font-weight-meduim cursor-pointer text-center mx-auto"
            style="font-size: 16px"
          >
            📦 All orders
          </span>
        </template>

        <v-card class="text-start rounded-lg bg-white">
          <v-card-text>
            <div class="d-flex flex-column" style="gap: 6px">
              <div
                class="mt-2 d-flex justify-center align-center"
                style="gap: 16px"
              >
                <div
                  class="d-flex flex-column ml-6"
                  style="width: 90%; gap: 12px"
                >
                  <div
                    ref="form"
                    class="text-start rounded-lg d-flex justify-center"
                  >
                    <v-card-text
                      class="pa-0 d-flex flex-column"
                      style="gap: 10px; height: 440px; overflow-y: auto"
                    >
                      <div
                        class="d-flex justify-space-between mb-3"
                        style="gap: 30px"
                      >
                        <h1
                          class="text-primary font-weight-regular"
                          style="font-size: 32px"
                        >
                          Orders and Dates
                        </h1>
                      </div>

                      <div class="d-flex flex-column my-auto" style="gap: 10px;">
                        <template v-if="Customer.orders.length > 0">
                          <Order_ForAllOrder
                            v-for="order in Customer.orders"
                            :key="order._id"
                            :item="order"
                          />
                        </template>
                        <template v-else>
                          <div
                            class="d-flex flex-column justify-content-center align-items-center"
                          >
                          
                            <img
                              src="/no product.svg"
                              class="mx-auto"
                              width="50%"
                            />
                              <v-item-tittle
                              class="d-block text-primary font-weight-bold text-h5 pt-5 text-center"
                              style="cursor: default"
                            >
                              No orders found.
                            </v-item-tittle>
                          </div>
                        </template>
                      </div>
                    </v-card-text>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions
            style="display: flex; justify-content: space-between"
            class="mx-16"
          >
            <h1
              class="text-primary font-weight-regular"
              style="font-size: 20px"
            >
              <span
                class="text-primary font-weight-bold"
                style="font-size: 20px"
                >Total Orders :
              </span>
              {{ Customer?.orders?.length || 0 }} Orders
            </h1>
            <v-btn
              @click="dialog = false"
              variant="outlined"
              height="48"
              width="25%"
              class="text-h5 font-weight-semibold border-primary text-primary"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card-text>
</template>

<script setup>
import {
  VBtn,
  VCard,
  VCardText,
  VCardActions,
  VDialog,
  VDivider,
} from "vuetify/components";
import { onMounted, ref } from "vue";
import { useCustomerStore } from "../Store/CustomerStore";
import Order_ForAllOrder from "./Order_ForAllOrder.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const CustomerId = props.id;

const Customer = ref(null);
const Customerstore = useCustomerStore();

onMounted(async () => {
  const result = await Customerstore.fetchCustomerById(CustomerId);
  Customer.value = result;
  console.log(result);
});

const dialog = ref(false);

function onDialogToggle(val) {
  if (val) clearFields();
  dialog.value = val;
}

function clearFields() {
  // Add any field-resetting logic here if needed
}
</script>
