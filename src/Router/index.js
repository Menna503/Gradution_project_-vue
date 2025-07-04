import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../Pages/Dashboard.vue'
import CustomerManagement from '../Pages/CustomerManagement.vue'
import OrderManagement from '../Pages/OrderManagement.vue'
import ProductManagement from '../Pages/ProductManagement.vue'
import Admins from '../Pages/Admins.vue'      
import Profile from '../Pages/Profile.vue'
import Errorpage from '../Pages/Errorpage.vue'
import Login from '../Pages/Login.vue'
// import AddProduct from "../Pages/AddProduct.vue";
import OrderDetails from "../Pages/OrderDetails.vue";
import AllOrders from "../components/AllOrders.vue";
import MainLayout from "../Layout/MainLayout.vue";
import AuthLayout from "../Layout/AuthLayout.vue";
import AddProductForm from "../components/AddProductForm.vue";
import Addnewadmin from "../Pages/Addnewadmin.vue";


const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: Login
      },
     { path: 'Login', component: Login },
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'Dashboard', component: Dashboard },
      { path: 'customer-management', component: CustomerManagement },
      { path: 'order-management', component: OrderManagement },
      { path: 'product-management', component:ProductManagement,meta:{endpoint:'products'} },
      { path: 'admins', component:Admins,meta:{endpoint:'admins'} },
      { path: 'profile', component: Profile },
      // { path: 'AddProduct', component: AddProduct },
      { path: 'OrderDetails/:_id', component: OrderDetails },
      { path: 'AllOrders/:_id', component: AllOrders },
      { path:'EditProduct/:id',name:'EditProduct',component:AddProductForm,props:true},
      {path:'AddProduct',name:'AddProduct',component:AddProductForm,props:true },
            {path:'newadmin',nane:'Addnewadmin',component:Addnewadmin}
      
      
      
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Errorpage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
