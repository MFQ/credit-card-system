import React, { Component } from 'react';
import axios from "axios";
import { Alert } from "react-bootstrap";

import CardForm from './card-form';
import CardsList from './card-list';
import { Host } from "./../../core/constant"

export default class CardContainer extends Component {

	constructor(props) {
    super(props);

    this.state = {
			cards: [],
			loading: false,
			error: "",
		};
		this.setError = this.setError.bind(this);
		this.fetchCards = this.fetchCards.bind(this);
	}

	componentDidMount(){
		this.fetchCards();
	}

	fetchCards () {
		this.setState({ 
			loading: true,
		});
		axios.get(`${Host}/cards`)
			.then( ({ data }) => this.setState(
				{ 
					cards: data,
					loading: false,
					error: ""  
				}
			))
			.catch( err => {
				this.setState({ error: "Unable to fetch cards"})
			});
	}

	setError ({ response }) {
		const responsError = response.data && 
			response.data.error && 
			response.data.error.details ? response.data.error.details.map( e => e.message ).join(", ") : "Something went wrong."
		this.setState({ error: responsError });
	}

	render() {
		const { cards, loading, error } = this.state;
		return (
			<div>
				{ error !== "" && ( <div>
					{error.split(",").map( (e) => (<Alert dismissible key={e} variant={'danger'}> {e} </Alert>) )}
					</div> ) }
				<CardForm setError={this.setError} fetchCards={this.fetchCards} />
				{
					!loading && (<CardsList cards={cards} />)
				}
			</div>
		)
	}
}