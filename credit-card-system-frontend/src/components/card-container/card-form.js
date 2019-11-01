import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

import validateCardNumber from "../../core/luhn-validation";
import "./card-form.css";
import { Host } from "./../../core/constant"

export default class CardForm extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			cardNumber: "",
			limit: "",
			nameError: "",
			cardNumberError: "",
			limitError: "",
		}
		this.onChangeInput = this.onChangeInput.bind(this);
		this.addCard = this.addCard.bind(this);
		this.validate = this.validate.bind(this);
	}

	addCard () {
		const { name, cardNumber, limit } = this.state;
		const { setError, fetchCards } = this.props;
		axios({
			url:`${Host}/cards`,
			method: "POST",
			data: {
				name,
				cardNumber,
				limit,
				balance: 12
			},
			headers: { 'Content-Type': 'application/json' }
		})
			.then( (data) => fetchCards())
			.catch( (e) => setError(e) );
	}

	validate(e) {
		let result = "";
		if (e.target && e.target.name) {
			switch (e.target.name) {
				case "name":
					const { name } = this.state;
					result = name !== "" ? "" : "Plese enter Card holder name";
					this.setState({ nameError: result });
					break;
				case "cardNumber": 
					const { cardNumber } = this.state;
					result = validateCardNumber(cardNumber) ? "" : " Please enter valid card number";
					this.setState({ cardNumberError: result });
					break;
				case "limit": 
					const { limit } = this.state;
					result = limit !== "" ? "" : "Plese enter Card limit";
					this.setState({ limitError: result });
					break;
				default:
					break;
			}
		}
	}

	onChangeInput (e) {
		const { target } = e;
		if (target && target.name) {
			this.setState({
				[target.name]: target.value
			});
		}
	}

	render() {
		const { 
			name, 
			cardNumber, 
			limit,
			nameError,
			cardNumberError,
			limitError,
		} = this.state;
		return (
			<div className="card-form">
				<h5> Add card </h5>
				<Form>
					<Form.Group> 
						<Form.Label> Name </Form.Label>
						<Form.Control
							type="text" 
							name="name"
							onChange={this.onChangeInput}
							value={name}
							onBlur={this.validate}
						/>
						{nameError && (
							<Form.Text className="text-muted-error">
								{nameError}
							</Form.Text>
						)}
					</Form.Group>
					<Form.Group> 
						<Form.Label> Card Number </Form.Label>
						<Form.Control
							type="text" 
							name="cardNumber" 
							onChange={this.onChangeInput} 
							value={cardNumber} 
							onBlur={this.validate}
						/>
						{cardNumberError && (
							<Form.Text className="text-muted-error">
								{cardNumberError}
							</Form.Text>
						)}
					</Form.Group>
					<Form.Group> 
						<Form.Label> Limit </Form.Label>
						<Form.Control
							type="text" 
							name="limit" 
							onChange={this.onChangeInput} 
							value={limit} 
							onBlur={this.validate}
						/>
						{limitError && (
							<Form.Text className="text-muted-error">
								{limitError}
							</Form.Text>
						)}
					</Form.Group>
					<Button type="button" onClick={this.addCard}> Add </Button>
				</Form>
			</div>
		)
	}
}