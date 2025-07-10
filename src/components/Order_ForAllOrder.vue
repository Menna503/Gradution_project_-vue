<script setup>

const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="rounded-lg pa-0" style="width: 100%; border: 1px solid #80ccf9">
    <div class="d-flex justify-space-between my-3 px-5">
      <h6 class="text-primary font-weight-regular" style="font-size: 20px">
        Date: {{ new Date(item.createdAt).toLocaleDateString() }}
      </h6>

      <h6 class="text-primary font-weight-regular" style="font-size: 20px">
        {{ item.items?.length }} Items
      </h6>
      <h6 class="text-primary font-weight-regular" style="font-size: 20px">
        Total Price :{{ item.totalPriceOrder }} $
      </h6>
    </div>

    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="productItem in item.items"
        :key="productItem._id"
      >
        <div
          class="rounded-lg pa-3 d-flex flex-column justify-center align-center mx-4 bg-success"
          style="gap: 8px; width: 260px"
        >
          <span style="font-weight: 400; font-size: 18px; color: #333333">
            {{ productItem.product?.name || "No product name" }}
          </span>

          
          <v-img
            v-if="productItem.product?.imageUrl"
            :src="productItem.product?.imageUrl"
            alt="Product Image"
            class="image-placeholder"
            style="border-radius: 8px"
            cover
            height="150"
            width="260"
          />

          
          <div
            v-else
            style="
              height: 150px;
              width: 260px;
              background: #eee;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 8px;
            "
          >
            <span style="color: #888">No Image</span>
          </div>

          <div class="d-flex" style="gap: 4px">
            <v-chip
              v-if="productItem.size"
              variant="outlined"
              class="pa-3 bg-white"
              style="border: 1px solid #c0c0c0"
            >
              {{ productItem.size }}
            </v-chip>
            <v-chip
              v-if="
                productItem.product?.color &&
                productItem.product.color.length > 0
              "
              variant="outlined"
              class="pa-3 bg-white"
              style="border: 1px solid #c0c0c0"
            >
              {{ productItem.product?.color[0] }}
            </v-chip>
            <v-chip
              variant="outlined"
              class="pa-3 bg-white"
              style="border: 1px solid #c0c0c0"
            >
              {{ productItem.quantity }}
            </v-chip>
            <v-chip
              variant="outlined"
              class="pa-3 bg-white"
              style="border: 1px solid #c0c0c0"
            >
              {{ productItem.totalPriceItems }} $
            </v-chip>
          </div>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>
