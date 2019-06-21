import React from 'react';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidUpdate() {
    const { positions } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach(position => {
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.beginPath();
      ctx.rect(position, 0, 160, 86);
      ctx.stroke();
    });

    ctx.restore();
  }
  render() {
    return <canvas width="1030px" height="86px" ref={this.canvasRef} />;
  }
}

export default Canvas;
