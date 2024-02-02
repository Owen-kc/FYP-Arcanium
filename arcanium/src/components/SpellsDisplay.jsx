import './DialogStyles.css'; // Make sure to import the CSS file

function SpellsDisplay({ spellData }) {
    if (!spellData) return null;

    return (
        <div className="container">
            <div className="title">{spellData.name}</div>
            <div className="subheading">{spellData.level} {spellData.school} spell</div>

            <div className="text">Casting Time: {spellData.casting_time}</div>
            <div className="text">Range: {spellData.range}</div>
            <div className="text">Components: 
                {spellData.requires_verbal_components && 'V'}
                {spellData.requires_somatic_components && 'S'}
                {spellData.requires_material_components && `M (${spellData.material})`}
            </div>
            <div className="text">Duration: {spellData.duration}</div>

            <div className="text">
                Classes: {spellData.dnd_class}
            </div>

            {/* Spell Description */}
            <div className="category">Description</div>
            <div className="text">{spellData.desc}</div>

            {/* Higher Level Description */}
            {spellData.higher_level && (
                <div>
                    <div className="category">At Higher Levels</div>
                    <div className="text">{spellData.higher_level}</div>
                </div>
            )}
            <div className="text">Document: <a href={spellData.document__url}>{spellData.document__title}</a></div>
        </div>
    );
}

export default SpellsDisplay;
