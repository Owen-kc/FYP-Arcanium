import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DynamicDisplay from '../DynamicDisplay';
import MonsterDisplay from './MonsterDisplay';
import SpellDisplay from './SpellsDisplay';
import RaceDisplay from './RaceDisplay'; 
import ClassDisplay from './ClassDisplay';

function ItemDialog({ open, onClose, item }) {
    console.log(item)
    const isMonster = item && ('type' in item || 'challenge_rating' in item);
    const isSpell = item && ('level_int' in item || 'school' in item);
    const isRace = item && ('languages' in item && 'asi' in item);
    const isClass = item && ('prof_weapons' in item && 'prof_armor' in item);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {isMonster ? (
                    <MonsterDisplay monsterData={item} />
                ) : isSpell ? (
                    <SpellDisplay spellData={item} />
                ) : isRace ? ( 
                    <RaceDisplay raceData={item} />
                ) : isClass? (
                    <ClassDisplay classData={item}/>
                ) : (
                    <DynamicDisplay data={item} />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ItemDialog;
