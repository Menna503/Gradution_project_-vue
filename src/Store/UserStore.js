import { defineStore } from 'pinia';
import axios from 'axios';

export const UserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || '',
    logedUser: JSON.parse(localStorage.getItem('logedUser')) || null, 
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/api/admins/login', {
          email: credentials.email,
          password: credentials.password,
        });
          console.log("response of store",response);
        this.token = response.data.token;
        this.userRole = response.data.data?.admin.role;
        // this.userRole = response.data.data.admin.role;

        this.logedUser = response.data.data.admin;

        localStorage.setItem('token', this.token);
        localStorage.setItem('userRole', this.userRole);
        localStorage.setItem('logedUser', JSON.stringify(this.logedUser)); 

        return this.token;
      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    },

 logout() {
  this.token = null;
  this.userRole = '';
  this.logedUser = null;

  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('logedUser');
}
  },

  
  

  getters: {
    getToken: (state) => state.token,
  },
});