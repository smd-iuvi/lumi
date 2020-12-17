import React, { useState, useEffect } from 'react';
import './Datasheet.css';

import Tabs from '../../TabBar/Tabs/Tabs';
import Tags from '../../Tags/Tags';

function Datasheet(props) {
  const [tabs, setTabs] = useState(['Ficha técnica', 'Informações acadêmicas', 'Tags']);
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState([]);
  const [photography, setPhotography] = useState([]);
  const [edition, setEdition] = useState([]);
  const [artDirection, setArtDirection] = useState([]);
  const [soundtrack, setSoundtrack] = useState([]);
  const [cast, setCast] = useState([]);
  const [showDatasheet, setShowDatasheet] = useState(false);

  useEffect(() => {
    const { video } = props;
    if (video && video.members) {
      const listDirection = [];
      const listPhotography = [];
      const listEdition = [];
      const listArtDirection = [];
      const listSoundtrack = [];

      video.members.map(member => {
        if (member.role == 'Direção') {
          setDirection(listDirection.push(member.name));
        }
        else if (member.role == 'Fotografia') {
          setDirection(listPhotography.push(member.name));
        }
        else if (member.role == 'Edição') {
          setDirection(listEdition.push(member.name));
        }
        else if (member.role == 'Direção de arte') {
          setDirection(listArtDirection.push(member.name));
        }
        else if (member.role == 'Trilha sonora') {
          setDirection(listSoundtrack.push(member.name));
        }
      });
      setDirection(listDirection);
      setPhotography(listPhotography);
      setEdition(listEdition);
      setArtDirection(listArtDirection);
      setSoundtrack(listSoundtrack);
    }
    if (video && video.cast) {
      const listCast = [];
      video.cast.map(c => {
        listCast.push(c);
      });
      setCast(listCast);
    }
  }, props.video);

  function onTabChange(newTab) {
    setSelected(newTab);
  };

  const { video } = props;
  let container = null;

  if (selected == 0) {
    container = (
      <>
        {direction.length !== 0 &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Direção</h1>
            {direction.map(member => {
              return <h1 className="Medium-Text-Regular">{member.name}</h1>;
            })}
          </div>
        }
        {photography.length !== 0 &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Fotografia</h1>
            {photography.map(member => {
              return <h1 className="Medium-Text-Regular">{member.name}</h1>;
            })}
          </div>
        }
        {edition.length !== 0 &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Edição</h1>
            {edition.map(member => {
              return <h1 className="Medium-Text-Regular">{member.name}</h1>;
            })}
          </div>
        }
        {artDirection.length !== 0 &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">
              Direção de arte
            </h1>
            {artDirection.map(member => {
              return <h1 className="Medium-Text-Regular">{member.name}</h1>;
            })}
          </div>
        }
        {soundtrack.length !== 0 &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Trilha sonora</h1>
            {soundtrack.map(member => {
              return <h1 className="Medium-Text-Regular">{member.name}</h1>;
            })}
          </div>
        }
        {cast.length !== 0 &&
          <div className="contentCast">
            <h1 className="Medium-Text-Regular titleFunction">Elenco</h1>
            <div>
              {cast.map(c => {
                return <h1 className="Medium-Text-Regular">{c}</h1>
              })}
            </div>
          </div>
        }

        {direction.length === 0 &&
          photography.length === 0 &&
          edition.length === 0 &&
          artDirection.length === 0 &&
          soundtrack.length === 0 &&
          cast.length === 0 &&
          <div className="contentCast">
            <h1 className="Medium-Text-Regular titleFunction">Não há ficha técnica</h1>
          </div>
        }
      </>
    );
  } else if (selected == 1) {
    container = (
      <>
        {video && video.discipline &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Disciplina</h1>
            <h1 className="Medium-Text-Regular">
              {video.discipline}
            </h1>
          </div>
        }
        {video && video.semester &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Semestre</h1>
            <h1 className="Medium-Text-Regular">
              {video.semester}
            </h1>
          </div>
        }
        {video && video.professor &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">Professor(es)</h1>
            <h1 className="Medium-Text-Regular">
              {video.professor}
            </h1>
          </div>
        }
        {video && video.about &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">
              Sobre o trabalho
            </h1>
            <h1 className="Medium-Text-Regular">
              {video.about}
            </h1>
          </div>
        }
        {video && video.event &&
          <div className="contentFunction">
            <h1 className="Medium-Text-Regular titleFunction">
              Evento de disciplina
            </h1>
            <h1 className="Medium-Text-Regular">
              {video.event}
            </h1>
          </div>
        }
        {video &&
          !video.discipline &&
          !video.semester &&
          !video.professor &&
          !video.about &&
          !video.event &&
          <div className="contentCast">
            <h1 className="Medium-Text-Regular titleFunction">Sem informações acadêmicas</h1>
          </div>
        }
      </>
    );
  } else if (selected == 2) {
    container = (
      <div className="contentFunction">
        {video.tags ?
          <Tags tags={video.tags} />
          :
          <h1 className="Medium-Text-Regular titleFunction">Nenhuma tag</h1>
        }
      </div>
    );
  }
  return (
    <div className="datasheet">
      {window.innerWidth < 800 &&
        <button type="submit" class="button buttonPrimary" onClick={() => setShowDatasheet(!showDatasheet)}>
          {showDatasheet ? 'Esconder ficha técnica' : 'Ver ficha técnica'}
        </button>
      }
      {window.innerWidth >= 800 || showDatasheet ?
        <>
          <Tabs tabs={tabs} selected={selected} onTabChange={onTabChange} />
          <div className="contentTab">{container}</div>
        </> : <></>}
    </div>
  );
}

export default Datasheet;
