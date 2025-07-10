<script setup>
import Formfield from '../components/Formfield.vue';
import Editprofilephoto from '../components/Editprofilephoto.vue';
import DropList from '../components/DropList.vue';
import Pagetitle from '../components/Pagetitle.vue';
import Primarybutton from '../components/Primarybutton.vue';


</script>

<style lang="scss" scoped>

</style>
<template>
<div class="contentTitle ">
  <Pagetitle title="Profile"/>
</div>

  <div class=" content   " >
 
    <v-row >
      <v-col order="6" cols="5 " >
        <v-sheet class=" pa-0 ma-0 ">
          <Formfield/>
          <!-- <Primarybutton title="Update Change" style="height: 56px;width: 400px; margin-top: 24px; margin-bottom: 20px;"/> -->

        </v-sheet>
      </v-col>
      <v-col order="12"  cols="5" >
        <v-sheet class="  pa-0">
       <!-- <DropList/> -->
        </v-sheet>
      </v-col>
      <v-col order="1"  cols="2"    class="d-flex  ">
        <v-sheet  >
          <Editprofilephoto image="profile.jpg" />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped lang="scss">
.content{
  padding: 0px 88px;

}
.contentTitle{
  padding: 22px 88px 22px 88px ;
}
</style>