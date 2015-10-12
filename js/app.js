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

$(function() {

  $(".user-input-screen").hide();
  $(".lemonade-stand-display").show();


  lemonade = {}

  var 
  runningTotal = 1000, numOfCustomers = 10,

  possibleWeather = ["stormy", "raining", "cloudy", "warm", "hot"], reportDay,

  iceQuantity, lemonsQuantity = {fresh: 0, oneDay: 0}, sugarQuantity, $todaysPrice,

  iceCost, lemonsCost, sugarCost, stockCost, morningTotal,

  iceToLemonade, lemonsToLemonade, sugarToLemonade, lemonadeProduced,

  locationSelect, rent,

  salesMade, moneyMade;

  var day = 1;
  var surplusLemons, surplusSugar;

  setup = function() {
    $(".lemonade-stand-display").hide();
    $(".user-input-screen").show();
    getReportedWeather();
    addIncDecButtons();
    addStartButton();
  }

  addStartButton = function() {
    $(".start-button").on("click", function() {
      $(".user-input-screen").hide();
      $(".lemonade-stand-display").show();
    })
  }

  addIncDecButtons = function() {
    var $lemonNum = parseInt($("#input-lemon").text());
    $("#decrement-lemon").on("click", function() {
      $lemonNum--
      $("#input-lemon").text($lemonNum);
    })
    $("#increment-lemon").on("click", function() {
      $lemonNum++
      $("#input-lemon").text($lemonNum)
    })
    var $iceNum = parseInt($("#input-ice").text());
    $("#decrement-ice").on("click", function() {
      $iceNum--
      $("#input-ice").text($iceNum)
    })
    $("#increment-ice").on("click", function() {
      $iceNum++
      $("#input-ice").text($iceNum)
    })
    var $sugarNum = parseInt($("#input-sugar").text());
    $("#decrement-sugar").on("click", function() {
      $sugarNum--
      $("#input-sugar").text($sugarNum)
    })
    $("#increment-sugar").on("click", function() {
      $sugarNum++
      $("#input-sugar").text($sugarNum)
    })

    $(".price-input").text(50);
    $todaysPrice = parseInt($(".price-input").text());
    $("#decrement-price").on("click", function() {
      $todaysPrice -= 10;
      $(".price-input").text($todaysPrice)
      console.log("the click is working")
      console.log($todaysPrice)
    })
    $("#increment-price").on("click", function() {
      $todaysPrice += 10;
      $(".price-input").text($todaysPrice)
    })
  }

  getReportedWeather = function() {
    $(".day-display").text("Day no." + day);

    var random = Math.random();
    // if (day === 1) {
    //   reportDay = " today."
    // } else {
    //   reportDay = " tomorrow."
    // }
    if (random < 0.05) {
      weatherReport = possibleWeather[0];
      $(".weather-report").text("Forecast:.. " + weatherReport 
        // + reportDay
        )
    } else if (random >= 0.05 && random < 0.25) {
      weatherReport = 1;
      $(".weather-report").text("Forecast:.. " + possibleWeather[1] 
        // + reportDay
        )
    } else if (random >= 0.25 && random < 0.55) {
      weatherReport = 2;
      $(".weather-report").text("Forecast:.. " + possibleWeather[2] 
        // + reportDay
        )
    } else if (random >= 0.55 && random < 0.90) {
      weatherReport = 3;
      $(".weather-report").text("Forecast:.. " +  possibleWeather[3] 
        // + reportDay
        )
    } else {
      weatherReport = possibleWeather[4];
      $(".weather-report").text("Forecast:.. " + weatherReport 
        // + reportDay
        )
    }
    if (day === 1) {
      // getInitialStock();
    } else {
      // surplusStock();
    }
  };

  getLocation = function() {
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
    var multiplier = (possibleWeather.indexOf(weatherActual)) / 2;
    numOfCustomers = multiplier * numOfCustomers;

    if (day !== 1) {
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
    }

    if (todaysPrice < 10) {
      numOfCustomers = numOfCustomers;
    } else if (todaysPrice > 100) {
      numOfCustomers = 2;
    } else {
      numOfCustomers = (500 / todaysPrice);
    }

    numOfCustomers = Math.floor(numOfCustomers);

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
    debugger
    if (lemonadeProduced >= numOfCustomers) {
      salesMade = numOfCustomers;
    } else {
      salesMade = lemonadeProduced;
    }

    moneyMade = salesMade * todaysPrice;

    console.log("You sold " + salesMade + " lemonades today. You have made " + moneyMade + ".")

    if (day !== 1) {
      console.log("You spent " + rent + " on rent today")

      runningTotal = morningTotal + moneyMade - rent;
    } else {
      runningTotal = morningTotal + moneyMade;
    }

    if (runningTotal < 0) {
      console.log("Your balance is " + runningTotal + ". GAME OVER SORRY.")
      return;
    } else {
      console.log("You have " + runningTotal + ".")
    }

    day++;
    numOfCustomers = 10;
    iceQuantity = 0;
    lemonsQuantity.oneDay = lemonsQuantity.fresh
    lemonsQuantity.fresh = 0;
    getReportedWeather();
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
    getLocation();
  }

})
