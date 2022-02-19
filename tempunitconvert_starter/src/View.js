import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { leftInputValueMessage, leftUnitMessage, rightInputValueMessage, rightUnitMessage } from './Update';

const {
  div,
  h1,
  pre,
  input,
  select,
  option
} = hh(h);

function unitOptions(selectedUnit) {
  return R.map( 
    unit => option({ value: unit, selected: selectedUnit === unit}, unit),
    UNITS
  )
}

const UNITS = ['Fahrenheit', 'Celsius', 'Kelvin'];


function unitSection(dispatch,unit, value, oninput,onchange) {
  return div({ className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value,
      oninput:(e)=>dispatch(oninput(e.target.value))
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black',
        onchange:(e)=>dispatch(onchange(e.target.value))
      },
      unitOptions(unit),
    ),
  ]);
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({className:'flex'},[
      unitSection(
        dispatch,
        model.leftTempUnit,
        model.leftTempValue,
        leftInputValueMessage,
        leftUnitMessage
        ),
      unitSection(
        dispatch,
        model.rightTempUnit,
        model.rightTempValue,
        rightInputValueMessage,
        rightUnitMessage
        )
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
