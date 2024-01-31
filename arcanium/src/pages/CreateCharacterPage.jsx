import React from 'react';
import CharacterForm from '../components/CharacterForm';

function CreateCharacterPage({userId}) {
  return (
    <div>
      <CharacterForm userId={userId}/>
    </div>
  );
}

export default CreateCharacterPage;
