class Supplier
  constructor: (@name) ->
  supply: (amount, uniteOfMeasurement = 'pieces') ->
    @name + ' supplied ' + amount + ' ' + uniteOfMeasurement

class CoffeeSupplier extends Supplier
  supply: (amount, uniteOfMeasurement = 'kg') ->
    (super amount, uniteOfMeasurement) + 'of  coffee'

class SteelSupplier extends Supplier
  supply: (amount, uniteOfMeasurement = 'tons') ->
    (super amount, uniteOfMeasurement) + 'of  steel'

rob = new CoffeeSupplier('Rob Johnson')
steelTerra = new SteelSupplier('SteelTerra Inc')

alert rob.supply 20
alert steelTerra.supply 95
