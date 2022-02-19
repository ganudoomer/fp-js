import * as R from 'ramda';

const MSGS = {
  LEFT_INPUT_VALUE:'LEFT_INPUT_VALUE',
  RIGHT_INPUT_VALUE:'RIGHT_INPUT_VALUE',
  LEFT_UNIT_CHANGED:'LEFT_UNIT_CHANGED',
  RIGHT_UNIT_CHANGED:'RIGHT_UNIT_CHANGED'
}

export function leftInputValueMessage(value){
    return {
      type: MSGS.LEFT_INPUT_VALUE,
      value
    }
}

export function leftUnitMessage(value){
  return {
    type: MSGS.LEFT_UNIT_CHANGED,
    value
  }
}

export function rightUnitMessage(value){
  return {
    type: MSGS.RIGHT_UNIT_CHANGED,
    value
  }
}

export function rightInputValueMessage(value){
  return {
    type: MSGS.RIGHT_INPUT_VALUE,
    value
  }
}

const toInt = R.pipe(parseInt,
    R.defaultTo(0)
    )


function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_INPUT_VALUE:
    return convert({
      ...model,
      sourceLeft:true,
     leftTempValue: toInt(msg.value)
    })
    case MSGS.RIGHT_INPUT_VALUE:
      return convert({
        ...model,
        sourceLeft:false,
       rightTempValue: toInt(msg.value)
      })
      case MSGS.LEFT_UNIT_CHANGED:
        return convert({
          ...model,
          leftTempUnit: msg.value
        })
      case MSGS.RIGHT_UNIT_CHANGED:
          return convert({
            ...model,
            rightTempUnit: msg.value
        })
  }
  return model;
}


function convert(model){
  const {  leftTempValue,leftTempUnit,
    rightTempValue,
    rightTempUnit,
    } = model;
 
 const [fromUnit,fromTemp,toUnit] = model.sourceLeft ? 
  [leftTempUnit,leftTempValue,rightTempUnit] : 
  [rightTempUnit,rightTempValue,leftTempUnit]

  const convertedTemp  = R.pipe(convertFromToTemp,round)(fromUnit,fromTemp,toUnit)
  
  return model.sourceLeft ? {
    ...model,
    rightTempValue:convertedTemp
  } : {
    ...model,
    leftTempValue:convertedTemp
  } 
}

function convertFromToTemp(fromUnit,fromTemp,toUnit){
    const convertFn = R.pathOr(
      R.identity,
      [fromUnit,toUnit],
      UnitConversions
    )
    return convertFn(fromTemp)
}

function round(number) {
  return Math.round(number * 10) / 10;
}


function FtoC(temp) {
  return 5 / 9 * (temp - 32);
}

function CtoF(temp) {
  return 9 / 5 * temp + 32;
}

function KtoC(temp) {
  return temp - 273.15;
}

function CtoK(temp) {
  return temp + 273.15;
}

const FtoK = R.pipe(FtoC,CtoK)
const KtoF = R.pipe(KtoC,CtoF)

const UnitConversions = {
  Celsius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK,
  },
  Fahrenheit: {
    Celsius: FtoC,
    Kelvin: FtoK,
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF,
  },
};

export default update;
