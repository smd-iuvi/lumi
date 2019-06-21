import React, { Component } from 'react';

import Canvas from './Canvas/Canvas';
import { maxHeaderSize } from 'http';

const initialPosition = 0;
const gap = 16;
const cardWidth = 160;
const MAX_SPEED = 30;

class Roulette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardsPositions: [],
      velocity: 1,
      accelearation: 1,
      isAccelerating: true,
      isBreaking: false,
      counter: 0
    };
  }

  componentDidMount() {
    let positions = [];
    for (let i = 0; i < 7; i++) {
      positions.push((160 + gap) * i);
    }
    this.setState({ cardsPositions: positions });

    this.rAF = requestAnimationFrame(this.update);
  }

  update = () => {
    const {
      accelearation,
      velocity,
      cardsPositions,
      isAccelerating,
      isBreaking,
      counter
    } = this.state;
    let newVelocity = velocity;

    if (isAccelerating) {
      newVelocity = velocity + accelearation;

      if (newVelocity > MAX_SPEED) {
        this.setState({ isAccelerating: false });
        newVelocity = MAX_SPEED;
      }
    } else if (!isBreaking && !isAccelerating) {
      let newCounter = counter + 1;

      if (newCounter > 240) {
        newCounter = 0;
        this.setState({ isBreaking: true, counter: newCounter });
      }

      this.setState({ counter: newCounter });
    } else if (isBreaking) {
      newVelocity = velocity - accelearation;

      if (newVelocity < 0) {
        this.setState({ isBreaking: false });
        newVelocity = 0;
      }
    }

    const newPositions = cardsPositions.map(position => {
      const newPos = position + newVelocity;
      if (newPos > 1030) {
        return -172;
      } else {
        return newPos;
      }
    });

    this.setState({ velocity: newVelocity, cardsPositions: newPositions });

    this.rAF = requestAnimationFrame(this.update);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    const { cardsPositions } = this.state;
    return <Canvas positions={cardsPositions} />;
  }
}

export default Roulette;
