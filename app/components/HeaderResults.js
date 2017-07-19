var React = require('react');
require ('../index.css');
var Logo = require('./Logo');
var SearchArea = require('./SearchArea');
var PropTypes = require('prop-types');

class HeaderResults extends React.Component {
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
			<div className='header'>
				<Logo />
				<div className='header-search'>
					<SearchArea
						formClass='row' 
						inputClass='header-search-input' 
						buttonClass='header-search-button'
						radioClass='unit-selectors-column'
						handleSubmit={this.handleSubmit}
						handleUnitChange={this.handleUnitChange}
						units={this.props.units}
					/>
				</div>
			</div>
		)
	}
}

HeaderResults.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUnitChange: PropTypes.func.isRequired
}

module.exports = HeaderResults;