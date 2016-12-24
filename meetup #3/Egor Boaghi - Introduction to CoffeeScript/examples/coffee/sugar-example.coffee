treasure = 'gold'

treasureEvaluation = (treasure) ->
  switch treasure
    when 'ruby' then 1000
    when 'emerald' then 900
    when 'gold' then 800
    when 'silver' then 700
    else 0

price = treasureEvaluation treasure

calculateTaxes = (price) ->
  percent = 0
  if price >= 900
    percent = 48
  else if price >= 800
    percent = 36
  else if price >= 700
    percent = 24

  taxes = price * percent / 100

taxes = calculateTaxes price

payTaxes = ->
  console.log 'Taxes:' + taxes + ', remaining money:' + (price-taxes)

payTaxes()
