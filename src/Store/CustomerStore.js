import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCustomerStore = defineStore('CRUD', () => {
  const token = localStorage.getItem("token");
  const alldata = ref([]);// all customer 
  // variable for data by id
  const dataitem = ref([]);// one customer 
  const status = ref('idel');// status
  const datalength = ref(0);// number of all customer 
  //filter and get all data
  const fetchUsers = async (filter = {}) => {
    try {
      status.value = 'loading';
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);

      const url = params.toString() ? `/api/users?${params}` : `/api/users`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alldata.value = res.data.data.users.filter(p => !p.isDeleted);

      datalength.value = res.data.userCount;
      status.value = 'success';
      return res;
    } catch (err) {
     console.error('Error fetching products:', err);
      status.value = 'error';
      throw err;
    }
  };

  const fetchCustomerById = async _id => {
    try {
      const res = await axios.get(`/api/users/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      status.value = 'success';
      console.log('Fetched user:', res.data.data.user);
      return res.data.data.user;
    } catch (err) {
      console.error('Failed to fetch user by ID:', err);
      status.value = 'error';
      return null;
    }
  };

  const updateuserbyid = async (id, user) => {
    const currentRole = user.role;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const password = 'pasword123';
    const newRole = currentRole === 'customer' ? 'admin' : 'customer';

    try {
      await axios.patch(
        `/api/users/${id}`,
        {
          role: newRole,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error(err);
    }
  };

  async function deleteuser(id) {
    const res = await axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
          console.log("done1")

    if (res.data.status === 'success') {
      console.log("done2")
      alldata.value = alldata.value.filter(p => p._id !== id);
      datalength.value = alldata.value.length;
      
    }
    return res;
  }
  // const updatedataitem = async (id, user) => {
  //   const response = await axios.patch(`/api/Users/${id}`, user, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   //  resp is object return product update and stautus
  //   //store  product update
  //   const update = response.data.data.users;
  //   //  هنلف علي  المنتجات بتاعتي اللي عندي اصلا ونجيب المنتج بتاعنا القديم
  //   // هنجيب ال  index  بتاعه
  //   const indexoldproduct = alldata.value.findIndex(p => p.id === id);
  //   if (indexoldproduct !== -1) {
  //     alldata.value[indexoldproduct] = update;
  //   }
  //   return response;
  // };
  //
  //by id delete product
  // const deletedataitem = async id => {
  //   const response = await axios.delete(`/api/Users/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,

  //     },
  //   });
  //   console.log(response.data);
  //   if (response.data.status === 'success') {
  //     console.log('Product deleted successfully');
  //     alldata.value = alldata.value.filter(user => user._id !== id);
  //   }
  //   return response;
  // };
  //

  //

  return {
    fetchUsers,
    status,
    datalength,
    alldata,
    fetchCustomerById,
    status,
    updateuserbyid,
    deleteuser,
  };
});
