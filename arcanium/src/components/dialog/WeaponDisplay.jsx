import React from 'react';
import './DialogStyles.css'; 

function WeaponDisplay({ weaponData }) {
    if (!weaponData) return null;

    return (
        <div className="container">
            <div className="title">{weaponData.name}</div>
            <div className="subheading">{weaponData.category}</div>

            <div className="text">Cost: {weaponData.cost}</div>
            <div className="text">Damage Dice: {weaponData.damage_dice}</div>
            <div className="text">Damage Type: {weaponData.damage_type}</div>
            <div className="text">Weight: {weaponData.weight}</div>

            {weaponData.properties && weaponData.properties.length > 0 && (
                <div>
                    <div className="category">Properties</div>
                    <div className="text">{weaponData.properties.join(', ')}</div>
                </div>
            )}

            {/* Documentation if available */}
            {weaponData.document__url && (
                <div className="text">
                    Documentation: <a href={weaponData.document__url}>{weaponData.document__title}</a>
                </div>
            )}
        </div>
    );
}

export default WeaponDisplay;
