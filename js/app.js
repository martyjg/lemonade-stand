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

lemonade = {}

var 

runningTotal = 1000, numOfCustomers = 20,

iceQuantity, lemonsQuantity, sugarQuantity, todaysPrice,

iceCost, lemonsCost, sugarCost, stockCost, morningTotal,

iceToLemonade, lemonsToLemonade, sugarToLemonade, lemonadeProduced,

salesMade, moneyMade;

var day = 1;
var limiter = "";
var surplusLemons, surplusSugar;


getStock = function() {
  iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));

  lemonsQuantity = parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));

  sugarQuantity = parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));

  todaysPrice = parseInt(prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)"));

  stockTotal();
}

stockTotal = function() {
  debugger
  console.log("ice: " + iceQuantity + "kg")
  console.log("lemons: " + lemonsQuantity + "kg")
  console.log("sugar: " + sugarQuantity + "kg")
  if (day === 1) {
    iceCost = iceQuantity * 100;
    lemonsCost = lemonsQuantity * 200;
    sugarCost = sugarQuantity * 100;
  } else {
    iceCost = iceQuantity * 100;
    lemonsCost = (lemonsQuantity - (surplusLemons / 10)) * 200;
    sugarCost = (sugarQuantity - (surplusSugar / 20)) * 100;
  }

  stockCost = iceCost + lemonsCost + sugarCost;
  console.log("You spent " + stockCost + " on stock today.")
  morningTotal = runningTotal - stockCost;
  console.log("You begin the day with a total of " + morningTotal + ".");

  makeLemonade();
}

makeLemonade = function() {
  debugger
  iceToLemonade = iceQuantity * 10;
  lemonsToLemonade = lemonsQuantity * 10;
  sugarToLemonade = sugarQuantity * 20;

  if (iceToLemonade <= lemonsToLemonade && iceToLemonade <= sugarToLemonade) {
    limiter = "ice";
    lemonadeProduced = iceToLemonade;
    surplusLemons = lemonsToLemonade - lemonadeProduced;
    surplusSugar = sugarToLemonade - lemonadeProduced;
  } else if (lemonsToLemonade <= iceToLemonade && lemonsToLemonade <= sugarToLemonade) {
    limiter = "lemons";
    lemonadeProduced = lemonsToLemonade;
    surplusSugar = sugarToLemonade - lemonadeProduced;
  } else {
    limiter = "sugar";
    lemonadeProduced = sugarToLemonade;
    surplusLemons = lemonsToLemonade - lemonadeProduced;
  }

  calculateSales();
}

calculateSales = function() {
  debugger
  if (lemonadeProduced >= numOfCustomers) {
    salesMade = numOfCustomers;
  } else {
    salesMade = lemonadeProduced;
  }

  moneyMade = salesMade * todaysPrice;

  console.log("You have made " + moneyMade + " today.")

  runningTotal = morningTotal + moneyMade;

  console.log("You have " + runningTotal + ".")

  day++;
  iceQuantity = 0;
  surplusStock();
}

surplusStock = function() {
  debugger
  if (day === 1) {
    return;
  } else {
    console.log("You have enough surplus lemons from yesterday to produce " + surplusLemons + " glasses of lemonade.")
    console.log("You have enough surplus sugar from yesterday to produce " + surplusSugar + " glasses of lemonade.")
    iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));
    lemonsQuantity = (surplusLemons / 10) + parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));
    sugarQuantity =  (surplusSugar / 20) + parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));
    todaysPrice = prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)");
  }
  stockTotal();
}


