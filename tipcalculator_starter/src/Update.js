import * as R from 'ramda';

const MSGS = {
  CHANGE_BILL_AMOUNT : 'CHANGE_BILL_AMOUNT',
  CHANGE_TIP_PERCENTAGE: 'CHANGE_TIP_PERCENTAGE'
}
export function changeBillAmount(value){
  return {
    type: MSGS.CHANGE_BILL_AMOUNT,
    billAmount:value
  }
}

export function changeTipPercentage(value){
  return {
    type: MSGS.CHANGE_TIP_PERCENTAGE,
    tipPercentage:value
  }
}

const parseIntWithFallback = R.pipe(
  parseInt,
  R.defaultTo(0)
)


const round = places =>
  R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places),
  );

const formatMoney = R.curry(
  (symbol, places, number) => {
    return R.pipe(
      R.defaultTo(0),
      round(places),
      num => num.toFixed(places),
      R.concat(symbol),
    )(number);
  }
);

function calculatedTip(model){
  const toMoney = formatMoney('$',2)
  const tip = model.billAmount * model.tipPercentage / 100;
  return {
    ...model,
  tip:toMoney(tip),
    total:toMoney(model.billAmount+tip)
  }
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.CHANGE_BILL_AMOUNT:
        return calculatedTip({
          ...model,
          billAmount:parseIntWithFallback(msg.billAmount)
        })
        case MSGS.CHANGE_TIP_PERCENTAGE:
          return calculatedTip({
            ...model,
            tipPercentage:parseIntWithFallback(msg.tipPercentage)
          })
  }
  return model;
}

export default update;
