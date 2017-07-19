var React = require('react');
require ('../index.css');
var Logo = require('./Logo');

class HeaderMain extends React.Component {
	render() {
		return(
			<div className='header header-main'>
				<Logo />
			</div>
		)
	}
}

module.exports = HeaderMain;