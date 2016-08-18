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