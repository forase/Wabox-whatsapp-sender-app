<template>
  <div class="collections-list">
    <h1 class="flex text-3xl font-bold m-2">
      <span class="flex-1">Collections List</span>
      <div class="flex-none">
        <button class="btn btn-outline btn-info btn-md">Add</button>
      </div>
    </h1>
    <div v-for="index in 5" :tabindex="index" class="my-1 bg-gray-700 collapse border border-base-300 bg-base-100 rounded-box">
      <div class="flex collapse-title text-xl font-medium pr-4">
        <span class="flex-1">Focus me to see content</span>
        <div class="flex-none">
          <router-link class="btn btn-sm" to="/collections/1">view</router-link>
        </div>
      </div>
      <div class="collapse-content">
        <p>Total : 50</p>
        <p>Seend : 27</p>
        <p>Recieved : 15</p>
        <p>not recieved : 8</p>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../.core/database';
export default{
  data(){
    return {
      collection:{
        id: null,
        name: null,
        age: 0,
        email: null
      },
      collections: [],
      retryCount: 0,

    }
  },
  mounted(){
    this.readAll()
  },

  methods:{
    add(collection) {
      var vm = this
      let request = new Promise((resolve, reject) => {
        var request = db.transaction(["collection"], "readwrite")
        .objectStore("collection").add({
          id: collection.id != null ? collection.id : vm.collections.length++ ,
          name: collection.name,
          age: collection.age,
          email:collection.email
        })
        request.onsuccess = function(event) {
          vm.collections.push({
            edit: false,
            id: collection.id != null ? vm.collection.id : vm.collections.length++ ,
            name: collection.name,
            age: collection.age,
            email: collection.email
          })
        }
        request.onerror = function(event) {
          alert("Unable to add data ");
        }
      });
    },
    clear() {
      var vm = this
      var request = db.transaction(["collection"], "readwrite")
      .objectStore("collection")
      .clear()
      vm.collections = []
    },
    edit(collection, index) {

      var vm = this
      new Promise((resolve, reject) => {
        vm.remove(collection.id, index)
        resolve(vm.add(collection));
      });

    },
    readAll() {
      var vm = this
      try {
        vm.collections = []
        var objectStore = db.transaction("collection").objectStore("collection");
        if(objectStore){
          objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;

            if (cursor) {
              if(vm.collections){
                vm.collections.push({ edit: false,  id: cursor.key , name: cursor.value.name , age:cursor.value.age, email:cursor.value.email});

              }
              cursor.continue();

            }
          };
        }
      }catch(e){
        vm.retryDisp()
      }
    },
    remove(id, index) {
      var vm = this
      var request =  db.transaction(["collection"], "readwrite")
      .objectStore("collection")
      .delete(id);
      vm.collections.splice(index, 1)
    },
    retryDisp() {
      var vm = this
      if( ++vm.retryCount > 5 ) {
        console.log('Cannot open the database after 5 retries');
        vm.readAll();
      }
      setTimeout(function(){ vm.readAll() }, 100);
    }
  }
}
</script>
<style media="screen">
  .collections-list{
    @apply p-2;
  }
</style>
