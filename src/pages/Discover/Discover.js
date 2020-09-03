import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';

import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';

import { withFirebase } from '../../Firebase';

import * as ROUTES from '../../constants/routes';

import img from '../../assets/birdbox.jpg';
import Roulette from '../../components/Roulette/Roulette';

function Discover(props) {
  const [autoplay, setAutoplay] = useState(false);
  const [disciplineDataSource, setDisciplineDataSource] = useState([]);
  const [semesterDataSource, setSemesterDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { firebase } = props;

    firebase.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines;
        setDisciplineDataSource(disciplineDataSource);
      })
      .catch(error => {
        setError(error);
      });

    firebase.semester
      .get()
      .then(semesters => {
        const semesterDataSource = semesters.map(semester => semester.name);
        setSemesterDataSource(semesterDataSource);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  function randomVideos() {
    setAutoplay(true);
    setTimeout(
      function () {
        setAutoplay(false);
      }, 3000);
  };

  return (
    <div className="container discover">
      <h1 className="Large-Text-Bold">
        Não sabe o que assistir? A gente escolhe por você.
      </h1>
      <Roulette />
      <button className="button buttonPrimary" onClick={randomVideos}>
        Iniciar
      </button>

      <div className="categories">
        <div>
          <h1 className="Large-Text-Bold">Disciplinas</h1>
          <article className="line" />
          <div className="containerCategories">
            {disciplineDataSource.map((discipline, index) => (
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
            {semesterDataSource.reverse().map(op => (
              <article className="Small-Text-Regular category">{op}</article>
            ))}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}

export default withFirebase(Discover);
