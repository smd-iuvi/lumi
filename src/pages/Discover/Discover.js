import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';

import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';

import { withFirebase } from '../../Firebase';

import * as ROUTES from '../../constants/routes';

import img from '../../assets/birdbox.jpg';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
      disciplineDataSource: [],
      semesterDataSource: []
    };
    this.randomVideos = this.randomVideos.bind(this);
  }

  componentDidMount() {
    const { firebase } = this.props;

    firebase.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines;
        this.setState({ disciplineDataSource });
      })
      .catch(error => {
        this.setState({ error });
      });

    firebase.semester
      .get()
      .then(semesters => {
        const semesterDataSource = semesters.map(semester => semester.name);
        this.setState({ semesterDataSource });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  randomVideos = () => {
    this.setState({ autoplay: true });
    setTimeout(
      function() {
        this.setState({ autoplay: false });
      }.bind(this),
      3000
    );
  };

  render() {
    return (
      <div className="container discover">
        <h1 className="Large-Text-Bold">
          Não sabe o que assistir? A gente escolhe por você.
        </h1>
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          centerMode
          centerSlidePercentage={20}
          showArrows={false}
          infiniteLoop
          autoPlay={this.state.autoplay}
          transitionTime={300}
          interval={300}
          selectedItem={3}
          className="carouselRandom"
        >
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
          <div>
            <img src={img} />
          </div>
        </Carousel>
        <button className="button buttonPrimary" onClick={this.randomVideos}>
          Iniciar
        </button>

        <div className="categories">
          <div>
            <h1 className="Large-Text-Bold">Disciplinas</h1>
            <article className="line" />
            <div className="containerCategories">
              {this.state.disciplineDataSource.map((discipline, index) => (
                <>
                  {index !== 0 && (
                    <Link
                      to={`${ROUTES.CATEGORY}/${discipline.name}`}
                      className="category"
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <article
                        className="Small-Text-Regular"
                        style={{ textDecoration: 'none' }}
                      >
                        {discipline.name}
                      </article>
                    </Link>
                  )}
                </>
              ))}
            </div>
          </div>
          <div>
            <h1 className="Large-Text-Bold">Semestres</h1>
            <article className="line" />
            <div className="containerCategories">
              {this.state.semesterDataSource.reverse().map(op => (
                <article className="Small-Text-Regular category">{op}</article>
              ))}
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default withFirebase(Discover);
