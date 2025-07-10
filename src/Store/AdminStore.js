import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('admin', () => {
  const token = localStorage.getItem("token");
  const alladmins = ref([]);
  const adminId = ref([]);
  const status=ref("idel");
  const datalength=ref(0)
  //get admin
  const fetchproduct = async () => {
    status.value = 'loading';
    try {
      const res = await axios.get('/api/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const list = res.data.data.Admins;
      alladmins.value = list.filter(c => c.role !== 'manager');
      datalength.value = list.length;
      status.value = 'success';
    } catch {
      status.value = 'error';
    }
  };
//update admin
  const updateadminIdm = async (id) => {

    try {
      await axios.delete(
        `/api/admins/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

    } catch (err) {
      console.error(err);
    }
  };

  // add admin
 const addadminIdm = async (product) => {
  try {
    const response = await axios.post(`/api/admins`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   if (response.status === 201) {
  console.log("Admin added successfully");
  await fetchproduct(); 
}

    return response;
  } catch (error) {
    console.error("Error adding admin:", error);
    throw error;
  }
};
  

  return {
   alladmins,
    fetchproduct,status,datalength,updateadminIdm,addadminIdm
  
  };
});