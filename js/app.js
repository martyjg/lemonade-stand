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

$(setup);

var numOfCustomers  = 10,
    possibleWeather = ["stormy", "raining", "cloudy", "warm", "hot"], 
    reportDay,
    
    iceQuantity, 
    lemonsQuantity  = {fresh: 0, oneDay: 0}, 
    sugarQuantity,
    
    $todaysPrice, 
    todaysPrice,
    
    iceCost    = 0, 
    lemonsCost = 0, 
    sugarCost  = 0, 
    stockCost  = 0, 
    
    iceToLemonade, 
    lemonsToLemonade, 
    sugarToLemonade, 
    
    lemonNum = 0,
    iceNum   = 0,
    sugarNum = 0,
    
    lemonadeProduced,
    
    locationSelect, 
    
    rent, 
    runningTotal = 1000,
    
    salesMade, 
    moneyMade,
    
    day = 1,
    
    surplusSugar = 0,

    delay = 3150; //1 seconds

function setup() {
  itsANewDay();
  addIncDecButtons();
  $(".start-button").on("click", showDay);
}

function itsANewDay(){
  $(".lemonade-stand-display").hide();
  $(".user-input-screen").show();
  $(".instructions").hide();

  getReportedWeather();
}

function showDay() {
  getActualWeather();

  iceQuantity          = parseInt($("#input-ice").text());
  lemonsQuantity.fresh = parseInt($("#input-lemon").text());
  sugarQuantity        = (surplusSugar / 20) + parseInt($("#input-sugar").text());

  todaysPrice          = parseInt($(".price-input").text());

  locationSelect       = getLocation();
  setupStand();

  $(".user-input-screen").hide();
  $(".lemonade-stand-display").show();
}

function setupStand() {
  $(".starting-num").text(runningTotal);

  iceCost        = iceStock();
  lemonsCost     = lemonStock();
  sugarCost      = sugarStock();
  stockCost      = totalStock();

  makeLemonade();

  numOfCustomers = calculateCustomers();
  salesMade      = calculateSales();

  $(".stock-num").text(stockCost);
  $(".rent-num").text(rent);
  //AFTER 3150 SECONDS LOAD THESE NUMBERS:
  runningTotal = runningTotal - stockCost - rent + (salesMade * todaysPrice);

  setTimeout(function(){
    $(".sales-num").text(salesMade);
    $(".balance-num").text(runningTotal);

    $(".surplusL-num").text(lemonsQuantity.oneDay);
    $(".surplusS-num").text(surplusSugar);
  }, delay); 


  day++;

  numOfCustomers = 10;
  $(".end-day-button").on("click", itsANewDay)
}

function setupButton(selector, increment) {
  var val = parseInt($("#input-"+selector).text());
  $("#decrement-"+selector).on("click", function() { val -= increment; $("#input-"+selector).text(val); });
  $("#increment-"+selector).on("click", function() { val += increment; $("#input-"+selector).text(val); });
}


function addIncDecButtons() {
  setupButton("lemon", 1);
  setupButton("ice", 1);
  setupButton("sugar", 1);
  setupButton("price", 10);
}

// ["stormy", "raining", "cloudy", "warm", "hot"]
function getReportedWeather() {
  $(".day-display").text("Day no." + day);

  var random = Math.random();

  if (random < 0.05) {
    weatherReport = possibleWeather[0];
  } else if (random >= 0.05 && random < 0.25) {
    weatherReport = 1;
  } else if (random >= 0.25 && random < 0.55) {
    weatherReport = 2;
  } else if (random >= 0.55 && random < 0.90) {
    weatherReport = 3;
  } else {
    weatherReport = possibleWeather[4];
  }

  if (weatherReport === "stormy" || weatherReport === "hot") {
    $(".weather-report").text("Forecast:.. " + weatherReport);
  } else {
    $(".weather-report").text("Forecast:.. " +  possibleWeather[weatherReport]);      
  }
};

function getLocation() {
  return $(".location-button:checked").val();
};

function getActualWeather() {
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
  $(".day-animation").text(weatherActual);
  console.log("The weather today is " + weatherActual + ".")
}

function calculateCustomers() {
  var multiplier = (possibleWeather.indexOf(weatherActual)) / 2;
  numOfCustomers = multiplier * numOfCustomers;

  switch (locationSelect) {
    case "D":
    multiplier = 1
    rent = 100;
    break;    
    case "Br":
    multiplier = 1.5
    rent = 300;
    break;    
    case "S":
    multiplier = 2
    rent = 500;
    break;    
    case "Bo":
    multiplier = 2.5
    rent = 900;
    break;
  }

  numOfCustomers = multiplier * numOfCustomers;

  if (todaysPrice < 10) {
    numOfCustomers = numOfCustomers * 10;
  } else if (todaysPrice > 100) {
    numOfCustomers = 2;
  } else {
    multiplier = (100 / todaysPrice);
    console.log(multiplier);
    numOfCustomers = multiplier * numOfCustomers;
  }

  return Math.floor(numOfCustomers);
}

function iceStock(){
  return iceQuantity * 100
}

function lemonStock(){
  return (lemonsQuantity.fresh + lemonsQuantity.oneDay) * 200;
}

function sugarStock(){
  return (sugarQuantity - (surplusSugar / 20)) * 100;
}

function totalStock(){
  return iceCost + lemonsCost + sugarCost;
}

// 1 ice   makes 10 lemonade -> iceQuantity
// 1 lemon makes 10 lemonade -> lemonsQuantity.fresh + lemonsQuantity.oneDay
// 1 sugar makes 20 lemonade -> sugarQuantity
function makeLemonade() {
  var ice     = iceQuantity;
  var lemons  = lemonsQuantity.fresh + lemonsQuantity.oneDay;
  var sugar   = sugarQuantity + surplusSugar;

  icePerLemonade    = 10;
  lemonsPerLemonade = 10;
  sugarPerLemonade  = 20;

  iceLimit    = ice*icePerLemonade;
  lemonLimit  = lemons*lemonsPerLemonade;
  sugarLimit  = sugar*sugarPerLemonade;
  maxLimit    = Math.min(iceLimit, lemonLimit, sugarLimit)

  ice         = (iceLimit - maxLimit)/icePerLemonade;
  lemons      = (lemonLimit - maxLimit)/lemonsPerLemonade;
  sugar       = (sugarLimit - maxLimit)/sugarPerLemonade;

  // Throw away the remaining old lemons
  if (maxLimit < lemonsQuantity.oneDay) {
    lemons -= (lemonsQuantity.oneDay - maxLimit);
  }

  iceQuantity           = 0;
  lemonsQuantity.fresh  = 0;
  lemonsQuantity.oneDay = lemons;
  suplusSugar           = sugar;


  // iceToLemonade = iceQuantity * 10;

  // var fLemonsToLemonade = lemonsQuantity.fresh * 10;
  // var oLemonsToLemonade = lemonsQuantity.oneDay * 10;
  // lemonsToLemonade = fLemonsToLemonade + oLemonsToLemonade;
  // sugarToLemonade = sugarQuantity * 20;

  // if (iceToLemonade <= lemonsToLemonade && iceToLemonade <= sugarToLemonade) {
  //   lemonadeProduced = iceToLemonade;
  //   surplusLemons = oLemonsToLemonade - lemonadeProduced;
  //   if (surplusLemons < 0) {
  //     surplusLemons = surplusLemons + fLemonsToLemonade;
  //     lemonsQuantity.fresh = surplusLemons / 10;
  //   } else if (surplusLemons > 0) {
  //     surplusLemons = surplusLemons + fLemonsToLemonade;
  //   } else {
  //     surplusLemons = fLemonsToLemonade
  //   }
  //   surplusSugar = sugarToLemonade - lemonadeProduced;
  // } else if (lemonsToLemonade <= iceToLemonade && lemonsToLemonade <= sugarToLemonade) {
  //   lemonadeProduced = lemonsToLemonade;
  //   surplusSugar = sugarToLemonade - lemonadeProduced;
  // } else {
  //   lemonadeProduced = sugarToLemonade;
  //   surplusLemons = oLemonsToLemonade - lemonadeProduced;
  //   if (surplusLemons < 0) {
  //     surplusLemons = surplusLemons + fLemonsToLemonade;
  //     lemonsQuantity.fresh = surplusLemons / 10;
  //   } else if (surplusLemons > 0) {
  //     surplusLemons = surplusLemons + fLemonsToLemonade;
  //   } else {
  //     surplusLemons = fLemonsToLemonade
  //   }
  // }
}

function calculateSales() {
  if (maxLimit >= numOfCustomers) {
    salesMade = numOfCustomers;
  } else {
    salesMade = maxLimit;
  }

  return salesMade;
}

// function calculateSales() {
//   if (lemonadeProduced >= numOfCustomers) {
//     salesMade = numOfCustomers;
//   } else {
//     salesMade = lemonadeProduced;
//   }

//   moneyMade = salesMade * todaysPrice;

//   console.log("You sold " + salesMade + " lemonades today. You have made " + moneyMade + ".")

//   // if (day !== 1) {
//   //   console.log("You spent " + rent + " on rent today")

//   //   runningTotal = morningTotal + moneyMade - rent;
//   // } else {
//   //   runningTotal = morningTotal + moneyMade;
//   // }

//   // if (runningTotal < 0) {
//   //   console.log("Your balance is " + runningTotal + ". GAME OVER SORRY.")
//   //   return;
//   // } else {
//   //   console.log("You have " + runningTotal + ".")
//   // }

// }

// surplusStock = function() {
//   console.log(" At the end of the day, there is " + lemonsQuantity.fresh + " fresh lemons and " + lemonsQuantity.oneDay + " day old lemons.") 
//   console.log("There is " + sugarQuantity + " sugar and " + iceQuantity + " ice.") 
//   if (day === 1) {
//     return;
//   } else {
//     console.log("You have enough surplus lemons from yesterday to produce " + surplusLemons + " glasses of lemonade.")
//     console.log("You have enough surplus sugar from yesterday to produce " + surplusSugar + " glasses of lemonade.")
//     iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));
//     lemonsQuantity.fresh = parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));
//     sugarQuantity =  (surplusSugar / 20) + parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));
//     todaysPrice = prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)");
//   }
// }


// getInitialStock = function() {
//   iceQuantity = parseInt(prompt("How many kilograms of ice would you like to purchase? (1kg costs 100 and makes 10 glasses of lemonade. Ice will melt after 1 day.)"));

//   lemonsQuantity.fresh = parseInt(prompt("How many kilograms of lemons would you like to purchase? (1kg costs 200 and makes 10 glasses of lemonade. Lemons are unusable after 2 days.)"));

//   sugarQuantity = parseInt(prompt("How many kilograms of sugar would you like to purchase? (1kg costs 100 and makes 20 glasses of lemonade. Sugar lasts forever.)"));

//   todaysPrice = parseInt(prompt("What price would you like to set for your lemonade today? (The local average for chilled non-alcoholic beverages is 80)"));
// }



