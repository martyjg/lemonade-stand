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
runningTotal = 1000, numOfCustomers = 10,

possibleWeather = ["stormy", "raining", "cloudy", "warm", "hot"],

iceQuantity, lemonsQuantity = {fresh: 0, oneDay: 0}, sugarQuantity, todaysPrice,

iceCost, lemonsCost, sugarCost, stockCost, morningTotal,

iceToLemonade, lemonsToLemonade, sugarToLemonade, lemonadeProduced,

locationSelect,

salesMade, moneyMade;

var day = 1;
var surplusLemons, surplusSugar;

getReportedWeather = function() {

  var random = Math.random();
  if (random < 0.05) {
    weatherReport = possibleWeather[0];
    console.log("Weather Forecast: The weather is " + weatherReport + " today.")
  } else if (random >= 0.05 && random < 0.25) {
    weatherReport = 1;
    console.log("Weather Forecast: The weather is " + possibleWeather[1] + " today.")
  } else if (random >= 0.25 && random < 0.55) {
    weatherReport = 2;
    console.log("Weather Forecast: The weather is " + possibleWeather[2] + " today.")
  } else if (random >= 0.55 && random < 0.90) {
    weatherReport = 3;
    console.log("Weather Forecast: The weather is " + possibleWeather[3] + " today.")
  } else {
    weatherReport = possibleWeather[4];
    console.log("Weather Forecast: The weather is " + weatherReport + " today.")
  }
  if (day === 1) {
    getInitialStock();
  } else {
    getLocation();
  }
};

getLocation = function() {
  debugger
  locationSelect = prompt("where would you like to set up the lemonade stand today? (D)eptford Market: 100, (Br)ixton Market: 300, (S)pitalfields Market: 500, (Bo)rough Market: 900.");
  stockTotal();
}

getActualWeather = function() {
  var random = Math.random();
  if (weatherReport === "hot") {
    if (random < 0.1) {
      weatherActual = "stormy";
    } else if (random >= 0.1 && random < 0.8) {
      weatherActual = weatherReport;
    } else {
      weatherActual = "warm";
    }
  } else if (weatherReport === "stormy") {  
    weatherActual = weatherReport;
  } else {
    for (var i = 1; i < possibleWeather.length - 1; i++) {
      if (random < 0.15) {
        weatherActual = possibleWeather[weatherReport - 1];
      } else if (random >= 0.15 && random < 0.95) {
        weatherActual = possibleWeather[weatherReport];
      } else {
        weatherActual = possibleWeather[weatherReport + 1];
      }
    };
  }
  console.log("The weather today is " + weatherActual + ".")
  calculateCustomers();
}

calculateCustomers = function() {
  debugger
  var multiplier = possibleWeather.indexOf(weatherActual);
  numOfCustomers = multiplier * numOfCustomers;

  switch (locationSelect) {
  case "D":
    multiplier = 1
    break;    
  case "Br":
    multiplier = 1.5
    break;    
  case "S":
    multiplier = 2
    break;    
  case "Bo":
    multiplier = 2.5
    break;
  }

  numOfCustomers = multiplier * numOfCustomers;

  makeLemonade();
}


getInitialStock = function() {
  iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));

  lemonsQuantity.fresh = parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));

  sugarQuantity = parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));

  todaysPrice = parseInt(prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)"));

  stockTotal();
}

stockTotal = function() {
  console.log("ice: " + iceQuantity + "kg")
  console.log("Fresh lemons: " + lemonsQuantity.fresh + "kg. 1dayLemons: " + lemonsQuantity.oneDay + "kg")
  console.log("sugar: " + sugarQuantity + "kg")
  if (day === 1) {
    iceCost = iceQuantity * 100;
    lemonsCost = (lemonsQuantity.fresh + lemonsQuantity.oneDay) * 200;
    sugarCost = sugarQuantity * 100;
  } else {
    iceCost = iceQuantity * 100;
    lemonsCost = ((lemonsQuantity.fresh + lemonsQuantity.oneDay) - (surplusLemons / 10)) * 200;
    sugarCost = (sugarQuantity - (surplusSugar / 20)) * 100;
  }

  stockCost = iceCost + lemonsCost + sugarCost;
  console.log("You spent " + stockCost + " on stock today.")
  morningTotal = runningTotal - stockCost;
  console.log("You begin the day with a total of " + morningTotal + ".");

  getActualWeather();
}

makeLemonade = function() {
  iceToLemonade = iceQuantity * 10;
  var fLemonsToLemonade = lemonsQuantity.fresh * 10;
  var oLemonsToLemonade = lemonsQuantity.oneDay * 10;
  lemonsToLemonade = fLemonsToLemonade + oLemonsToLemonade;
  sugarToLemonade = sugarQuantity * 20;

  if (iceToLemonade <= lemonsToLemonade && iceToLemonade <= sugarToLemonade) {
    lemonadeProduced = iceToLemonade;
    surplusLemons = oLemonsToLemonade - lemonadeProduced;
    if (surplusLemons < 0) {
      surplusLemons = surplusLemons + fLemonsToLemonade;
      lemonsQuantity.fresh = surplusLemons / 10;
    } else if (surplusLemons > 0) {
      surplusLemons = surplusLemons + fLemonsToLemonade;
    } else {
      surplusLemons = fLemonsToLemonade
    }
    surplusSugar = sugarToLemonade - lemonadeProduced;
  } else if (lemonsToLemonade <= iceToLemonade && lemonsToLemonade <= sugarToLemonade) {
    lemonadeProduced = lemonsToLemonade;
    surplusSugar = sugarToLemonade - lemonadeProduced;
  } else {
    lemonadeProduced = sugarToLemonade;
    surplusLemons = oLemonsToLemonade - lemonadeProduced;
    if (surplusLemons < 0) {
      surplusLemons = surplusLemons + fLemonsToLemonade;
      lemonsQuantity.fresh = surplusLemons / 10;
    } else if (surplusLemons > 0) {
      surplusLemons = surplusLemons + fLemonsToLemonade;
    } else {
      surplusLemons = fLemonsToLemonade
    }
  }
  calculateSales();
}

calculateSales = function() {
  if (lemonadeProduced >= numOfCustomers) {
    salesMade = numOfCustomers;
  } else {
    salesMade = lemonadeProduced;
  }

  moneyMade = salesMade * todaysPrice;

  console.log("You sold " + salesMade + " lemonades today. You have made " + moneyMade + ".")

  runningTotal = morningTotal + moneyMade;

  console.log("You have " + runningTotal + ".")

  day++;
  numOfCustomers = 10;
  iceQuantity = 0;
  lemonsQuantity.oneDay = lemonsQuantity.fresh
  lemonsQuantity.fresh = 0;
  surplusStock();
}

surplusStock = function() {
  console.log(" At the end of the day, there is " + lemonsQuantity.fresh + " fresh lemons and " + lemonsQuantity.oneDay + " day old lemons.") 
  console.log("There is " + sugarQuantity + " sugar and " + iceQuantity + " ice.") 
  if (day === 1) {
    return;
  } else {
    console.log("You have enough surplus lemons from yesterday to produce " + surplusLemons + " glasses of lemonade.")
    console.log("You have enough surplus sugar from yesterday to produce " + surplusSugar + " glasses of lemonade.")
    iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));
    lemonsQuantity.fresh = parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));
    sugarQuantity =  (surplusSugar / 20) + parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));
    todaysPrice = prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)");
  }
  getReportedWeather();
}


