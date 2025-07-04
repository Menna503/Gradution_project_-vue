<script setup>
import { ref, onMounted } from 'vue';
import { UserStore } from '../Store/UserStore';
import Primarybutton from '../components/Primarybutton.vue';

const userstore = UserStore();

const firstName = ref('');
const lastName = ref('');
const role = ref('');
const email = ref('');

onMounted(() => {
  const user = userstore.logedUser;
  console.log('User:', user);

  if (user) {
    firstName.value = user.firstName || '';
    lastName.value = user.lastName || '';
    role.value = user.role || '';
    email.value = user.email || '';
  }
});
</script>

<template>
  <v-form class="d-flex flex-column  " style="gap:24px;"> 
    <label for="firstname" class="font-weight-semibold text-neutral text-body-1">First Name</label>
    <v-text-field
      id="firstname"
      style="height: 56px; width: 400px;"
      v-model="firstName"
      :rules="[() => !!firstName || 'This field is required']"
      variant="outlined"
      placeholder="Enter Your First Name"
      required
    disabled
    />

    <label for="lastName" class="font-weight-semibold text-neutral text-body-1">Last Name</label>
    <v-text-field
      id="lastName"
      style="height: 56px; width: 400px;"
      v-model="lastName"
      :rules="[() => !!lastName || 'This field is required']"
      variant="outlined"
      placeholder="Enter Your Last Name"
      required
      disabled
    />

    <label for="role" class="font-weight-semibold text-neutral text-body-1">Role</label>
    <v-text-field
      id="role"
      style="height: 56px; width: 400px;"
      v-model="role"
      :rules="[() => !!role || 'This field is required']"
      variant="outlined"
      placeholder="Enter Your Phone"
      disabled
    />

    <label for="Email" class="font-weight-semibold text-neutral text-body-1">Email</label>
    <v-text-field
      id="email"
      style="height: 56px; width: 400px;"
      v-model="email"
      variant="outlined"
      placeholder="Enter Your Email"
      disabled
    />
  </v-form>
</template>

<style scoped>
label {
  margin-bottom: 0px;
}
</style>
