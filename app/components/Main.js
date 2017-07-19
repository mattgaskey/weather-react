var React = require('react');
var SearchArea = require('./SearchArea');
var HeaderMain = require('./HeaderMain');
require('../index.css');

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUnitChange = this.handleUnitChange.bind(this);
	}

	handleSubmit(loc, units) {
		this.props.handleSubmit(loc, units);
	}

	handleUnitChange(units) {
		this.props.handleUnitChange(units);
	}

	render() {
		return(
			<div>
				<HeaderMain />
				<div className='main-container'>
					<h1 className='main-heading'>Enter City, State</h1>
					<SearchArea
						formClass='column' 
						inputClass='search-input' 
						buttonClass='search-button'
						radioClass='unit-selectors-row'
						handleSubmit={this.handleSubmit}
						handleUnitChange={this.handleUnitChange}
						units={this.props.units}
					/>
				</div>
			</div>
		)
	}
}

module.exports = Main;