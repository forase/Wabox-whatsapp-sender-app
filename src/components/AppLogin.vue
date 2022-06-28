<script setup lang="ts">
import {ref} from 'vue';
import router from '../.core/router';

const phoneNumber = ref(localStorage.phone_number);
const phoneNumberNotValid = ref('');


const login = () =>{
  console.log(phoneNumber.value.substring(0,4));
  if (phoneNumber.value.length === 12 && phoneNumber.value.substring(0,4)=== '2126' || phoneNumber.value.substring(0,4)=== '2127') {
    localStorage.phone_number = phoneNumber.value;
    localStorage.login = true;
    router.push('/');
  }else
    phoneNumberNotValid.value = 'Phone number not valid'
}
</script>

<template>
  <div class="container">
    <form class="login-form" @submit.prevent="login()">
      <label class="label">
        <span class="label-text">Phone Number : </span>
      </label>
      <input type="text" placeholder="212600000000" v-model="phoneNumber" class="input input-bordered w-full max-w-xs" />
      <label class="label error-content">
        <span class="label-text-alt text-warning">{{ phoneNumberNotValid }}</span>
      </label>
      <button class="btn btn-accent w-full">Login</button>
    </form>
  </div>
</template>

<style>
.container{
  @apply h-full flex justify-center items-center;
}
.login-form{
  @apply form-control w-full max-w-xs;
}
</style>
