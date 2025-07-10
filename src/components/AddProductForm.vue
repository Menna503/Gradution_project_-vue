Sure, here is the complete code for your Vue.js component, incorporating the refined logic to ensure that sizes and quantities are correctly displayed and populated when you are in edit mode.

The most crucial change is within the `onMounted` hook, where `await nextTick()` is strategically placed after setting the `SelectedCategory`. This ensures that the `currentSizes` computed property has fully updated based on the product's category before the `selectedSizesWithQuantities` object is initialized and populated with the product's saved data.

```vue
<template>
  <v-form
    @submit.prevent="submitForm"
    class="py-6 d-flex bg-success"
    style="gap: 16px; padding: 0 88px"
  >
    <div class="d-flex flex-column" style="width: 50%; gap: 10px">
      <div
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <Pagetitle :title="titlepage" />
      </div>

      <div
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            General Information
          </h1>
          <label
            for="ProductName"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
            >Product Name</label
          >
          <v-text-field
            v-model="Product_Name"
            id="ProductName"
            :rules="[
              (v) => !!v || 'This field is required',
              (v) =>
                /^[A-Za-z\s&\-]+$/.test(v) ||
                'Only letters, spaces and hyphens allowed',
            ]"
            variant="outlined"
            placeholder="Enter product Name"
            class="mb-4"
            style="height: 56px"
          />
          <label
            for="Brand_Name"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
          >
            Brand Name
          </label>
          <v-select
            v-model="Brand_Name"
            :items="brandOptions"
            variant="outlined"
            placeholder="Select Brand"
            :rules="[(v) => !!v || 'This field is required']"
            class="mb-4"
            style="height: 56px"
          />

          <label
            for="colors"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
          >
            Product Color
          </label>
          <v-select
            v-model="colors"
            :items="[
              'Red',
              'Blue',
              'Green',
              'Yellow',
              'Black',
              'White',
              'Purple',
              'Pink',
              'Orange',
              'Brown',
              'Gray',
              'Cyan',
              'Magenta',
            ]"
            clearable
            variant="outlined"
            placeholder="Choose a color"
            :rules="[
              
              
            ]"
          />

          <label
            for="Product_Material"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
            >Product Material</label
          >
          <v-text-field
            v-model="Product_Material"
            id="Product_Material"
            :rules="[
             
              (v) =>
                /^[A-Za-z\s]+$/.test(v) ||
                'Only letters and spaces are allowed',
            ]"
            variant="outlined"
            placeholder="Enter Product Material"
            style="height: 56px"
            class="mb-4"
          />
        </v-card-text>
      </div>

      <div
        v-if="!isSupplementOrEquipmentCategorySelected"
        class="text-start py-4 pl-5 pr-5 rounded-lg d-flex bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column" style="gap: 20px">
          <div>
            <h1
              class="text-primary font-weight-regular mb-4"
              style="font-size: 24px"
            >
              Sizes and Quantities:
            </h1>
            <v-row>
              <v-col
                v-for="(size, idx) in currentSizes"
                :key="idx"
                cols="12"
                sm="6"
                md="4"
              >
                <div class="d-flex align-center" style="gap: 10px">
                  <v-checkbox
                    v-model="selectedSizesWithQuantities[size].selected"
                    :label="size"
                    density="compact"
                    hide-details
                  ></v-checkbox>
                  <v-text-field
                    v-model.number="selectedSizesWithQuantities[size].quantity"
                    type="number"
                    :disabled="!selectedSizesWithQuantities[size].selected"
                    label="Quantity"
                    variant="outlined"
                    density="compact"
                    min="0"
                    :rules="[
                      (v) =>
                        !selectedSizesWithQuantities[size].selected ||
                        (v !== null && v >= 0) ||
                        'Quantity must be a non-negative number',
                    ]"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="!isSupplementOrEquipmentCategorySelected"
            class="d-flex align-center"
            style="gap: 20px"
          >
            <h1
              class="text-primary font-weight-regular"
              style="font-size: 24px"
            >
              Gender:
            </h1>
            <v-item-group
              multiple
              selected-class="bg-primary"
              v-model="selectedGenders"
            >
              <v-item
                v-for="(g, idx) in genders"
                :key="idx"
                v-slot="{ selectedClass, toggle }"
              >
                <v-chip
                  :class="selectedClass"
                  @click="toggle"
                  variant="outlined"
                  rounded="lg"
                  :style="{
                    marginLeft: '5px',
                    color: '#0E4267',
                    fontWeight: '600',
                    border: Boolean(selectedClass)
                      ? 'none'
                      : '1px solid #C0C0C0',
                  }"
                >
                  {{ g }}
                </v-chip>
              </v-item>
            </v-item-group>
          </div>
        </v-card-text>
      </div>

      <div
        v-if="isSupplementOrEquipmentCategorySelected"
        class="text-start py-4 pl-5 pr-5 rounded-lg d-flex bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            Stock Quantity:
          </h1>
          <v-text-field
            v-model.number="Product_Stock"
            type="number"
            label="Stock"
            variant="outlined"
            min="0"
            :rules="[
              (v) =>
                (v !== null && v >= 0) || 'Stock must be a non-negative number',
              (v) => !!v || 'This field is required',
            ]"
          ></v-text-field>
        </v-card-text>
      </div>
    </div>

    <div class="d-flex flex-column" style="width: 50%; gap: 10px">
      <div
        class="text-start py-4 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            Product Image
          </h1>
          <div class="add-image-box">
            <div
              v-if="store.Statuses[0] === 'Loading'"
              class="image-placeholder"
            >
              <v-progress-circular indeterminate />
            </div>

            <div
              v-else-if="store.Statuses[0] === 'error'"
              class="image-placeholder"
            >
              <v-icon @click="retryUploadHandler(0)">mdi-reload</v-icon>
              <span>try again</span>
            </div>

            <div
              v-else-if="store.Statuses[0] === 'Success'"
              class="image-placeholder"
            >
              <v-img
                :src="store.images[0]"
                alt="Selected Image"
                cover
                width="100%"
                height="100%"
              />
              <v-icon @click="deleteImageHandler(0)" class="delete-btn">
                mdi-close-circle
              </v-icon>
            </div>

            <v-file-input
              v-else
              hide-input
              prepend-icon="mdi-plus"
              class="icon-only-file-input"
              @change="onFileChange($event, 0)"
            />
          </div>
        </v-card-text>
      </div>

      <div
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-2"
            style="font-size: 24px"
          >
            Category
          </h1>
          <V-Select
            v-model="SelectedCategory"
            :items="categories"
            item-title="name"
            item-value="_id"
            variant="outlined"
            placeholder="Choose a category"
            persistent-placeholder
            clearable
            style="width: 100%"
            class="pa-0"
            :disabled="mood === 'edit'"
          />
        </v-card-text>
      </div>

      <div
        v-if="isClothesCategorySelected"
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-2"
            style="font-size: 24px"
          >
            Subcategory
          </h1>
          <v-select
            v-model="SelectedSubcategory"
            :items="['Shirts', 'Pants']"
            variant="outlined"
            placeholder="Choose a subcategory"
            :rules="[
              (v) =>
                !isClothesCategorySelected ||
                !!v ||
                'This field is required for Clothes category',
            ]"
            persistent-placeholder
            clearable
            style="width: 100%"
            class="pa-0"
          />
        </v-card-text>
      </div>

      <div
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column mb-4">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            Pricing
          </h1>
          <div class="d-flex" style="gap: 20px">
            <div class="d-flex flex-column" style="width: 100%">
              <label class="font-weight-semibold text-neutral text-body-1 mb-2"
                >Product Price</label
              >
              <v-text-field
                v-model="Product_Price"
                variant="outlined"
                placeholder="Enter Product Price"
                suffix="$"
                persistent-suffix
                type="number"
                style="height: 56px"
                :rules="[(v) => !!v || 'This field is required']"
                required
              />
            </div>
          </div>
        </v-card-text>
      </div>

      <div
        class="d-flex mt-2"
        style="gap: 10px; justify-content: space-between"
      >
        <Secondarybutton
          title="Cancel"
          width="48%"
          height="56px"
          to="/product-management"
        />
        <Primarybutton
          from="myform"
          :title="buttontitle"
          width="48%"
          height="56px"
          :disabled="!isFormValid"
        />
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect, nextTick, watch } from "vue";
import { useImageUploadStore } from "../Store/ImageUploadStore.js";
import Pagetitle from "../components/Pagetitle.vue";
import { useProductStore } from "../Store/Productstore.js";
import { useRoute } from "vue-router";
import Secondarybutton from "../components/Secondarybutton.vue";
import Primarybutton from "../components/Primarybutton.vue";
import { useRouter } from "vue-router";
import { usetoast } from "../Store/Toast.js";
import axios from "axios";

// Available brand options for selection
const brandOptions = ["Nike", "Adidas", "Nileton", "Mesery", "Swanson","Solgar","PUMA","decathlon","PowerMax"];

// Available sizes for products
const clothingSizes = ["S", "M", "L", "XL", "XXL"];
const shoeSizes = ["3", "4", "5", "6", "7"];
// Available gender options
const genders = ["women", "men"];

// Reactive variable to store fetched categories
const categories = ref([]);
// Reactive variable for the currently selected category
const SelectedCategory = ref(null);
// Reactive variable for the selected subcategory (e.g., Shirts, Pants)
const SelectedSubcategory = ref(null);

// Stores the ID for the 'Clothes' category, fetched dynamically
const clothesCategoryId = ref(null);
// Stores the ID for the 'Supplement' category, fetched dynamically
const supplementCategoryId = ref(null);
// Stores the ID for the 'Equipment' category, fetched dynamically
const equipmentCategoryId = ref(null);
// Stores the ID for the 'Shoes' category, fetched dynamically
const shoesCategoryId = ref(null);

// Reactive variable for the total product stock (used for Supplement/Equipment)
const Product_Stock = ref(null);

// Reactive variable to store the range of selected sizes (e.g., ["S", "M", "L"] or ["3", "4", "5"])
const size_range = ref([]);

// On component mount, fetch categories from the API
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/categories");
    categories.value = response.data.data;

    // Find and store the IDs for specific categories for conditional rendering/logic
    const clothesCat = categories.value.find(cat => cat.name.toLowerCase() === 'clothes');
    if (clothesCat) {
      clothesCategoryId.value = clothesCat._id;
    }
    const supplementCat = categories.value.find(cat => cat.name.toLowerCase() === 'supplement');
    if (supplementCat) {
      supplementCategoryId.value = supplementCat._id;
    }
    const equipmentCat = categories.value.find(cat => cat.name.toLowerCase() === 'equipment');
    if (equipmentCat) {
      equipmentCategoryId.value = equipmentCat._id;
    }
    const shoesCat = categories.value.find(cat => cat.name.toLowerCase() === 'shoes');
    if (shoesCat) {
      shoesCategoryId.value = shoesCat._id;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

// Computed property to check if the 'Clothes' category is currently selected
const isClothesCategorySelected = computed(() => {
  return SelectedCategory.value === clothesCategoryId.value;
});

// Computed property to check if the 'Shoes' category is currently selected
const isShoesCategorySelected = computed(() => {
  return SelectedCategory.value === shoesCategoryId.value;
});

// Computed property to check if 'Supplement' or 'Equipment' category is currently selected
const isSupplementOrEquipmentCategorySelected = computed(() => {
  return (
    SelectedCategory.value === supplementCategoryId.value ||
    SelectedCategory.value === equipmentCategoryId.value
  );
});

// Computed property to determine which sizes to display based on category
const currentSizes = computed(() => {
  if (isShoesCategorySelected.value) {
    return shoeSizes;
  } else if (isClothesCategorySelected.value) {
    return clothingSizes;
  } else {
    // Default to clothing sizes if no specific category matches
    // This is important for initial setup or if category hasn't been chosen yet
    return clothingSizes;
  }
});

// Reactive variable to store selected sizes with their quantities.
const selectedSizesWithQuantities = ref({});

// Watcher to re-initialize selectedSizesWithQuantities when currentSizes changes
// This ensures the size options presented match the selected category
watch(currentSizes, (newSizes) => {
  const newSelectedSizes = {};
  newSizes.forEach(size => {
    // Keep existing quantity/selection if size remains in the new list, otherwise reset
    // This maintains selected sizes if switching between, say, Clothes and Shoes
    newSelectedSizes[size] = selectedSizesWithQuantities.value[size] || { size, quantity: 0, selected: false };
  });
  selectedSizesWithQuantities.value = newSelectedSizes;
}, { immediate: true }); // Run immediately on component mount to set up initial sizes

// Watch for changes in the selected category to adjust form fields
watch(SelectedCategory, async (newValue) => {
  // If 'Clothes' category is not selected, reset the subcategory field
  if (!isClothesCategorySelected.value) {
    SelectedSubcategory.value = null;
  }
  // If 'Supplement' or 'Equipment' category is selected, reset sizes and genders
  if (isSupplementOrEquipmentCategorySelected.value) {
    Object.values(selectedSizesWithQuantities.value).forEach(item => {
      item.selected = false;
      item.quantity = 0;
    });
    selectedGenders.value = [];
    size_range.value = []; // Clear size_range
  } else {
    // Reset Product_Stock if category is NOT Supplement/Equipment
    Product_Stock.value = null;
  }
  // No need to explicitly re-initialize selectedSizesWithQuantities here,
  // as the `currentSizes` watcher will handle it reactivey after `SelectedCategory` updates.
});


// Router instance for navigation
const router = useRouter();
// Reactive variables for product details
const Product_Name = ref("");
const Brand_Name = ref("");
const Product_Material = ref("");
const colors = ref([]);
const selectedGenders = ref([]);
const Product_Price = ref("");


// Pinia store for product management
const productStore = useProductStore();
// Vue Router route object to access route parameters
const route = useRoute();
// Stores initial product data when in edit mode
const initialData = ref({});
// Determines the form's mood: 'add' for new product, 'edit' for existing product
const mood = ref("add");
// Pinia store for toast notifications
const toast = usetoast();
const { showtoast } = toast;

// Computed property for the submit button's title based on the form mood
const buttontitle = computed(() =>
  mood.value === "edit" ? "Update changes" : "Add Product"
);
// Computed property for the page title based on the form mood
const titlepage = computed(() =>
  mood.value === "edit" ? "Edit Product" : "Add New Product"
);

// Pinia store for image upload handling
const store = useImageUploadStore();

// Array to manage image placeholders (currently 1 image)
const placeholders = Array.from({ length: 1 });

// Computed validation rules for form fields
const hasImage = computed(() => store.images.some((img) => img != null));
const nameValid = computed(
  () =>
    Product_Name.value.trim() !== "" &&
    /^[A-Za-z\s&\-]+$/.test(Product_Name.value)
);
const brandValid = computed(
  () =>
    Brand_Name.value.trim() !== "" && /^[A-Za-z\s&\-]+$/.test(Brand_Name.value)
);
const materialValid = computed(
  () =>
    Product_Material.value.trim() === "" || // Allow empty string
    /^[A-Za-z\s]+$/.test(Product_Material.value)
);
const colorsValid = computed(
  () => !colors.value || colors.value.length === 0 || /^[A-Za-z\s]+$/.test(colors.value)
);

// Sizes validation: only required if NOT Supplement/Equipment category
const sizesValid = computed(() => {
  return isSupplementOrEquipmentCategorySelected.value
    ? true // Not required if Supplement or Equipment
    : Object.values(selectedSizesWithQuantities.value).some(
        (item) => item.selected && item.quantity > 0
      );
});

// Genders validation: only required if NOT Supplement/Equipment category
const gendersValid = computed(() => {
  return isSupplementOrEquipmentCategorySelected.value
    ? true // Not required if Supplement or Equipment
    : selectedGenders.value.length > 0;
});

// Stock validation: only required if Supplement/Equipment category is selected
const stockValid = computed(() => {
  return isSupplementOrEquipmentCategorySelected.value
    ? (Product_Stock.value !== null && Product_Stock.value >= 0) // Required and must be non-negative
    : true; // Not required if not Supplement or Equipment
});

const categoryValid = computed(() => !!SelectedCategory.value);
const priceValid = computed(() => Product_Price.value !== "");

// Overall form validity, combining all individual validation rules
const isFormValid = computed(
  () =>
    nameValid.value &&
    brandValid.value &&
   // materialValid.value &&
    //colorsValid.value &&
    categoryValid.value &&
    priceValid.value &&
    hasImage.value &&
    // Subcategory is required only if 'Clothes' is selected
    (!isClothesCategorySelected.value || (isClothesCategorySelected.value && !!SelectedSubcategory.value)) &&
    // Sizes and Genders are required if NOT Supplement or Equipment, otherwise stock is required
    (isSupplementOrEquipmentCategorySelected.value ? stockValid.value : (sizesValid.value && gendersValid.value))
);

// WatchEffect to log form validity for debugging purposes
watchEffect(() => {
  console.log("Form validity:", isFormValid.value);
});

// On component mount, check if in edit mode and populate form fields
onMounted(async () => {
  const id = route.params.id;
  await productStore.fetchProducts(); // Ensure products are fetched, especially for `fetchProductById`

  if (id) {
    console.log(`Fetching product with ID: ${id}`);
    const prod = await productStore.fetchProductById(id);
    mood.value = "edit";
    initialData.value = prod; // Store original data for comparison

    Product_Name.value = prod.name;
    Brand_Name.value = prod.brand;
    Product_Material.value = prod.material;
    // Ensure colors is always an array
    colors.value = Array.isArray(prod.color) ? prod.color : (prod.color ? [prod.color] : []);

    // Set the category FIRST. This will trigger the `SelectedCategory` watcher.
    SelectedCategory.value = prod.category?._id || null;

    // VERY IMPORTANT: Wait for Vue to fully process the reactivity of SelectedCategory
    // and for `currentSizes` to update based on the correct category before proceeding.
    await nextTick();

    // Now, `currentSizes.value` will correctly reflect if it's clothing or shoes.
    // Proceed with populating sizes and quantities based on the product's category.
    if (isSupplementOrEquipmentCategorySelected.value) {
      // If Supplement or Equipment, clear sizes/genders and populate Product_Stock
      // The `currentSizes` watcher might have initialized, but we reset here
      // as stock_by_size is not relevant for this category.
      Object.values(selectedSizesWithQuantities.value).forEach(item => {
          item.selected = false;
          item.quantity = 0;
      });
      selectedGenders.value = [];
      Product_Stock.value = prod.stock || null; // Assuming 'stock' field holds the total quantity
      size_range.value = []; // Clear size_range
    } else {
      // For other categories (Clothes, Shoes), populate sizes and genders
      // Re-initialize `selectedSizesWithQuantities` based on `currentSizes` again,
      // ensuring we have all relevant sizes for the UI display, even if they weren't in `stock_by_size`.
      const tempSelectedSizes = {};
      currentSizes.value.forEach(size => {
          tempSelectedSizes[size] = { size, quantity: 0, selected: false };
      });
      selectedSizesWithQuantities.value = tempSelectedSizes; // Assign the new object

      // Now, populate with actual data from `prod.stock_by_size`
      if (prod.stock_by_size) {
          for (const size in prod.stock_by_size) {
              if (selectedSizesWithQuantities.value[size]) { // Only if the size exists in `currentSizes`
                  selectedSizesWithQuantities.value[size].selected = true;
                  selectedSizesWithQuantities.value[size].quantity = prod.stock_by_size[size];
              }
          }
      }

      selectedGenders.value = Array.isArray(prod.gender)
          ? prod.gender.map((g) => genders.indexOf(g))
          : [];
      Product_Stock.value = null; // Ensure stock is cleared if category is not Supplement/Equipment

      // Populate size_range based on existing product data
      if (prod.stock_by_size) {
        size_range.value = Object.keys(prod.stock_by_size).sort();
      } else if (prod.size_range && Array.isArray(prod.size_range)) {
        size_range.value = prod.size_range.sort();
      } else {
        size_range.value = [];
      }
    }

    // Set subcategory if 'Clothes' is selected and subCategory exists
    if (prod.category && prod.category.name && prod.category.name.toLowerCase() === 'clothes' && prod.subCategory) {
        SelectedSubcategory.value = prod.subCategory;
    } else {
        SelectedSubcategory.value = null; // Clear subcategory if not 'Clothes'
    }

    Product_Price.value = prod.price;

    // Set imageUrl in the store
    let imageUrlToPopulate = null;
    if (prod.imageUrl && typeof prod.imageUrl === 'string') {
        imageUrlToPopulate = prod.imageUrl;
    }

    // Since imageUrl is a single string, we only have one image in the store.images array
    // Set the first element to the imageUrl or null if not available
    store.images[0] = imageUrlToPopulate;
    store.Statuses[0] = imageUrlToPopulate ? "Success" : null;

  } else {
    // Reset form fields for 'add' mood (new product)
    Product_Name.value = "";
    Brand_Name.value = "";
    Product_Material.value = "";
    colors.value = [];
    selectedSizesWithQuantities.value = {}; // Reset to empty object
    currentSizes.value.forEach(size => { // Re-initialize based on default sizes
      selectedSizesWithQuantities.value[size] = { size, quantity: 0, selected: false };
    });
    selectedGenders.value = [];
    Product_Stock.value = null;
    SelectedCategory.value = null;
    SelectedSubcategory.value = null;
    Product_Price.value = "";
    size_range.value = []; // Reset size_range for new product

    store.images.splice(
      0,
      store.images.length,
      ...Array(placeholders.length).fill(null)
    );
    store.Statuses.splice(
      0,
      store.Statuses.length,
      ...Array(placeholders.length).fill(null)
    );
  }
});

// Handler for file input change events
function onFileChange(e, idx) {
  store.handleFileUpload(e, idx);
}
// Handler to delete an uploaded image
function deleteImageHandler(idx) {
  store.deleteimage(idx);
}
// Handler to retry an image upload
function retryUploadHandler(idx) {
  store.retryUpload(idx);
}

// Function to check if product data has changed for update operations
const hasproductchange = () => {
  let newPayloadSizes = {};
  let newPayloadGenders = [];
  let newPayloadStock = null;
  let newPayloadSizeRange = [];

  if (isSupplementOrEquipmentCategorySelected.value) {
    newPayloadStock = Product_Stock.value;
  } else {
    Object.values(selectedSizesWithQuantities.value)
      .filter((item) => item.selected) // Filter for selected sizes
      .forEach((item) => {
        newPayloadSizes[item.size] = item.quantity;
        newPayloadSizeRange.push(item.size); // Add selected size to size_range
      });
    newPayloadGenders = selectedGenders.value.map((i) => genders[i]);
  }

  const newpayload = {
    name: Product_Name.value,
    brand: Brand_Name.value,
    price: Number(Product_Price.value),
    color: colors.value,
    material: Product_Material.value,
    stock_by_size: newPayloadSizes,
    stock: newPayloadStock,
    category: SelectedCategory.value,
    gender: newPayloadGenders,
    imageUrl: store.images[0],
    subCategory: isClothesCategorySelected.value ? SelectedSubcategory.value : undefined,
    size_range: newPayloadSizeRange.sort(), // Ensure sorted for consistent comparison
  };
  console.log("New payload for comparison:", newpayload);
  const oldpayload = initialData.value;

  let oldPayloadSizesFormatted;
  if (oldpayload.stock_by_size instanceof Map) {
    oldPayloadSizesFormatted = Object.fromEntries(oldpayload.stock_by_size);
  } else if (typeof oldpayload.stock_by_size === 'object' && oldpayload.stock_by_size !== null) {
    oldPayloadSizesFormatted = oldpayload.stock_by_size;
  } else {
    oldPayloadSizesFormatted = {};
  }

  let oldPayloadSizeRange = Array.isArray(oldpayload.size_range) ? oldpayload.size_range.sort() : [];
  if (!oldPayloadSizeRange.length && oldpayload.stock_by_size) {
    oldPayloadSizeRange = Object.keys(oldpayload.stock_by_size).sort();
  }


  const oldFormattedPayload = {
    name: oldpayload.name,
    brand: oldpayload.brand,
    price: oldpayload.price,
    color: oldpayload.color,
    material: oldpayload.material,
    stock_by_size: oldPayloadSizesFormatted,
    stock: oldpayload.stock,
    category: oldpayload.category?._id,
    gender: oldpayload.gender,
    imageUrl: oldpayload.imageUrl,
    subCategory: oldpayload.subCategory,
    size_range: oldPayloadSizeRange,
  };

  console.log("Old payload for comparison:", oldFormattedPayload);

  // Perform a deep comparison of the old and new payloads
  return JSON.stringify(oldFormattedPayload) !== JSON.stringify(newpayload);
};

// Handle form submission (add or update product)
async function submitForm() {
  // Validate the form before submission
  if (!isFormValid.value) {
    showtoast("Please fill all required fields correctly!", "rowEven");
    return;
  }

  let stockMap = {}; // For size-based stock
  let payloadGenders = [];
  let totalStock = null; // For overall product stock (Supplement/Equipment)
  let payloadSizeRange = []; // For size_range

  // Prepare data based on the selected category
  if (isSupplementOrEquipmentCategorySelected.value) {
    totalStock = Product_Stock.value;
    payloadSizeRange = []; // size_range is not applicable for supplements/equipment
  } else {
    // For other categories, collect selected sizes and quantities
    Object.values(selectedSizesWithQuantities.value) // iterate over values of the object
      .filter((item) => item.selected) // Only include selected sizes
      .forEach((item) => {
        stockMap[item.size] = item.quantity;
        payloadSizeRange.push(item.size); // Add selected size to size_range
      });
    // Collect selected genders
    payloadGenders = selectedGenders.value.map((i) => genders[i]);
  }

  // Construct the base payload
  const payload = {
    name: Product_Name.value,
    brand: Brand_Name.value,
    price: Number(Product_Price.value),
    color: colors.value,
    material: Product_Material.value,
    category:
      typeof SelectedCategory.value === "object" // Handle if category object is passed instead of just ID
        ? SelectedCategory.value._id
        : SelectedCategory.value,
    imageUrl: store.images[0], // Use the single image string directly
    size_range: payloadSizeRange, // Add the size_range here
  };

  // Conditionally add stock_by_size, stock, and gender to payload based on category
  if (isSupplementOrEquipmentCategorySelected.value) {
    payload.stock = totalStock; // Add single stock for Supplement/Equipment
    delete payload.stock_by_size; // Ensure stock_by_size is not sent
    delete payload.gender; // Ensure gender is not sent
  } else {
    payload.stock_by_size = stockMap; // Add size-based stock for other categories
    payload.gender = payloadGenders;
    delete payload.stock; // Ensure single stock is not sent
  }

  // Add subCategory to payload if 'Clothes' is selected, otherwise delete it
  if (isClothesCategorySelected.value) {
    payload.subCategory = SelectedSubcategory.value;
  } else {
    delete payload.subCategory;
  }

  console.log("Submitting payload:", payload);

  try {
    if (mood.value === "edit") {
      // If in edit mode, check for changes before updating
      if (!hasproductchange()) {
        console.log("No data change to update.");
        showtoast("No data change to update", "lightGray");
        return;
      }

      await productStore.updateProduct(route.params.id, payload);
      showtoast("Product updated successfully!", "rowOdd");

      console.log("Product data updated successfully.");

      productStore.fetchProducts(); // Refresh product list
      router.push("/product-management"); // Redirect to product management page
    } else {
      // If in add mode, add a new product
      await productStore.addProduct(payload);
      showtoast("Product added successfully!", "rowOdd");
      router.push("/product-management"); // Redirect to product management page
      productStore.fetchProducts(); // Refresh product list

      console.log("New product added successfully!");
    }
    console.log("All data handling complete.");

    // Reset form fields after successful submission
    Product_Name.value = "";
    Brand_Name.value = "";
    Product_Material.value = "";
    colors.value = [];
    selectedSizesWithQuantities.value = {}; // Reset to empty object
    currentSizes.value.forEach(size => { // Re-initialize based on current category's sizes
      selectedSizesWithQuantities.value[size] = { size, quantity: 0, selected: false };
    });
    selectedGenders.value = [];
    Product_Stock.value = null;
    SelectedCategory.value = null;
    SelectedSubcategory.value = null;
    Product_Price.value = "";
    size_range.value = []; // Reset size_range
    store.images.splice(0); // Clear uploaded images
    store.Statuses.splice(0); // Clear image upload statuses
  } catch (error) {
    console.error("Error submitting form:", error);
    showtoast("Error submitting product!", "rowEven");
  }
}
</script>

<style scoped lang="scss">
.add-image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  cursor: pointer;
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;

  position: relative;
}
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon-only-file-input {
  width: 100%;
  height: 100%;
}
.icon-only-file-input .v-input__control,
.icon-only-file-input .v-input__slot {
  justify-content: center;
  padding: 0;
}
.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 10;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 2px;
}
</style>
