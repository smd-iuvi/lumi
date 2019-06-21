import React from 'react';

import img from './birdbox.jpg';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidUpdate() {
    const { positions } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imagemElement = this.refs.image;
    const width = canvas.width;
    const height = canvas.height;

    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach(position => {
      ctx.drawImage(imagemElement, position, 0, 160, 86);
    });

    ctx.restore();
  }
  render() {
    return (
      <>
        <canvas width="1030px" height="86px" ref={this.canvasRef} />
        <img
          ref="image"
          src={img}
          style={{ display: 'none', width: '160px', height: '86px' }}
        />
      </>
    );
  }
}

export default Canvas;
