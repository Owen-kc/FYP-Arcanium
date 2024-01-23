import React from 'react';
import CharacterForm from '../components/CharacterForm';

function CreateCharacterPage({userId}) {
  return (
    <div>
      <h1></h1>
      <CharacterForm userId={userId}/>
    </div>
  );
}

export default CreateCharacterPage;
