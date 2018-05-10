import 'react-native';
import React from 'react';
import Login from '../src/pages/register/register.index'

import renderer from 'react-text-renderer';

let findElement = function(RegisterData, element) {
  console.warn(tree)
  let result = undefined;
  for(node in tree.children) {
    if (RegisterData.children[node].props.testID==element) {
      result = true;
    }
  }
  return result;
}

it('Find Element',()=>{
  let RegisterData = renderer.create(
    <Register />
  ).getInstance().toJSON();

  expect(findElement(RegisterData,'username')).toBeDefined();
})
