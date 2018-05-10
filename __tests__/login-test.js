import 'react-native';
import React from 'react';
import Login from '../src/pages/login/login.index'

import renderer from 'react-text-renderer';

let findElement = function(LoginData, element) {
  console.warn(tree)
  let result = undefined;
  for(node in tree.children) {
    if (LoginData.children[node].props.testID==element) {
      result = true;
    }
  }
  return result;
}

it('Find Element',()=>{
  let LoginData = renderer.create(
    <Login />
  ).getInstance().toJSON();

  expect(findElement(LoginData,'username')).toBeDefined();
})
