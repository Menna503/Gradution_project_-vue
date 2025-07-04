<script setup>
import { ref } from 'vue';
import adminLogin from '/images/admin_login.svg';
import Logo from '/images/logo.svg';
import { useRouter } from 'vue-router';
import { UserStore } from '../Store/UserStore';

const Email = ref('');
const password = ref('');
const login_message = ref('');
const router = useRouter();
const userStore = UserStore();

// const Validation = (value, type) => {
//   if (!value) {
//     return 'This field is required';
//   } else if (type === 'email') {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailPattern.test(value)) {
//       console.log('Invalid email format');
//       login_message.value="Invalid email or password";
//       return 'Invalid email format';
//     }
//   }
//   return true;
// };

const emailRules = [
  v => !!v || 'Email is required',
  v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'Invalid email format',
];

const passwordRules = [
  v => !!v || 'Password is required',
];

const Login = async () => {
  // const old validation block
  // if(Validation(Email.value,'email')=== true && Validation(password.value,'password')=== true){
  //   try {
  //     const token = await userStore.login({
  //       email:Email.value,
  //       password :password.value
  //     })
  //     console.log('Token:', token);
  //     router.push('/Dashboard');
  //   } catch (error) {
  //     console.log("error",error);
  //     login_message.value="Invalid Email";
  //   }
  // } else {
  //   console.log('Validation failed')
  // }

  const emailValid = emailRules.every(rule => rule(Email.value) === true);
  const passwordValid = passwordRules.every(rule => rule(password.value) === true);

  if (emailValid && passwordValid) {
    try {
      const token = await userStore.login({
        email: Email.value,
        password: password.value
      });
      console.log('Token:', token);
      router.push('/Dashboard');
    } catch (error) {
      console.log("error", error);
      login_message.value = "Invalid email or password";
    }
  } else {
    console.log('Validation failed');
    login_message.value = 'Please check your inputs';
  }
};
</script>

<template>
  <v-container fluid class="background_img d-flex justify-center align-center pa-0">
    <v-container class="text-center h-1/2 bg-white rounded-xl pa-10" style="width: 32%">
      <v-container class="d-flex flex-column justify-center align-center">
        <img :src="Logo" class="w-10 h-10 mb-4" />
        <text-h1 class="mb-4 text-h6" style="color: #6A6A6A;">Login to your account</text-h1>
        <img :src="adminLogin" class="w-40 h-40" />
      </v-container>

      <!-- حقل الإيميل -->
      <v-text-field
        v-model="Email"
        :rules="emailRules"
        variant="outlined"
        label="Email"
        required
      />

      <!-- حقل الباسورد -->
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        type="password"
        variant="outlined"
        label="Password"
        required
      />

      <!-- زرار تسجيل الدخول -->
      <v-btn
        height="56"
        class="pa-5 text-white w-100 d-flex justify-center align-center"
        color="#0A2C47"
        @click="Login"
      >
        Log In
      </v-btn>

      <!-- رسالة الخطأ -->
      <div class="pt-2" style="color: red;">{{ login_message || '\u00A0' }}</div>
    </v-container>
  </v-container>
</template>

<style scoped>
.background_img {
  background-image: url('images/log_In_img.svg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}
</style>
