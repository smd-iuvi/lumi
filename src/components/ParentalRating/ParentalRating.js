import React from 'react';
import './ParentalRating.css';

const ParentalRating = (props) => {
  let value = props.age;
  let color = {};
  if (value == 'Livre') {
    value = 'L';
    color = { backgroundColor: 'green' };
  } else if (value == '10 anos') {
    value = '10';
    color = { backgroundColor: 'blue' };
  } else if (value == '12 anos') {
    value = '12';
    color = { backgroundColor: '#e3d207' };
  } else if (value == '14 anos') {
    value = '14';
    color = { backgroundColor: 'orange' };
  } else if (value == '16 anos') {
    value = '16';
    color = { backgroundColor: 'red' };
  } else if (value == '18 anos') {
    value = '18';
    color = { backgroundColor: 'black' };
  }
  return (
    <div className="ParentalRating">
      <div className="age" style={color}>
        <h1 className="AgeParentalRating">{value}</h1>
      </div>
      <h1 className="DescriptionParentalRating">{props.content}</h1>
    </div>
  );
}

export default ParentalRating;
