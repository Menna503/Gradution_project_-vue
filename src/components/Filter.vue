<template>
  <div class="d-flex justify-start" style="z-index: 0">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props }">
        <div class="bg-success" v-bind="props">
          <v-icon size="32" color="primary">mdi-filter-variant</v-icon
          ><span class="font-weight-semibol text-h5 pl-1 text-primary"
            >Filter</span
          >
        </div>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in List"
          :key="i"
          :value="i"
          @click="onselect(item)"
          :active="modelValue === item.name"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup>
import { useProductStore } from "../Store/ProductStore";
const productStore = useProductStore();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  List: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});
async function onselect(item) {
  console.log(item.name);

  emit("update:modelValue", item.name);
}
</script>
