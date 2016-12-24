congratulate = (children...) ->
  alert 'Merry Christmas ' + child + '!' for child in children

congratulate('Mike', 'Nick', 'James')

christmasTree =
  star:  'red'
  garland: true
  light: =>
    alert 'Shine Christmas tree!' if this.garland
    this.star = 'yellow'
    return

christmasTree.light()

presents = []

addPresent = (present = 'chocolate') ->
  presents.push present

addPresent 'bicycle'
addPresent()

showFavoritePresents = (firstPresent, secondPresent) ->
  alert 'James favorite presents this year are ' + firstPresent + ' and ' + secondPresent

showFavoritePresents(presents...)
