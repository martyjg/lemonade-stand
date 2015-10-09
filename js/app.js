// LEMONADE STAND: The Game
// The user is placed in charge of a lemonade stand and must manage their bills, stock and sales.
// At the start of the day, the user is given the weather report.
// The user must purchase ice, lemons and sugar. These can only be purchased in set quantities. 
// Ice lasts only 1 day and lemons last only 2 days.
// The user must set the price for their lemonade on that day.
// On sunny hot days, more lemonade is sold.
// On cold or wet days, less is sold.
// The weather can sometimes vary a little from the reported forecast.
// On seldom occasion, the weather will vary wildly from the reported forecast.
// The user must select a location to set up their stand for the day.
// Certain locations cost more, but may have greater no. of customers or customers willing to spend more money.
// The user repeats this process over several days, trying to maximise profitand avoid going bust.
// A target must be reached by a final day in order for the player to have succeeded.

stocksAndSales = function() {

  var startingCash = 1000;

  var iceQuantity = 2;
// prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.");

  var lemonsQuantity = 2;
// prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.");

  var sugarQuantity = 1;
// prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.");

  var todaysPrice = 80;
// prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80");

  var iceCost = iceQuantity * 100;
  var lemonsCost = lemonsQuantity * 200;
  var sugarCost = sugarQuantity * 100;

  var iceToLemonade = iceQuantity * 10;
  var lemonsToLemonade = lemonsQuantity * 10;
  var sugarToLemonade = sugarQuantity * 20;

  var stockCost = iceCost + lemonsCost + sugarCost;

  console.log("You spent " + stockCost + " on stock today.")

  if (iceToLemonade <= lemonsToLemonade && iceToLemonade <= sugarToLemonade) {
    var lemonadeProduced = iceToLemonade;
  } else if (lemonsToLemonade <= iceToLemonade && lemonsToLemonade <= sugarToLemonade) {
    var lemonadeProduced = lemonsToLemonade;
  } else {
    var lemonadeProduced = sugarToLemonade;
  }

  var numOfCustomers = 40;

  if (lemonadeProduced >= numOfCustomers) {
    var salesMade = numOfCustomers;
  } else {
    var salesMade = lemonadeProduced;
  }

  var moneyMade = salesMade * todaysPrice;

  console.log("You have made " + moneyMade + " today.")

  var totalCash = (startingCash - stockCost) + moneyMade;

  console.log("You have " + totalCash + ".")
}