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

      <!-- General Information -->
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
          <!-- Product Name -->
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
          <!-- Brand Name -->
          <label
            for="Brand_Name"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
            >Brand Name</label
          >
          <v-text-field
            v-model="Brand_Name"
            id="Brand_Name"
            :rules="[
              (v) => !!v || 'This field is required',
              (v) =>
                /^[A-Za-z\s&\-]+$/.test(v) ||
                'Only letters and spaces are allowed',
            ]"
            variant="outlined"
            placeholder="Enter Brand Name"
            class="mb-4"
            style="height: 56px"
          />
          <!-- Colors -->
          <label
            for="colors"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
            >Product Color</label
          >
          <VCombobox
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
            multiple
            chips
            clearable
            hide-selected
            solo
            placeholder="Choose a color"
            :rules="[
              () => colors.length > 0 || 'This field is required',
              (v) =>
                v.every((c) => /^[A-Za-z\s]+$/.test(c)) ||
                'Only letters and spaces are allowed',
            ]"
            :menu-props="{ maxHeight: '400' }"
            variant="outlined"
          />
          <!-- Material -->
          <label
            for="Product_Material"
            class="font-weight-semibold text-neutral text-body-1 mb-2"
            >Product Material</label
          >
          <v-text-field
            v-model="Product_Material"
            id="Product_Material"
            :rules="[
              (v) => !!v || 'This field is required',
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

      <!-- Sizes & Genders -->
      <div
        class="text-start py-4 pl-5 pr-5 rounded-lg d-flex bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex align-center" style="gap: 40px">
          <!-- Sizes -->
          <div class="d-flex align-center" style="gap: 20px">
            <h1
              class="text-primary font-weight-regular"
              style="font-size: 24px"
            >
              Sizes:
            </h1>
            <v-item-group
              multiple
              selected-class="bg-primary"
              v-model="selectedSizes"
            >
              <v-item
                v-for="(size, idx) in sizes"
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
                  {{ size }}
                </v-chip>
              </v-item>
            </v-item-group>
          </div>
          <!-- Genders -->
          <div class="d-flex align-center" style="gap: 20px">
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
    </div>

    <div class="d-flex flex-column" style="width: 50%; gap: 10px">
      <!-- Product Images -->
      <div
        class="text-start py-4 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            Product Images
          </h1>
          <div class="d-flex" style="gap: 10px">
            <div
              v-for="(_, index) in placeholders"
              :key="index"
              class="add-image-box"
            >
              <!-- loading -->
              <div
                v-if="store.Statuses[index] === 'Loading'"
                class="image-placeholder"
              >
                <v-progress-circular indeterminate />
              </div>

              <!-- error -->
              <div
                v-else-if="store.Statuses[index] === 'error'"
                class="image-placeholder"
              >
                <v-icon @click="retryUploadHandler(index)">mdi-reload</v-icon>
                <span>try again</span>
              </div>

              <!-- success -->
              <div
                v-else-if="store.Statuses[index] === 'Success'"
                class="image-placeholder"
              >
                <v-img
                  :src="store.images[index]"
                  alt="Selected Image"
                  cover
                  width="100%"
                  height="100%"
                />
                <v-icon @click="deleteImageHandler(index)" class="delete-btn">
                  mdi-close-circle
                </v-icon>
              </div>

              <!-- default (idle) -->
              <v-file-input
                v-else
                hide-input
                prepend-icon="mdi-plus"
                class="icon-only-file-input"
                @change="onFileChange($event, index)"
              />
            </div>
          </div>
        </v-card-text>
      </div>

      <!-- Category -->
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
          />
        </v-card-text>
      </div>

      <!-- Pricing and Stock -->
      <div
        class="text-start py-2 pl-5 pr-5 rounded-lg bg-white"
        style="border: solid 1px #80ccf9"
      >
        <v-card-text class="pa-0 d-flex flex-column mb-4">
          <h1
            class="text-primary font-weight-regular mb-4"
            style="font-size: 24px"
          >
            Pricing and Stock
          </h1>
          <div class="d-flex" style="gap: 20px">
            <div class="d-flex flex-column" style="width: 50%">
              <label class="font-weight-semibold text-neutral text-body-1 mb-2"
                >Product Price</label
              >
              <v-text-field
                v-model="Product_Price"
                variant="outlined"
                placeholder="Enter Product Price"
                suffix="EGP"
                persistent-suffix
                type="number"
                style="height: 56px"
                :rules="[(v) => !!v || 'This field is required']"
                required
              />
            </div>
            <div class="d-flex flex-column" style="width: 50%">
              <label class="font-weight-semibold text-neutral text-body-1 mb-2"
                >Stock</label
              >
              <v-text-field
                v-model="Stock"
                variant="outlined"
                suffix="Items"
                persistent-suffix
                type="number"
                placeholder="Enter the number of items"
                style="height: 56px"
                :rules="[(v) => !!v || 'This field is required']"
                required
              />
            </div>
          </div>
        </v-card-text>
      </div>

      <!-- Buttons -->
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
import { ref, computed, onMounted, watchEffect, nextTick } from "vue";
import { useImageUploadStore } from "../Store/ImageUploadStore.js";
import Pagetitle from "../components/Pagetitle.vue";
import { useProductStore } from "../Store/Productstore.js";
import { useRoute } from "vue-router";
import Secondarybutton from "../components/Secondarybutton.vue";
import Primarybutton from "../components/Primarybutton.vue";
import { useRouter } from "vue-router";
import { usetoast } from "../Store/Toast.js";

const sizes = ["S", "M", "L", "XL", "XXL"];
const genders = ["women", "men"];

const categories = ref([
  { _id: "64f9a4aebc5f3a4b8a12d345", name: "clothes" },
  { _id: "64f9a4aebc5f3a4b8a12d346", name: "shoes" },
  { _id: "64f9a4aebc5f3a4b8a12d347", name: "supplement" },
  { _id: "64f9a4aebc5f3a4b8a12d348", name: "equipment" },
]);

const SelectedCategory = ref(null);

const router = useRouter();
const Product_Name = ref("");
const Brand_Name = ref("");
const Product_Material = ref("");
const colors = ref([]);
const selectedSizes = ref([]);
const selectedGenders = ref([]);
const Product_Price = ref("");
const Stock = ref("");
const productStore = useProductStore();
const route = useRoute();
const initialData = ref({});
const mood = ref("add");
const toast = usetoast();
const { showtoast } = toast;
//  change name of button
const buttontitle = computed(() =>
  mood.value === "edit" ? "Update changes" : "Add Product"
);
//change name of page title
const titlepage = computed(() =>
  mood.value === "edit" ? "Edit Product" : "Add New Product"
);

// const backToProducts =()=>{

// }

const store = useImageUploadStore();

//  number of square photo place
const placeholders = Array.from({ length: 4 });

// computed validations
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
    Product_Material.value.trim() !== "" &&
    /^[A-Za-z\s]+$/.test(Product_Material.value)
);
const colorsValid = computed(
  () =>
    colors.value.length > 0 &&
    colors.value.every((c) => /^[A-Za-z\s]+$/.test(c))
);
const sizesValid = computed(() => selectedSizes.value.length > 0);
const gendersValid = computed(() => selectedGenders.value.length > 0);
const categoryValid = computed(() => !!SelectedCategory.value);
const priceValid = computed(() => Product_Price.value !== "");
const stockValid = computed(() => Stock.value !== "");

//return true false depend on validation
const isFormValid = computed(
  () =>
    nameValid.value &&
    brandValid.value &&
    materialValid.value &&
    colorsValid.value &&
    sizesValid.value &&
    gendersValid.value &&
    categoryValid.value &&
    priceValid.value &&
    stockValid.value &&
    hasImage.value
);

watchEffect(() => {
  console.log("Form validity:", isFormValid.value);
});

// fetch product for edit
onMounted(async () => {
  const id = route.params.id;
  productStore.fetchProducts();

  if (id) {
    console.log(id);
    const prod = await productStore.fetchProductById(id);
    mood.value = "edit";
    initialData.value = prod;

    Product_Name.value = prod.name;
    Brand_Name.value = prod.brand;
    Product_Material.value = prod.material;
    colors.value = Array.isArray(prod.color) ? prod.color : [];
   selectedSizes.value = Array.isArray(prod.size_range)
  ? prod.size_range.map((s) => sizes.indexOf(s))
  : [];
   selectedGenders.value = Array.isArray(prod.gender)
  ? prod.gender.map((g) => genders.indexOf(g))
  : [];

    SelectedCategory.value = prod.category?._id || null;

    Product_Price.value = prod.price;
    Stock.value = prod.stock;

   
      const urls = Array.isArray(prod.imageUrl)
  ? prod.imageUrl.map((x) => (typeof x === "string" ? x : x.url))
  : [];
    const fullImages = [...urls];
    while (fullImages.length < placeholders.length) fullImages.push(null);
    store.images.splice(0, placeholders.length, ...fullImages);

    const fullStatuses = urls.map(() => "Success");
    while (fullStatuses.length < placeholders.length) fullStatuses.push(null);
    store.Statuses.splice(0, placeholders.length, ...fullStatuses);
  } else {
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
// handlers
function onFileChange(e, idx) {
  store.handleFileUpload(e, idx);
}

function deleteImageHandler(idx) {
  store.deleteimage(idx);
}
function retryUploadHandler(idx) {
  store.retryUpload(idx);
}
const hasproductchange = () => {
  const newpayload = {
    name: Product_Name.value,
    brand: Brand_Name.value,
    price: Number(Product_Price.value),
    color: [...colors.value],
    material: Product_Material.value,
    stock: Number(Stock.value),
    sizeRange: selectedSizes.value.map((i) => sizes[i]),
    category: SelectedCategory.value,
    gender: selectedGenders.value.map((i) => genders[i]),
    images: store.images.filter((img) => img != null),
  };
  console.log(newpayload);
  const oldpayload = initialData.value;

  return (
    JSON.stringify({
      name: oldpayload.name,
      brand: oldpayload.brand,
      price: oldpayload.price,
      color: oldpayload.color,
      material: oldpayload.material,
      stock: oldpayload.stock,
      sizeRange: oldpayload.sizeRange,
       category: oldpayload.category?._id,
      gender: oldpayload.gender,
      images: oldpayload.images?.map((x) =>
        typeof x === "string" ? x : x.url
      ),
    }) !== JSON.stringify(newpayload)
  );
};

async function submitForm() {
  if (!isFormValid.value) return;

  const payload = {
    name: Product_Name.value,
    brand: Brand_Name.value,
    price: Number(Product_Price.value),
    color: [...colors.value],
    material: Product_Material.value,
    stock: Number(Stock.value),
    size_range: selectedSizes.value.map((i) => sizes[i]),
    category:
      typeof SelectedCategory.value === "object"
        ? SelectedCategory.value._id
        : SelectedCategory.value,
    gender: selectedGenders.value.map((i) => genders[i]),
    imageUrl: store.images
      .filter((img) => img != null)
      .map((img) => (typeof img === "string" ? img : img.url)),
  };

  console.log(payload);

  try {
    if (mood.value === "edit") {
      if (!hasproductchange()) {
        console.log("no data change to update");
        showtoast("No data change to update", "lightGray");

        return;
      }

      await productStore.updateProduct(route.params.id, payload);
      showtoast("Product updated successfully!", "rowOdd");

      console.log("updated data sucessfully");

      productStore.fetchProducts();
      router.push("/product-management");
    } else {
      await productStore.addProduct(payload);
      showtoast("Product added successfully!", "rowOdd");
      router.push("/product-management");
      productStore.fetchProducts();

      console.log("here ana ");
    }
    console.log("all data get");

    Product_Name.value = "";
    Brand_Name.value = "";
    Product_Material.value = "";
    colors.value = [];
    selectedSizes.value = [];
    selectedGenders.value = [];
    SelectedCategory.value = null;
    Product_Price.value = "";
    Stock.value = "";
    store.images.splice(0);
    store.Statuses.splice(0);
  } catch (error) {
    console.error(error);
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
