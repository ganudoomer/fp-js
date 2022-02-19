import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { changeBillAmount, changeTipPercentage } from './Update';

const {
  div,
  h1,
  pre,
  label,
  input
} = hh(h);


function inputSet(name, value, oninput) {
  return div({ className: 'w-40' }, [
    label({ className: 'db fw6 lh-copy f5' }, name),
    input({
      className: 'border-box pa2 ba mb2 tr w-100',
      type: 'text',
      value,
      oninput,
    }),
  ]);
}

function calculatedAmounts(tip, total) {
  return div({ className: 'w-40 b bt mt2 pt2' }, [
    calculatedAmount('Tip:', tip),
    calculatedAmount('Total:', total),
  ]);
}

function calculatedAmount(description, amount) {
  return div({ className: 'flex w-100' }, [
    div({ className: 'w-50 pv1 pr2' }, description),
    div({ className: 'w-50 tr pv1 pr2' }, amount),
  ]);
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', model.billAmount, e => dispatch(changeBillAmount(e.target.value))
  ),
  inputSet('Tip %', model.tipPercentage, e =>dispatch(changeTipPercentage(e.target.value))),
  calculatedAmounts(model.tip, model.total),
  ]);
}

export default view;
