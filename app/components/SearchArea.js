var React = require('react');
var Link = require('react-router-dom').Link;
require('../index.css');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function WrappedLink(props) {
	return(
		<Link
				to={{
					pathname: '/weather'
				}}
			>
			<button
				onClick={props.handleClick}
				className={'button ' + props.buttonClass}
				disabled={props.loc === ''}
			>
			Get Forecast
			</button>
		</Link>
	)
}

WrappedLink.propTypes = {
	loc: PropTypes.string.isRequired,
	units: PropTypes.string.isRequired,
	buttonClass: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired
}

class SearchArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loc: '',
			units: this.props.units
		}

		this.handleUnitChange = this.handleUnitChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleUnitChange(event) {
		var value = event.target.value;
		this.setState(function() {
			return {
				units: value
			}
		});
		this.props.handleUnitChange(value);
	}

	handleSubmit() {
		this.props.handleSubmit(
			this.state.loc,
			this.state.units
		);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState(function() {
			return {
				loc: value
			}
		});
	}

	render() {
		var loc = this.props.loc;

		return(
			<form 
				className={this.props.formClass} 
			>
				<input 
					id='location'
					className={'input ' + this.props.inputClass}
					placeholder='ex: Chicago, IL'
					autoComplete='off'
					type='text'
					value={this.state.loc}
					onChange={this.handleChange}
				/>
				<WrappedLink
					className='button-wrapper'
					handleClick={this.handleSubmit}
					buttonClass={this.props.buttonClass}
					loc={this.state.loc}
					units={this.state.units}
				/>
				<div className={this.props.radioClass}>
					<label htmlFor="imperial">
					<input 
							type="radio"
							id="imperial"
							value="us" 
							checked={this.state.units === 'us'} 
							onChange={this.handleUnitChange} 
					/>
					F</label>
	  			<label htmlFor="metric">
	  			<input 
						type="radio"
						id="metric"
						value="si" 
						checked={this.state.units === 'si'} 
						onChange={this.handleUnitChange} 
					/>
					C</label>
  			</div>
			</form>
		)
	}
}

SearchArea.propTypes = {
	formClass: PropTypes.string.isRequired,
	inputClass: PropTypes.string.isRequired,
	buttonClass: PropTypes.string.isRequired,
	radioClass: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired
}

module.exports = SearchArea;