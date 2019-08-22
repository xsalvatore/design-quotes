import React, { Component } from 'react';
import axios from 'axios';
import he from 'he';

class App extends Component {
	// holds the current state of the component
	state = {
		loading: true,
		quote: ''
	};

	// performs the quote fetching when the components have been mounted
	componentDidMount = () => {
		this.fetchQuote();
	};

	fetchQuote = () => {
		// holds the quote that will be fetched
		let quote = '';

		// needed to get a different quotes on every fetch - 42 is the biggest number usable
		let posts = Math.floor(Math.random() * 42);

		// fetches the data
		axios
			.get(
				`https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=${posts}`
			)
			.then((response) => {
				// saves the fetched quote
				quote = response.data[0].content;

				// removes the html tags at the beginning and end of the quote
				quote = quote.substr(3).slice(0, -5);

				// converts the html entities to text and saves it
				quote = he.decode(quote);
			})
			.then(() => {
				// sets the state with the quote that was fetched
				this.setState({
					loading: false,
					quote: quote
				});
			})
			.catch(function(error) {
				// prints the error if there is any
				console.log(error);
			});
	};

	// opens a new tab to send the quote as a tweet
	tweetQuote = () => {
		// opens a new tab to tweet the quote the user had received
		const win = window.open(
			`https://twitter.com/intent/tweet?text=${this.state.quote}`,
			'_blank'
		);

		// changes the tab to the one with twitter
		win.focus();
	};

	// renders the components
	render() {
		return (
			<div className='app'>
				<div className='quote-wrapper'>
					<section>
						<h1>Random Quotes Machine</h1>
						<p className='quote'>
							{this.state.loading ? '' : this.state.quote}
						</p>
					</section>

					<section>
						<button onClick={this.fetchQuote}>Get Quote</button>
						<button onClick={this.tweetQuote}>Tweet Quote</button>
					</section>

					<footer>
						Quotes provided by the{' '}
						<a
							href='https://quotesondesign.com/api-v4-0/'
							rel='noopener noreferrer'
							target='_blank'
						>
							{' '}
							quotesondesign{' '}
						</a>{' '}
						API.
					</footer>
				</div>
			</div>
		);
	}
}

export default App;
