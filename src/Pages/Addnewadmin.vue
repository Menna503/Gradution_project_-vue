<template>
  <v-card-text class="pa-0">
    <div class="mt-auto d-flex justify-end">
      <v-dialog
        v-model="dialog"
        max-width="600"
        @update:modelValue="onDialogToggle"
      >
        <template #activator="{ on }">
          <v-btn
            v-on="on"
            @click="dialog = true"
            variant="elevated"
            color="primary"
            height="48"
            class="rounded-md px-6 text-h6"
          >
            <v-icon size="32" class="mr-2">mdi-plus</v-icon>
            Add New Admin
          </v-btn>
        </template>

        <v-card
          class="text-start py-2 px-5 rounded-lg bg-white"
          style="border: 1px solid #80ccf9"
        >
          <v-card-title>
            <v-icon left size="32" color="primary">mdi-account</v-icon>
            <v-subtitte
              class="text-primary font-weight-regular mb-0"
              style="font-size: 24px"
            >
              Add New Admin
            </v-subtitte>
          </v-card-title>

          <v-card-text>
            <div class="d-flex flex-column" style="gap: 6px">
              <div>
                <label
                  for="firstName"
                  class="font-weight-semibold text-neutral text-body-1"
                >
                  First Name
                </label>
                <v-text-field
                  v-model="firstName"
                  id="firstName"
                  class="mt-1"
                  :rules="[
                    (v) => !!v || 'First Name is required',
                    (v) =>
                      /^[A-Za-z\\s]+$/.test(v) ||
                      'Only letters and spaces allowed',
                  ]"
                  variant="outlined"
                  placeholder="Enter First Name"
                />
              </div>

              <div>
                <label
                  for="lastName"
                  class="font-weight-semibold text-neutral text-body-1"
                >
                  Last Name
                </label>
                <v-text-field
                  v-model="lastName"
                  id="lastName"
                  class="mt-1"
                  :rules="[
                    (v) => !!v || 'Last Name is required',
                    (v) =>
                      /^[A-Za-z\\s]+$/.test(v) ||
                      'Only letters and spaces allowed',
                  ]"
                  variant="outlined"
                  placeholder="Enter Last Name"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="font-weight-semibold text-neutral text-body-1"
                >
                  Email
                </label>
                <v-text-field
                  v-model="emailadmin"
                  id="email"
                  type="email"
                  class="mt-1"
                  :rules="[
                    (v) => !!v || 'Email is required',
                    (v) =>
                      /^[A-Za-z0-9._%+-]+@gmail\.com$/.test(v) ||
                      'Only Gmail addresses allowed',
                  ]"
                  variant="outlined"
                  placeholder="Enter Email"
                />
              </div>

              <div>
                <label
                  for="password"
                  class="font-weight-semibold text-neutral text-body-1"
                >
                  Password
                </label>
                <v-text-field
                  v-model="password"
                  id="password"
                  type="password"
                  class="mt-1"
                  :rules="[(v) => !!v || 'Password is required']"
                  variant="outlined"
                  placeholder="Enter Password"
                />
              </div>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-btn
              @click="dialog = false"
              variant="outlined"
              height="48"
              width="35%"
              class="d-flex justify-center align-center text-h5 font-weight-semibold border-primary text-primary"
            >
              Close
            </v-btn>
            <v-btn
              variant="elevated"
              color="primary"
              @click="saveProfile"
              height="48"
              width="35%"
              class="d-flex justify-center align-center text-h6 font-weight-semibold text-success"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card-text>
</template>
<script setup>
const emit = defineEmits(["admin-added"]);
import { ref, watch } from "vue";
import {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCardActions,
  VDialog,
  VIcon,
  VDivider,
  VTextField,
} from "vuetify/components";
import { useAdminStore } from "../Store/AdminStore";
const AdminStore = useAdminStore();

const dialog = ref(false);
const firstName = ref("");
const lastName = ref("");
const emailadmin = ref("");
const password = ref("");
const role = ref("admin");


function clearFields() {
  firstName.value = "";
  lastName.value = "";
  emailadmin.value = "";
  password.value = "";
}

function onDialogToggle(val) {
  if (val) clearFields();
  dialog.value = val;
}

async function saveProfile() {
  const payload = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: emailadmin.value,
    password: password.value,
    role: role.value,
  };

  try {
    await AdminStore.addadminIdm(payload); 
    dialog.value = false;
    clearFields();
    emit("admin-added");
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
}


</script>
