var React = require('react');
require('../index.css');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Main = require('./Main');
var Results = require('./Results');
var Footer = require('./Footer');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loc: '',
			units: 'us'
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUnitChange = this.handleUnitChange.bind(this);
		this.reset = this.reset.bind(this);
	}

	handleSubmit(loc, units) {
		this.setState(function() {
			return {
				loc: loc,
				units: units
			}
		});
	}

	handleUnitChange(units) {
		this.setState(function() {
			return {
				units: units
			}
		});
	}

	reset() {
		this.setState(function() {
			return {
				loc: '',
				units: 'us'
			}
		});
	}

	render() {
		return(
			<Router>
				<div>
					<Switch>
						<Route exact path='/' render={function(props) {
							return (
								<Main 
									handleSubmit={this.handleSubmit}
									handleUnitChange={this.handleUnitChange}
									units={this.state.units}
								/>
							)
						}.bind(this)} />
						<Route path='/weather' render={function(props) {
							return (
								<Results 
									handleUnitChange={this.handleUnitChange}
									handleSubmit={this.handleSubmit}
									loc={this.state.loc}
									units={this.state.units}
									reset={this.reset}
								/>
							)
						}.bind(this)} />
						<Route render={function() {
							return(
								<div className="not-found">
									<h1>404: Not Found</h1>
								</div>
							)
						}} />
					</Switch>
					<Footer />
				</div>
			</Router>
			
		)
	}
}

module.exports = App;