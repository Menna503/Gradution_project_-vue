<template>
    <v-container class="d-flex flex-column align-center justify-center hight-full ">
      <div class="position-relative"style="width: 230px; height: 230px;">
        <Doughnut :data="chartData" :options="chartOptions" />
        <div
          class="position-absolute font-weight-bold text-h-5 text-primary"style=" top: 50%; left: 50%; transform: translate(-50%, -50%)"  >
  {{ Math.round((props.data[0] / (props.data[0] + props.data[1])) * 100) }}%
    </div>
      </div>
      <div class="text-center mt-4 font-weight-semibold text-h-5 text-primary" >
       {{title}}
      </div>
    </v-container>


  </template>
  
  <script setup>//  use compostion api
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  // import chart and rename it = chartjs 
  //Title  عنوان فو الرسمه
  // tooltip  علشان لما اقف علي جزء يبينلي ده خاص ب اي 
  //legend  شرح للالوان 
  //arcelement  هو اللي بيرسم الدونت الداخلي
  import { ref,computed } from 'vue'// import reactivity 
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)// بعرف ان هستخدم الحاجات دي جو ال  chart 
   const props=defineProps({
    data:{
        type:Array,
        required:true,
    },title:{
        type:String,
        required:true
    }
   })
  
   // background color  يتحط في ال  rectivity  علشان ده طبيعه ال  chart library  معموله انها تاخدهم من ال datasets
 const chartData = computed(() => ({
  labels: ['Available', 'Unavailable'],
  datasets: [
    {
      backgroundColor: ['#005b99', '#f5f5f5'],
      data: props.data,
      cutout: '50%',
    },
  ],
}))
  // انا سيباهم علشان لو حبينا في اي وقت   حبينا نزود  feature  ونخليهم true
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  })
  </script>
  