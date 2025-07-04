// src/store/OrderStore.js
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('CRUD', () => {
  const token = localStorage.getItem("token");
 

  const alldata      = ref([]);
  const status       = ref('idle');
  const datalength   = ref(0);
  const totalRevenue = ref(0);
  const totalOrders  = ref(0);
  const newProducts  = ref(0);
  const newCustomers = ref(0);

  const fetchOrders = async (filter={}) => {
          status.value = 'loading';

    try {
            const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      const url = params.toString()
        ? `/api/orders?${params}`
        : `/api/orders`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

    console.log(response)
      alldata.value = response.data.data.map(order => ({
        _id: order._id,
        firstName: order.user?.firstName,
        lastName: order.user?.lastName,
        email: order.user?.email,
        itemsCount: order.items.length,
        totalPriceOrder: order.totalPrice,
        status: order.status,
      }));

      
      const payload = {
        data:         response.data.data,
        totalRevenue: response.data.totalRevenue,
        totalOrders:  response.data.NumberOfOrders,
        newProducts:  response.data.newProduct,
        newCustomers: response.data.newCustomers,
      };

      
      totalRevenue.value = payload.totalRevenue;
      totalOrders.value  = payload.totalOrders;
      newProducts.value  = payload.newProducts;
      newCustomers.value = payload.newCustomers;
      datalength.value   = payload.data.length;
      status.value       = 'success';

      return payload;
    } catch (error) {
      console.error('Error fetching orders:', error);
      status.value = 'error';
      throw error;
    }
  };

  const fetchOrderById = async (_id) => {
    try {
      const response = await axios.get(`/api/orders/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      status.value = 'success';
      return response.data.result;
    } catch (err) {
      console.error('Failed to fetch order by ID:', err);
      status.value = 'error';
      throw err;
    }
  };

  return {
    fetchOrders,
    fetchOrderById,
    alldata,
    datalength,
    status,
    totalRevenue,
    totalOrders,
    newProducts,
    newCustomers,
  };
});
