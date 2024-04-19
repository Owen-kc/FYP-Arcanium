import React from 'react';
import './DialogStyles.css'; 

function ItemDisplay({ itemData }) {
    if (!itemData) return null; 

    return (
        <div className="container">
            <div className="title">{itemData.name}</div>
            <div className="subheading">{itemData.type} - {itemData.rarity}</div>

            {/* Item Description */}
            <div className="category">Description</div>
            <div className="text">{itemData.desc}</div>

            {/* Additional details if available */}
            {itemData.requires_attunement && (
                <div className="text">Requires Attunement: {itemData.requires_attunement}</div>
            )}

            <div className="text">Document: <a href={itemData.document__url}>{itemData.document__title}</a></div>
        </div>
    );
}

export default ItemDisplay;
