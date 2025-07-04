import {defineStore}from 'pinia';
import axios from "axios";
import { ref } from "vue";

export const useImageUploadStore = defineStore('imageUpload', ()=>{

    const images = ref([null, null, null, null]);
    const Statuses = ref(["idle", "idle", "idle", "idle"]);

  const deleteimage= (index) => {
    images.value[index] = null;
    Statuses.value[index] = "idle"; // Reset status to idle when image is deleted
  }
const retryUpload = (index) => {
  images.value[index] = null;
  Statuses.value[index] = "idle";    // بدل "Loading"
};
    const handleFileUpload = async (event, index) => {
      const file = event.target.files[0];
    
      if (!file) return;
    
      const formdata = new FormData();
    
      formdata.append("file", file);
      formdata.append("upload_preset", "my_preset");
      formdata.append("cloud_name", "dkpw1hn3b");
      Statuses.value[index] = "Loading";
      // console.log(Statuses.value[index]);
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkpw1hn3b/image/upload",
          formdata
        );
        console.log(response.data);
        images.value[index] = response.data.secure_url;
        Statuses.value[index] = "Success";
        
        // console.log(Statuses.value[index]);
        // console.log("Image uploaded successfully:", response.data.secure_url);
        // console.log("Image URL:", response.data.secure_url);
        // console.log("Image ID:", response.data.public_id);
    
        // console.log(images);
      } catch (error) {
        Statuses.value[index] = "error";
        // console.log(Statuses.value[index]);
    
        console.log("Error uploading image:", error);
      }
    };
    return {
      images,
      Statuses,
      handleFileUpload,
      deleteimage,
      retryUpload
    };
    
    

})