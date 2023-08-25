<template>
  <div class="history"> 
    <div class="detail" @click="navigateToTargetPage">
      <div class="three">历史记录</div>
    </div>
  </div>
    
   
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue"; 

const router = useRouter();
const navigateToTargetPage = () => {
  router.push("/sensor/detailedmonitor");
};



</script>

<style>
/* .detail {
  display: flex; 
  border-radius: 5px;
  width: 100%;
 
  margin: 0 100px 100px 100px;
  justify-content: center;
  text-align: center;
    opacity: 0.5;
  background-color: #7fb7a191;
} */
/* .detail {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  opacity: 0.5;
  background-color: #7fb7a1;
} */
/* .history{
  width: 1000px;

} */
.detail {
  /* display: flex; */
  cursor: pointer;
  width: 10%;
  border-radius: 5px;
  height: 50px;
  width: 120px;
  /* max-width: 500px; */
  margin:0 auto;
  /* opacity: 0.5; */
  background-color: #7fb7a1;
  
}
.detail:hover{
  /* opacity: 0.8; */
  background-color: #7fb7a191;
}
@media (max-width: 500px) {
  .detail {
    height: 150px;
  }
}

@media (max-width: 400px) {
  .detail {
    height: 100px;
  }
}
/* .three {
 
  display: flex;

  font-weight: 500; 
  font-size: 100px;
  height: 20%;
  width: 500px;
  justify-content: center;
  color:#f1f1f1;
} */
.three {
  /* width: 20px; */
  /* margin: 0 635px 0 635px; */
  font-size: 20px;
  padding: 10px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  /* display: flex;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  justify-content: center; */

  /* height: 100% */
}
 
 

</style>