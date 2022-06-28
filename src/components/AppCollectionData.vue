<template>
<div class="collection-container">
  <div class="contact-data" style="width:100%">
    <button @click="deselectRows">deselect rows</button>
     <ag-grid-vue
       class="ag-theme-alpine"
       style="height: 100%"
       :columnDefs="columnDefs.value"
       :rowData="rowData.value"
       :defaultColDef="defaultColDef"
       rowSelection="multiple"
       animateRows="true"
       @cell-clicked="cellWasClicked"
       @grid-ready="onGridReady"
     >
     </ag-grid-vue>
  </div>
  <div class="sender-pannel">
    <h1>Whatsapp Sender</h1>
    <form class="sender-form" @submit.prevent="runSender()">
      <label for=""> From :</label>
      <input type="text" v-model="userPhoneNumber" placeholder="Type here" class="input input-bordered w-full" disabled/>
      <br>
      <label for=""> Template :</label>
      <select class="select select-bordered w-full">
        <option disabled selected>Who shot first?</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <br>
      <label for=""> Message :</label>
      <textarea class="textarea textarea-bordered" v-model="senderMessage" placeholder="message"></textarea>
      <br>
      <div class="sender-action-btns flex w-full">
        <button class="btn btn-wide mx-1">loading</button>
        <!--  -->
        <label class="btn" for="import-csv">Import</label>
        <input id="import-csv" @change="onFileChange" type="file" accept=".csv" class="hidden">
      </div>
    </form>
  </div>
</div>
</template>
<script>
import { AgGridVue } from "ag-grid-vue3";  // the AG Grid Vue Component
import { reactive, onMounted, ref } from "vue";

import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

export default {
 name: "App",
 components: {
   AgGridVue,
 },
 setup() {
   const userPhoneNumber= localStorage.phone_number || '';
   const senderMessage = ref('Hello {name}');

   const gridApi = ref(null); // Optional - for accessing Grid's API

   // Obtain API from grid's onGridReady event
   const onGridReady = (params) => {
     gridApi.value = params.api;
   };

   const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

   // Each Column Definition results in one Column.
   const columnDefs = reactive({
     value: [{ field: "phone" }, { field: "name" }, { field: "sent" }],
   });

   // DefaultColDef sets props common to all Columns
   const defaultColDef = {
     sortable: true,
     filter: true,
   };

   // Example load data from sever
   onMounted(() => {
     // fetch("https://www.ag-grid.com/example-assets/row-data.json")
     //   .then((result) => result.json())
     //   .then((remoteRowData) => (rowData.value = remoteRowData));
   });

    function onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        createInput(files[0]);
    }
    function createInput(file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = ()=>{
          rowData.value = csvJSON(reader.result)
        }

    }

    // convert csv to json
    function csvJSON(csvText) {
      let lines = [];
      console.log(csvText);
      const linesArray = csvText.split('\n');
      // for trimming and deleting extra space
      linesArray.forEach((e) => {
         const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
         lines.push(row);
      });
      // for removing empty record
      lines.splice(lines.length - 1, 1);
      const result = [];
      const headers = lines[0].split(",");

      for (let i = 1; i < lines.length; i++) {

         const obj = {};
         const currentline = lines[i].split(",");

         for (let j = 0; j < headers.length; j++) {
         obj[headers[j]] = currentline[j];
         }
         result.push(obj);
      }
      //return result; //JavaScript object
      // return JSON.stringify(result); //JSON
      return result;
    }

    function getToken(){
      return localStorage.token;
    }

    async function send(from, to, message){
      var url = "https://www.waboxapp.com/api/send/chat";
      var token = getToken();
      var uid = from;
      var to = to;
      var custom_uid = "msg-"+Math.floor(Math.random()*12345);
      var text = encodeURIComponent(message);

      var api = url+ "?" + "token=" +token+ "&uid=" +uid+ "&to=" +to+ "&custom_uid=" +custom_uid+ "&text=" +text;

      await fetch(api)
        .then((res) => res.json())
        .then((result) => console.log(result));
    }

    function insertDesignJsonObject(obj, index) {
      console.log(obj);
      const phone = obj.phone;
      const msg = senderMessage.value.replace('{name}',obj.name);
      console.log(msg, phone);
      send(userPhoneNumber,phone,msg);
    }

    const setDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function runSender(){
      const delay = JSON.parse(localStorage.delay);
      (async () => {
        console.log("start",delay);
        for (let index = 0; index < rowData.value.length; ++index) {
          // Wait to do this one until a delay after the last one
          if (index > 0) {
            await setDelay(delay*1000); // 5000 for five seconds
          }
          insertDesignJsonObject(rowData.value[index], index);
        }
      })();
    }

   return {
     userPhoneNumber,
     onGridReady,
     columnDefs,
     rowData,
     defaultColDef,
     onFileChange,
     runSender,
     senderMessage,
     cellWasClicked: (event) => { // Example of consuming Grid Event
       console.log("cell was clicked", event);
     },
     deselectRows: e =>{
       gridApi.value.deselectAll()
     }
   };
 },
};
</script>

<style media="screen">
/* @import "handsontable/dist/handsontable.full.css"; */
.collection-container{
  @apply flex h-full;
}
.sender-pannel h1{
  @apply text-3xl font-bold;
}
.sender-pannel{
  @apply w-1/3 flex flex-col p-4 h-full border-l-2;
  @apply relative;
}
.sender-pannel .sender-form{
  @apply flex flex-col;
  @apply my-4;
}
.sender-pannel .sender-form .sender-action-btns{
  @apply absolute bottom-4;
}
.contacts-data{
  @apply block p-2 w-full;
}
</style>
