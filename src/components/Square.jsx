import React from 'react';
import '../index.css';

function Square(props) {
	return (<button className={"square " + props.shade}
		onClick={props.onClick}
		style={props.style}
		key={props.keyValue}
	/>)


}

export default Square;