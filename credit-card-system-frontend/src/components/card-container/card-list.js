import React from 'react';
import { Table } from 'react-bootstrap';

export default function CardsList({ cards }){
  return (
    <div>
      <h5> Existing Cards </h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Card Number</th>
            <th>Balance</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          { cards.map( ({ name, cardNumber, balance, limit }) => (
              <tr key={`${name}-${cardNumber}-${balance}-${limit}`}>
                <td>{name}</td>
                <td>{cardNumber}</td>
                <td>{balance}</td>
                <td>{limit}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  )
}