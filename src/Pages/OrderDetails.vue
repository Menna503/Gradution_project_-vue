<script setup>
import OrderDetails_form from '../components/OrderDetails_form.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const orderId = route.params._id;

</script>

<template>
<OrderDetails_form :order-id="orderId"/>
</template>
<style scoped lang="scss">

</style>