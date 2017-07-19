var React = require('react');
require('../index.css');

function Footer(props) {
	var date = new Date();
	var year = date.getFullYear();
	return(
		<div className='footer'>
			<p>&copy;{year} Matt Gaskey</p>
			<a href="https://darksky.net/" target="_blank"><img height='50px' src="https://darksky.net/dev/img/attribution/poweredby-darkbackground.png" alt="Dark Sky API" aria-hidden="true" /></a>
		</div>
	)
}

module.exports = Footer;