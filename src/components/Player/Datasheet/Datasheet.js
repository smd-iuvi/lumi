import React, { useState } from 'react';
import './Datasheet.css';

import Tabs from '../../TabBar/Tabs/Tabs';
import Tags from '../../Tags/Tags';

function Datasheet(props) {
  const [tabs, setTabs] = useState(['Ficha técnica', 'Informações acadêmicas', 'Tags']);
  const [selected, setSelected] = useState(0);

  function onTabChange(newTab) {
    setSelected(newTab);
  };

  const { video } = props;
  let container = null;

  if (selected == 0) {
    container = (
      <>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Direção</h1>
          {video &&
            video.members &&
            video.members.map(member => {
              if (member.role == 'Direção') {
                return <h1 className="Medium-Text-Regular">{member.name}</h1>;
              }
            })}
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Fotografia</h1>
          {video &&
            video.members &&
            video.members.map(member => {
              if (member.role == 'Fotografia') {
                return <h1 className="Medium-Text-Regular">{member.name}</h1>;
              }
            })}
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Edição</h1>
          {video &&
            video.members &&
            video.members.map(member => {
              if (member.role == 'Edição') {
                return <h1 className="Medium-Text-Regular">{member.name}</h1>;
              }
            })}
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">
            Direção de arte
          </h1>
          {video &&
            video.members &&
            video.members.map(member => {
              if (member.role == 'Direção de arte') {
                return <h1 className="Medium-Text-Regular">{member.name}</h1>;
              }
            })}
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Trilha sonora</h1>
          {video &&
            video.members &&
            video.members.map(member => {
              if (member.role == 'Trilha sonora') {
                return <h1 className="Medium-Text-Regular">{member.name}</h1>;
              }
            })}
        </div>
        <div className="contentCast">
          <h1 className="Medium-Text-Regular titleFunction">Elenco</h1>
          <div>
            {video &&
              video.cast &&
              video.cast.map(c => {
                return <h1 className="Medium-Text-Regular">{c}</h1>;
              })}
          </div>
          <div>
            {/* <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1>
            <h1 className="Medium-Text-Regular">Fulaninho de Tal</h1> */}
          </div>
        </div>
      </>
    );
  } else if (selected == 1) {
    container = (
      <>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Disciplina</h1>
          <h1 className="Medium-Text-Regular">
            {video && video.discipline
              ? video.discipline
              : 'Video independente'}
          </h1>
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Semestre</h1>
          <h1 className="Medium-Text-Regular">
            {video && video.semester ? video.semester : 'Indisponível'}
          </h1>
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">Professor(es)</h1>
          <h1 className="Medium-Text-Regular">
            {video && video.professor ? video.professor : 'Indisponível'}
          </h1>
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">
            Sobre o trabalho
          </h1>
          <h1 className="Medium-Text-Regular">
            {video && video.about ? video.about : 'Indisponível'}
          </h1>
        </div>
        <div className="contentFunction">
          <h1 className="Medium-Text-Regular titleFunction">
            Evento de disciplina
          </h1>
          <h1 className="Medium-Text-Regular">
            {video && video.event ? video.event : 'Não faz parte de evento'}
          </h1>
        </div>
      </>
    );
  } else if (selected == 2) {
    container = (
      <div className="contentFunction">
        <Tags tags={video.tags} />
      </div>
    );
  }
  return (
    <div className="datasheet">
      <Tabs tabs={tabs} selected={selected} onTabChange={onTabChange} />
      <div className="contentTab">{container}</div>
    </div>
  );
}

export default Datasheet;
