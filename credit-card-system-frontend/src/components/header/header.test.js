import React from 'react';
import Header from './index';
import renderer from 'react-test-renderer';

test('Render Header', () => {
  const component = renderer.create(<Header />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});