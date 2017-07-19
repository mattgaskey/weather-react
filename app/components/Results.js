var React = require('react');
require('../index.css');
var queryString = require('query-string');
var HeaderResults = require('./HeaderResults');
var api = require('../utils/api');
var Loading = require('./Loading');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

function switchIcon(prognosis) {
		switch (prognosis) {
      case "clear-day":
			case "clear-night":
          return 	<div>
            				<div className="sun">
            					<div className="rays"></div> 
            				</div>
            			</div>;
      case "rain":
			case "sleet":
      		return 	<div>
      							<div className="cloud"></div>
      							<div className="rain"></div>
      						</div>;
      case "cloudy":
			case "fog":
      		return	<div>	
      							<div className="cloud"></div>
      							<div className="cloud"></div>
      						</div>;
      case 'snow':
      		return	<div>
        						<div className="cloud"></div>
        						<div className="snow">
        							<div className="flake"></div>
        							<div className="flake"></div>
        						</div>
        					</div>;
      case "partly-cloudy-day":
			case "partly-cloudy-night":
          return	<div>
            				<div className="cloud"></div>
            				<div className="sun">
            					<div className="rays"></div>
            				</div>
            			</div>;
      default:
      		return	<div>
        						<div className="cloud"></div>
        						<div className="lightning">
        							<div className="bolt"></div>
        							<div className="bolt"></div>
        						</div>
        					</div>;
		}
	}


function ResultDetail(props) {
	var arrayIndex = props.arrayIndex;
	var res = props.res.daily.data[arrayIndex];
	var date = res.time;
	var d = new Date(date*1000);
	var dayOfWeek = d.getDay();
	var month = d.getMonth();
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var nDay = weekday[dayOfWeek];
	var nMonth = months[month];
	var nDate = d.getDate();
	return(
		<div className='detail-container'>
			<ul className='forecast-detail'>
				<li className='forecast-detail-date'>{nDay}, {nMonth} {nDate}</li>
				<li className='icon'>{switchIcon(res.icon)}</li>
				<li className='prognosis'>{res.summary}</li>
				{res.precipProbability !== 0 &&
					<li className='temp'>Chance of {res.precipType}: {Math.floor(res.precipProbability*100)}%</li>
				}
				
				<li className='temp'>Humidity: {Math.floor(res.humidity*100)}%</li>
				<li className='temp'>High: {Math.floor(res.temperatureMax)}&deg;</li>
				<li className='temp'>Low: {Math.floor(res.temperatureMin)}&deg;</li>
				<li className='forecast-detail-exit' onClick={props.exitDetail} >Back</li>
			</ul>
		</div>
	)
}

ResultDetail.propTypes = {
	res: PropTypes.object.isRequired,
	arrayIndex: PropTypes.number.isRequired,
	exitDetail: PropTypes.func.isRequired
}

function Forecast(props) {
	var dayList = props.future;
	var currently = props.current;
	var city = props.city;
	return(
		<div className='forecast-container'>
			<div className='forecast-current'>
				<h2 className='currently-title'>Currently in <br /><span className='city-title'>{city}</span>:</h2>
				<ul>
					<li className='icon'>
						{switchIcon(currently.icon)}
	    		</li>
					<li className='prognosis'>{currently.summary}</li>
					<li className='temp'>{Math.floor(currently.temperature)}&deg;</li>
				</ul>
			</div>
			{dayList.map(function(day, index) {
				if (index < 7) {
					var d = new Date(day.time*1000);
					var dayOfWeek = d.getDay();
					var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
					var n = weekday[dayOfWeek];
					var icon = day.icon;
					function clickHandle(indexCopy) {
						return function() {
							props.handleClick(indexCopy)
						};
					}

					return (
						<div className='forecast-future' key={index}>
							<h2 className='day-title'>{n}</h2>
							<Link 
								to={{
									pathname: location.pathname,
									search: location.search
								}} 
								className='link-to-detail'
								onClick={clickHandle(index)}
								>
								<div className='icon'>{switchIcon(icon)}</div>
							</Link>
						</div>
					)
				}
			})}
		</div>
	)
}

Forecast.propTypes = {
	city: PropTypes.string.isRequired,
	current: PropTypes.object.isRequired,
	future: PropTypes.array.isRequired,
	handleClick: PropTypes.func.isRequired
}

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loc: this.props.loc,
			units: this.props.units,
			res: null,
			error: null,
			loading: true,
			detail: false,
			detailDay: null
		}

		this.handleFormData = this.handleFormData.bind(this);
		this.handleUnitChange = this.handleUnitChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.exitDetail = this.exitDetail.bind(this);
	}

	handleFormData(loc, units) {
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
		this.props.handleUnitChange(units);
	}

	handleClick(index) {
		this.setState(function() {
			return {
				detail: true,
				detailDay: index
			}
		});
	}

	exitDetail() {
		this.setState(function() {
			return {
				detail: false,
				detailDay: null
			}
		});
	}

	reset() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.loc !== this.state.loc || prevState.units !== this.state.units) {
		
			var dark = api.getDarkSky;

				api.weather(this.state.loc, this.state.units)
					.then(function(res) {
						return dark(res, this.state.units);
					}.bind(this))
					.then(function(newRes) {
						this.setState(function() {
							return {
								res: newRes,
								loc: this.state.loc,
								units: this.state.units,
								loading: false
							}
						})
					}.bind(this))
					.catch(function(err) {
						this.setState(function() {
							return {
								error: 'Something went wrong.  Maybe it was you, maybe it was us.',
								loading: false
							}
						});
					}.bind(this))
				}
	}

	componentDidMount() {
		var loc = this.state.loc;
		var units = this.state.units;
		var dark = api.getDarkSky;

		api.weather(loc, units)
			.then(function(res) {
				return dark(res, units);
			})
			.then(function(newRes) {
				this.setState(function() {
					return {
						res: newRes,
						loc: loc,
						units: units,
						loading: false
					}
				})
			}.bind(this))
			.catch(function(err) {
				this.setState(function() {
					return {
						error: 'Something went wrong.  Maybe it was you, maybe it was us.',
						loading: false
					}
				});
			}.bind(this))
		}

	render() {
		var error = this.state.error;
		var loading = this.state.loading;
		var res = this.state.res;

		if (loading === true) {
			return (
				<Loading />
			)
		}

		if (error) {
			return (
				<div className='error'>
					<p className='error-message'>{error}</p>
					<p className='error-message'>(It was you.)</p>
					<Link to='/' className='try-again' onClick={this.reset}>Try again</Link>
				</div>
			)
		}

		return(
			<div className='results-container'>
				{this.state.detail === false &&
					<HeaderResults 
						handleSubmit={this.handleFormData}
						handleUnitChange={this.handleUnitChange}
						units={this.props.units}
					/>
				}
				{this.state.detail === false &&
					<Forecast 
						city={this.state.loc} 
						current={this.state.res.currently}
						future={this.state.res.daily.data}
						handleClick={this.handleClick}
					/>
				}
				{this.state.detail === true && 
					<ResultDetail 
						res={this.state.res}
						arrayIndex={this.state.detailDay}
						exitDetail={this.exitDetail}
					/>
				}
			</div>
		)
	}
}

Results.propTypes = {
	loc: PropTypes.string.isRequired,
	units: PropTypes.string.isRequired
}

module.exports = Results;