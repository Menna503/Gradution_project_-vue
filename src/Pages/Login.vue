<template>
  <v-container fluid class="background_img d-flex justify-center align-center pa-0">
    <v-container class="text-center h-1/2 bg-white rounded-xl pa-10" style="width: 32%">
      <v-container class="d-flex flex-column justify-center align-center">
        <img :src="Logo" class="w-10 h-10 mb-4" alt="Company Logo" />
        <h1 class="mb-4 text-h6" style="color: #6A6A6A;">Login to your account</h1>
        <img :src="adminLogin" class="w-40 h-40" alt="Admin Login" />
      </v-container>

      <v-text-field
        v-model="Email"
        :rules="emailRules"
        variant="outlined"
        label="Email"
        required
      />

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :type="showPassword ? 'text' : 'password'"
        variant="outlined"
        label="Password"
        required
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"
      />

      <v-btn
        height="56"
        class="pa-5 text-white w-100 d-flex justify-center align-center"
        color="#0A2C47"
        @click="Login"
      >
        Log In
      </v-btn>

      <div class="pt-2" style="color: red;">{{ login_message || '\u00A0' }}</div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import adminLogin from '/images/admin_login.svg';
import Logo from '/images/logo.svg';
import { useRouter } from 'vue-router';
import { UserStore } from '../Store/UserStore'; // Ensure the correct path to the store

// Reactive variables for input fields and status messages
const Email = ref('');
const password = ref('');
const login_message = ref('');
const showPassword = ref(false); // New: Controls password visibility (show/hide)

// Router and store instances
const router = useRouter();
const userStore = UserStore();

// Validation rules for the email field
const emailRules = [
  v => !!v || 'Email is required',
  v => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v) || 'Invalid email format',
];

// Validation rules for the password field
const passwordRules = [
  v => !!v || 'Password is required',
];

// Login function
const Login = async () => {
  // Validate email and password using the defined rules
  const isEmailValid = emailRules.every(rule => rule(Email.value) === true);
  const isPasswordValid = passwordRules.every(rule => rule(password.value) === true);

  if (isEmailValid && isPasswordValid) {
    try {
      const token = await userStore.login({
        email: Email.value,
        password: password.value
      });
      console.log('Token:', token);
     router.replace('/Dashboard');  
    } catch (error) {
      console.error("Login error:", error); // Use console.error for errors
      login_message.value = "Invalid email or password"; // User-friendly error message
    }
  } else {
    console.log('Validation failed');
    login_message.value = 'Please check your inputs'; // Message to user about input errors
  }
};
</script>

<style scoped>
.background_img {
  background-image: url('images/log_In_img.svg'); /* Ensure the correct path to the background image */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
}
</style>