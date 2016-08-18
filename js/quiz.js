"use strict";

// (function(){
//   function populatePage (inventory) {
//     var output = document.querySelector(".output");
//     var results = "";
//     inventory.forEach(function(car, i){
//       if (i % 3 === 0) {
//       results += `<div class="row">`;
//     }
//       results += `
//       <div class="col-md-4 carCard" style="border-color: ${car.color}">
//       <h3>${car.make}</h3>
//       <h3>${car.model}</h3>
//       <h3>${car.year}</h3>
//       <h3>$${car.price}</h3>
//       <h3>${car.color}</h3>
//       <h3>${car.purchased}</h3>
//       <p>${car.description}</p>
//       </div>
//       `;
//       if ((i + 1) % 3 === 0) {
//     results += `</div>`;
//     }
//     });
//     output.innerHTML = results;

//     CarLot.activateEvents();
//   }

//   CarLot.loadInventory(populatePage);
// })();

// Promises way of doing things

var carInventory = require('./carLot');
var eventStuff = require('./events');

function populatePage (inventory) {
  var output = document.querySelector(".output");
  var results = "";
  inventory.forEach(function(car, i){
    if (i % 3 === 0) {
    results += `<div class="row">`;
  }
    results += `
    <div class="col-md-4 carCard" style="border-color: ${car.color}">
    <h3>${car.make}</h3>
    <h3>${car.model}</h3>
    <h3>${car.year}</h3>
    <h3>$${car.price}</h3>
    <h3>${car.color}</h3>
    <h3>${car.purchased}</h3>
    <p>${car.description}</p>
    </div>
    `;
    if ((i + 1) % 3 === 0) {
  results += `</div>`;
  }
  });
  output.innerHTML = results;

  eventStuff();
}

carInventory.loadInventory()
.then(
  function (inventoryFromLoadInventoryResolve) {
    // console.log("carPromise", inventoryFromLoadInventoryResolve);
    return populatePage(inventoryFromLoadInventoryResolve);
  },
  function (reason) {
    console.error('Something went wrong', reason);
  })
.then(function() {
  eventStuff();
});