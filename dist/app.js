(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// var CarLot = (function () {
//   var inventory = [];

//   return {
//     getInventory: function () {
//       return inventory;
//     },
//     loadInventory: function (callback) {
//       var inventoryLoader = new XMLHttpRequest();
//       inventoryLoader.open("GET", "inventory.json");
//       inventoryLoader.addEventListener("load", function () {
//         inventory = JSON.parse(this.responseText).cars;
//         callback(inventory);
//       });
//       inventoryLoader.send();
//     }
//   };
// })();

// Promises variation

var inventory = [];
var fillInventory = function(data) {
  data.cars.forEach(function(element){
    inventory.push(element);
  });
};


var getInventory = function () {
  return inventory;
};

var loadInventory = function () {
  return new Promise(function(resolve, reject) {
    var inventoryLoader = new XMLHttpRequest();
    inventoryLoader.open("GET", "inventory.json");
    inventoryLoader.send();

    inventoryLoader.addEventListener("load", function () {
      var data = JSON.parse(this.responseText);
      fillInventory(data);
      resolve(inventory);
    });
  });
};

module.exports = { getInventory, loadInventory };


},{}],2:[function(require,module,exports){
"use strict";

// CarLot = (function(carLot) {
//   carLot.activateEvents = function() {
//     var cards = document.querySelectorAll(".carCard")
//     cards.forEach(function(card){
//       card.addEventListener("click", function(){
//         var userInput = document.querySelector("#userInput")
//         userInput.value = ""
//         userInput.focus()
//         CarLot.resetCards(cards)
//         CarLot.styleCard(card, "pink")
//         CarLot.mirrorText(card, userInput)
//       })
//     })
//   }
//   return carLot
// })(CarLot);

var cardStyle = require('./style');

  var activateEvents = function() {
  var cards = document.querySelectorAll(".carCard");
  cards.forEach(function(card){
    card.addEventListener("click", function(){
      var userInput = document.querySelector("#userInput");
      userInput.value = "";
      userInput.focus();
      cardStyle.resetCards(cards);
      cardStyle.styleCard(card, "pink");
      cardStyle.mirrorText(card, userInput);
    });
  });
};

module.exports = activateEvents;
},{"./style":4}],3:[function(require,module,exports){
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
},{"./carLot":1,"./events":2}],4:[function(require,module,exports){
"use strict";

// CarLot = (function(carLot){
//   carLot.resetCards = function(cards){
//     cards.forEach(function(card){
//       card.classList.remove("pink");
//     });
//   };
//   carLot.styleCard = function(card, pink){
//     card.classList.add(pink);
//   };
//   carLot.mirrorText = function(card, userInput){
//     userInput.value = card.querySelector("p").innerHTML;
//     userInput.addEventListener("keyup", function(){
//       if (card.classList.contains("pink")){
//         card.querySelector("p").innerHTML = userInput.value;
//       }
//     });
//   };
//   return carLot;
// })(CarLot);

var userInput = document.getElementById('userInput');
var cardStyle = {};

cardStyle.resetCards = function(cards){
  cards.forEach(function(card){
    card.classList.remove("pink");
  });
};
cardStyle.styleCard = function(card, pink){
  card.classList.add(pink);
};
cardStyle.mirrorText = function(card, userInput){
  userInput.value = card.querySelector("p").innerHTML;
  userInput.addEventListener("keyup", function(){
    if (card.classList.contains("pink")){
      card.querySelector("p").innerHTML = userInput.value;
    }
  });
};

module.exports = cardStyle;

},{}]},{},[3]);
