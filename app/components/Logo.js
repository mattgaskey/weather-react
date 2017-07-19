var React = require('react');
require('../index.css');
var Link = require('react-router-dom').Link;
require('../sun.svg');

function Logo(props) {
	return(
		<Link
			to={{pathname: '/'}}
		>
			<div className="header-logo">
				<img src='/app/sun.svg' alt='sun' className='header-logo-img' />
				<h2 className='header-logo-text'>The Weather</h2>
			</div>
		</Link>
	)
}

module.exports = Logo;