import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Discover.css';

import 'react-responsive-carousel/lib/styles/carousel.css';
import { withServiceManager } from '../../services';
import * as ROUTES from '../../constants/routes';

function Discover(props) {
  const [disciplineDataSource, setDisciplineDataSource] = useState([]);
  const [semesterDataSource, setSemesterDataSource] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { serviceManager } = props;

    serviceManager.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines;
        setDisciplineDataSource(disciplineDataSource);
      })
      .catch(error => {
        setError(error);
      });

    serviceManager.semester
      .get()
      .then(semesters => {
        const semesterDataSource = semesters.map(semester => `${semester.year}.${semester.part}`);
        setSemesterDataSource(semesterDataSource);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div className="container discover">
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

export default withServiceManager(Discover);
