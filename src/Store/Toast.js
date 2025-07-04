import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usetoast = defineStore('toast', () => {
  const Toast = ref({
    show:false,
    message: '',
    color: "",
    
  });
  function showtoast( message, color) {
    Toast.value.show = true;
    Toast.value.message= message;
    Toast.value.color= color;
  }

  return { showtoast,Toast };
});
