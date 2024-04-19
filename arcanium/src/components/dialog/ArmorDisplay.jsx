import React from 'react';
import './DialogStyles.css'; 

function ArmorDisplay({ armorData }) {
    if (!armorData) return null;

    return (
        <div className="container">
            <div className="title">{armorData.name}</div>
            <div className="subheading">{armorData.category}</div>

            <div className="text">Base AC: {armorData.base_ac} {armorData.plus_dex_mod ? `+ Dex mod (max ${armorData.plus_max})` : ''}</div>
            {armorData.strength_requirement && <div className="text">Strength Requirement: {armorData.strength_requirement}</div>}
            <div className="text">Cost: {armorData.cost}</div>
            <div className="text">Weight: {armorData.weight}</div>
            <div className="text">Stealth Disadvantage: {armorData.stealth_disadvantage ? 'Yes' : 'No'}</div>

            <div className="text">
                <a href={armorData.document__url} target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
        </div>
    );
}

export default ArmorDisplay;
