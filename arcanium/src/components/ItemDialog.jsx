import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DynamicDisplay from './DynamicDisplay';
import MonsterDisplay from './MonsterDisplay';
import SpellDisplay from './SpellsDisplay'; // Make sure to import the SpellDisplay component

function ItemDialog({ open, onClose, item }) {
    const isMonster = item && ('alignment' in item || 'armor_class' in item);
    const isSpell = item && ('level_int' in item || 'school' in item);

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                {isMonster ? (
                    <MonsterDisplay monsterData={item} />
                ) : isSpell ? (
                    <SpellDisplay spellData={item} />
                ) : (
                    <DynamicDisplay data={item} />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ItemDialog;
