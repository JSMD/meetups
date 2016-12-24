  simpleFunction = (x) -> x + 1

  simpleObject =
    text: 'What is CoffeeScript?'
    printMessage: -> console.log this.text

  class simpleClass
    constructor: (@number) ->

    multipleBy: (multiplier) -> multiplier * @number
