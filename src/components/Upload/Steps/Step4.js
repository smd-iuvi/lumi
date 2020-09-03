import React, { useState, useEffect } from 'react';

import './Steps.css';

import { withFirebase } from '../../../Firebase';

import SelectBox from '../SelectBox/SelectBox';
import TextFieldInformation from '../TextFieldInformation/TextFieldInformation';
import TextAreaInformation from '../TextAreaInformation/TextAreaInformation';

function Step4(props) {
  const [disciplineDataSource, setDisciplineDataSource] = useState([]);
  const [semesterDataSource, setSemesterDataSource] = useState([]);
  const [eventDataSource, setEventDataSource] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const { firebase } = props;

    firebase.discipline
      .get()
      .then(disciplines => {
        const disciplineDataSource = disciplines.map(
          discipline => discipline.name
        );
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

    firebase.event
      .get()
      .then(events => {
        const eventDataSource = events.map(event => event.name);
        setEventDataSource(eventDataSource);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const { stepState, onChange } = props;

  return (
    <div className="Steps">
      <h1 className="Large-Text-Medium">Informações acadêmicas</h1>
      <article className="line" />
      <h1 className="subtitleStep Small-Text-Regular">
        Fale mais sobre seu trabalho acadêmico.
      </h1>
      <div className="selects">
        <SelectBox
          name="discipline"
          dataSource={disciplineDataSource}
          value={stepState.discipline.value}
          isValid={stepState.discipline.isValid}
          onChange={onChange}
          placeholder="Disciplina"
        />
        <SelectBox
          name="semester"
          dataSource={semesterDataSource}
          value={stepState.semester.value}
          isValid={stepState.semester.isValid}
          onChange={onChange}
          placeholder="Semestre"
        />
      </div>
      <TextFieldInformation
        name="professor"
        value={stepState.professor.value}
        isValid={stepState.professor.isValid}
        onChange={onChange}
        placeholder="Professor(es) da disciplina"
      />
      <TextAreaInformation
        name="about"
        value={stepState.about.value}
        isValid={stepState.about.isValid}
        onChange={onChange}
        placeholder="Sobre o trabalho"
      />
      <h1 className="Medium-Text-Medium">Evento de disciplina</h1>
      <div className="checkDiscipline">
        <input
          type="checkbox"
          id="checkbox"
          className="checkboxEvent"
          name="shouldVerifyEvents"
          value={stepState.shouldVerifyEvents.value}
          onChange={onChange}
        />
        <label for="checkbox" className="Medium-Text-Medium">
          Este vídeo faz parte de um evento da disciplina.
        </label>
      </div>
      {stepState.shouldVerifyEvents.value && (
        <SelectBox
          name="events"
          dataSource={eventDataSource}
          value={stepState.events.value}
          isValid={stepState.events.isValid}
          onChange={onChange}
          placeholder="Selecione o evento"
        />
      )}
    </div>
  );
}

export default withFirebase(Step4);
