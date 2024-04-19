import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DynamicDisplay from '../DynamicDisplay';
import MonsterDisplay from './MonsterDisplay';
import SpellDisplay from './SpellsDisplay';
import RaceDisplay from './RaceDisplay'; 
import ClassDisplay from './ClassDisplay';
import WeaponDisplay from './WeaponDisplay';
import ArmorDisplay from './ArmorDisplay';
import ItemDisplay from './ItemDisplay'; 

function ItemDialog({ open, onClose, item }) {
    console.log(item);
    const isMonster = item && ('challenge_rating' in item || ('type' in item && item.type === "Monster"));
    const isSpell = item && ('level_int' in item || 'school' in item);
    const isRace = item && ('languages' in item && 'asi' in item);
    const isClass = item && ('prof_weapons' in item && 'prof_armor' in item);
    const isWeapon = item && ('damage_dice' in item || 'properties' in item);
    const isArmor = item && ('category' in item && 'base_ac' in item);
    const isGenericItem = item && ('desc' in item && 'rarity' in item && !isArmor && !isWeapon);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                {isMonster ? (
                    <MonsterDisplay monsterData={item} />
                ) : isSpell ? (
                    <SpellDisplay spellData={item} />
                ) : isRace ? (
                    <RaceDisplay raceData={item} />
                ) : isClass ? (
                    <ClassDisplay classData={item}/>
                ) : isWeapon ? (
                    <WeaponDisplay weaponData={item} />
                ) : isArmor ? (
                    <ArmorDisplay armorData={item} />
                ) : isGenericItem ? (
                    <ItemDisplay itemData={item} /> 
                ) : (
                    <DynamicDisplay data={item} />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ItemDialog;
