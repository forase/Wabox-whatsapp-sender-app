<script setup>
import {ref} from 'vue';

const delay = ref(localStorage.delay || 10);
const token = ref(localStorage.token || '');
const logout = () =>{
  localStorage.login = false;
  console.log("logout")
  this.$route.push('/login');
}

const save = ()=>{
  localStorage.token = token.value;
  localStorage.delay = delay.value;

}

</script>
<template>
  <div class="navbar bg-green-500">
    <div class="flex-1">
      <a class="btn btn-ghost text-white normal-case text-xl">Whatsapp by forase</a>
    </div>
    <div class="flex-none">
      <!-- <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div class="card-body">
            <span class="font-bold text-lg">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div> -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <!-- https://api.lorem.space/image/face?hash=33791 -->
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between cursor-not-allowed">
              Profile
              <span class="badge">Soon</span>
            </a>
          </li>
          <li><label for="my-modal-6" class="modal-button">Settings</label></li>
          <li @click="logout()"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>


  <input type="checkbox" id="my-modal-6" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Setup Wabox configuration : </h3>
      <br>
      <input type="text" placeholder="Wabox Token" v-model="token" class="input input-bordered w-full" />
      <br>
      <label for="delay-range" class="label">delay Range : <span>{{delay}}s</span></label>

      <input id="delay-range" type="range" min="0" max="60" v-model="delay" class="range range-sm inline-block" />

      <div class="modal-action">
        <label for="my-modal-6" class="btn" @click="save()">Save</label>
      </div>
    </div>
  </div>
</template>
