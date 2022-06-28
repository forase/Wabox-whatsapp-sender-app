//prefixes of implementation that we want to test
Object.defineProperty(window, 'indexedDB', {
  value: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
});
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


const contactData = [];
const collectionData = [];
var db;
var request = window.indexedDB.open("ForaseDB", 4);

request.onerror = function(event) {
  console.log("error: ", event);
};

request.onsuccess = function(event) {
  db = request.result;
  console.log("success: " + db);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var contactStore = db.createObjectStore("contacts", { keyPath: "num" });
  var collectionStore = db.createObjectStore("collections", { keyPath: "id" });

  for (var i in contactData) {
    contactStore.add(contactData[i]);
  }
  for (var i in collectionData) {
    collectionStore.add(collectionData[i]);
  }
}

export default db;
