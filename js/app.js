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
    
    surplusSugar = 0;

    function setup() {
      $(".lemonade-stand-display").hide();
      $(".user-input-screen").hide();
      $(".instructions").show();
      $(".fail").hide();
      $(".start").on("click", clearInstructions);
      $(".start-button").on("click", showDay);
    }

    function clearInstructions() {
      itsANewDay();
      setupButtons();
      $(".lemonade-stand-display").hide();
      $(".user-input-screen").show();
      $(".instructions").hide();
      $(".fail").hide();
    }

    function itsANewDay(){
      if (runningTotal < 0 || (runningTotal < 5000 && day === 6)) {
        $(".lemonade-stand-display").hide();
        $(".user-input-screen").hide();
        $(".instructions").hide();
        $(".fail").show();
      }

      else {
        $(".lemonade-stand-display").hide();
        $(".user-input-screen").show();
        $(".instructions").hide();
        $(".fail").hide();

        ["lemon", "ice", "sugar"].forEach(function(element){
          $("#input-"+element).text(0);
        })
        $("#input-price").text(50);

        getReportedWeather();
      }
    }

    function showDay() {
      getActualWeather();

      iceQuantity          = parseInt($("#input-ice").text());
      lemonsQuantity.fresh = parseInt($("#input-lemon").text());
      sugarQuantity        = parseInt($("#input-sugar").text());
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

      runningTotal = calculateRunningTotal();

      $(".sales-num").text(salesMade);
      $(".balance-num").text(runningTotal);

      $(".surplusL-num").text(lemonsQuantity.oneDay);
      $(".surplusS-num").text(surplusSugar);

      day++;

      numOfCustomers = 10;
      $(".end-day-button").on("click", itsANewDay)
    }

    function calculateRunningTotal(){
      return runningTotal - stockCost - rent + (salesMade * todaysPrice);
    }

    function setupButtons(){
      setupButton("lemon", 1);
      setupButton("ice", 1);
      setupButton("sugar", 1);
      setupButton("price", 10);
    }

    function setupButton(selector, increment) {
      $("#decrement-"+selector).on("click", function() { 
        var val = parseInt($("#input-"+selector).text());
        val -= increment; 
        $("#input-"+selector).text(val);
      });
      $("#increment-"+selector).on("click", function() {
        var val = parseInt($("#input-"+selector).text());
        val += increment; 
        $("#input-"+selector).text(val); 
      });
    }

// ["stormy", "raining", "cloudy", "warm", "hot"]
function getReportedWeather() {
  $(".day-display").text("Day no." + day + ".." + "Balance: " + runningTotal);

  var random = Math.random();

  if (random < 0.03) {
    weatherReport = possibleWeather[0];
  } else if (random >= 0.03 && random < 0.20) {
    weatherReport = 1;
  } else if (random >= 0.20 && random < 0.50) {
    weatherReport = 2;
  } else if (random >= 0.50 && random < 0.90) {
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
  $(".day-animation").attr("id", "day-animation-" + weatherActual);
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
  todaysPrice = parseInt($("#input-price").text());

  if (todaysPrice < 10) {
    numOfCustomers = numOfCustomers * 10;
  } else if (todaysPrice > 100) {
    numOfCustomers = 2;
  } else {
    multiplier = (100 / todaysPrice);
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
  return (sugarQuantity) * 100;
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
  var sugar   = sugarQuantity;

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
    maxLimit - lemonsQuantity.oneDay
  }
  if (maxLimit < lemonsQuantity.oneDay) {
    lemons -= (lemonsQuantity.oneDay - maxLimit);
  }

  iceQuantity           = 0;
  lemonsQuantity.fresh  = 0;
  lemonsQuantity.oneDay = lemons;
  surplusSugar          = sugar;
}

function calculateSales() {
  if (maxLimit >= numOfCustomers) return numOfCustomers;
  return maxLimit;
}