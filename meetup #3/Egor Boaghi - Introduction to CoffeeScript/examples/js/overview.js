// Generated by CoffeeScript 1.12.2
(function() {
  var simpleClass, simpleFunction, simpleObject;

  simpleFunction = function(x) {
    return x + 1;
  };

  simpleObject = {
    text: 'What is CoffeeScript?',
    printMessage: function() {
      return console.log(this.text);
    }
  };

  simpleClass = (function() {
    function simpleClass(number) {
      this.number = number;
    }

    simpleClass.prototype.multipleBy = function(multiplier) {
      return multiplier * this.number;
    };

    return simpleClass;

  })();

}).call(this);

//# sourceMappingURL=overview.js.map
