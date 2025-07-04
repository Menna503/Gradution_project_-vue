<template>
  <div
    ref="form"
    width="100%"
    class="text-start py-2 pl-5 pr-5 rounded-lg"
    style="border: solid 1px #80ccf9"
  >
    <v-card-text class="pa-0 d-flex flex-column">
      <h1 class="text-primary font-weight-regular mb-4" style="font-size: 24px">
        Product Images
      </h1>
      <div class="d-flex justify-space-between">
        <div class="d-flex" style="width: 100%; gap: 10px">
          <div
            class="add-image-box"
            v-for="(img, index) in images"
            :key="index"
          >
            <!-- Loading state -->
            <div v-if="Statuses[index] === 'Loading'" class="image-placeholder">
              <v-progress-circular indeterminate color="primary" />
            </div>

            <!-- Error state -->
            <div v-else-if="Statuses[index] === 'error'" class="image-placeholder">
              <v-icon
                color="error"
                size="36"
                @click="retryUploadHandler(index)"
                style="cursor: pointer"
              >
                mdi-reload
              </v-icon>
              <span>try again</span>
            </div>

            <!-- Display uploaded image -->
            <div v-else-if="Statuses[index] === 'Success'" class="image-placeholder">
              <v-img
                :src="img"
                alt="Selected Image"
                class="image-placeholder"
                cover
                height="200"
              />
              <v-icon
                color="primary"
                size="24"
                @click="deleteImageHandler(index)"
                style="position: absolute; top: 2px; right: 2px; cursor: pointer;"
              >
                mdi-close-circle
              </v-icon>
            </div>

            <!-- File input -->
            <v-file-input
              v-else
              accept="image/png, image/jpeg, image/bmp"
              :multiple="false"
              prepend-icon="mdi-plus"
              class="icon-only-file-input"
              hide-input
              variant="none"
              :clearable="false"
              hide-details
              :show-size="false"
              @change="(e) => onFileChange(e, index)"
            />
          </div>
        </div>
      </div>
    </v-card-text>
  </div>
</template>

<script setup>
import { toRaw, watch } from 'vue'
import { defineEmits } from 'vue'
import { useImageUploadStore } from '../Store/ImageUploadStore'

const store = useImageUploadStore()
const { images, Statuses, handleFileUpload, deleteimage, retryUpload } = store

const emit = defineEmits(['update:images'])

// كل ما تتغيّر مصفوفة الصور، ابعثها للأب
watch(images, (val) => {
  emit('update:images', [...val])
}, { deep: true })

const onFileChange = async (e, index) => {
  try {
    // التأكد من أنك تستدعي الدالة بشكل صحيح
    await handleFileUpload(e, index);

    // لا حاجة لاستخدام .value مع toRaw في هذه الحالة
    emit('update:images', [...images]); // نرسل الصور كما هي
  } catch (err) {
    console.error("Error during file upload:", err);
  }
};

const deleteImageHandler = (index) => {
  deleteimage(index)
  emit('update:images', [...images.value])
}

const retryUploadHandler = (index) => {
  retryUpload(index)
  emit('update:images', [...images.value])
}
</script>

<style scoped lang="scss">
.add-image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
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
</style>
