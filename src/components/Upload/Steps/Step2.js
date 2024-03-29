import React from 'react';
import uuid from 'uuid/v4';

import './Steps.css';

import AddTags from '../AddTags/AddTags';
import NewInformation from '../NewInformation/NewInformation';

import iconNew from './assets/add-function.svg';

function Step2(props) {
  function addMember() {
    const { stepState, onChange } = props;
    const members = stepState.members.value;
    const newMembers = [...members, { role: 'Direção', name: '', key: uuid() }];

    const event = {
      target: {
        name: 'members',
        value: newMembers
      }
    };

    onChange(event);
  };

  function removeMember(key) {
    const { stepState, onChange } = props;
    const members = stepState.members.value;
    const newMembers = members.filter(m => m.key !== key);

    const event = {
      target: {
        name: 'members',
        value: newMembers
      }
    };

    onChange(event);
  };

  function onMemberChange(key, e) {
    const { stepState, onChange } = props;
    const members = stepState.members.value;
    const memberToUpdate = members.filter(m => m.key == key)[0];

    const newmemberToUpdate = {
      ...memberToUpdate,
      [e.target.name]: e.target.value
    };

    const newMembers = members.map(m => {
      return m.key === key ? newmemberToUpdate : m;
    });

    const event = {
      target: {
        name: 'members',
        value: newMembers
      }
    };

    onChange(event);
  };

  const { stepState, onChange } = props;
  return (
    <div className="Steps">
      <h1 className="Large-Text-Medium">Ficha técnica</h1>
      <article className="line" />
      <h1 className="subtitleStep Small-Text-Regular">
        Aqui você pode mostrar quem participou da produção do seu vídeo.
      </h1>
      <h1 className="Medium-Text-Medium">Elenco</h1>
      <AddTags
        name="cast"
        value={stepState.cast.value}
        onChange={onChange}
        list={true}
        placeholder="Aperte ENTER para adicionar uma pessoa. Se não possuir elenco, deixe em branco."
      />
      <h1 className="Medium-Text-Medium">Funções dos participantes</h1>
      <button
        className="bntNewInformation Small-Text-Bold"
        onClick={addMember}
      >
        <img src={iconNew} />
        Adicionar função
      </button>
      <div className="functions">
        {stepState.members.value.map(member => (
          <NewInformation
            member={member}
            onChange={e => onMemberChange(member.key, e)}
            remove={() => removeMember(member.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default Step2;
