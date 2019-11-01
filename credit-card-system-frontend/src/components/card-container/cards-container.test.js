import React from 'react';
import renderer from 'react-test-renderer';

import CardsList from "./card-list";
import CardForm from "./card-form";
import CardContainer from "./index";

const cards = [
  {
    name: "asa",
    cardNumber: "213",
    balance:11,
    limit: 12,
  }
]

test('Render CardsList', () => {
  const component = renderer.create(
    <CardsList cards={cards}/>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CardForm', () => {
  const component = renderer.create(
    <CardForm />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render CardContainer', () => {
  const component = renderer.create(
    <CardContainer />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});