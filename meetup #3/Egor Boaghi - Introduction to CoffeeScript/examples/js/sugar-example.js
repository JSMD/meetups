// Generated by CoffeeScript 1.12.2
(function() {
  var calculateTaxes, payTaxes, price, taxes, treasure, treasureEvaluation;

  treasure = 'gold';

  treasureEvaluation = function(treasure) {
    switch (treasure) {
      case 'ruby':
        return 1000;
      case 'emerald':
        return 900;
      case 'gold':
        return 800;
      case 'silver':
        return 700;
      default:
        return 0;
    }
  };

  price = treasureEvaluation(treasure);

  calculateTaxes = function(price) {
    var percent, taxes;
    percent = 0;
    if (price >= 900) {
      percent = 48;
    } else if (price >= 800) {
      percent = 36;
    } else if (price >= 700) {
      percent = 24;
    }
    return taxes = price * percent / 100;
  };

  taxes = calculateTaxes(price);

  payTaxes = function() {
    return console.log('Taxes:' + taxes + ', remaining money:' + (price - taxes));
  };

  payTaxes();

}).call(this);

//# sourceMappingURL=sugar-example.js.map
