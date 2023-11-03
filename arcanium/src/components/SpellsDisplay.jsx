const spellStyles = {
    container: {
        backgroundColor: '#FAF1E0',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #D4BFAF'
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#603515',
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '2px solid #D4BFAF'
    },
    subheading: {
        fontSize: '18px',
        color: '#603515',
        marginBottom: '10px'
    },
    attributes: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '10px',
        backgroundColor: '#F5E4D0',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px'
    },
    attribute: {
        fontSize: '16px',
        color: '#3D2817'
    },
    category: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#603515',
        margin: '10px 0',
        paddingBottom: '5px',
        borderBottom: '1px solid #D4BFAF'
    },
    text: {
        fontSize: '16px',
        color: '#3D2817',
        marginTop: '5px'
    }
};

function SpellsDisplay({ spellData }) {
    if (!spellData) return null;

    return (
        <div style={spellStyles.container}>
            <div style={spellStyles.title}>{spellData.name}</div>
            <div style={spellStyles.subheading}>{spellData.level} {spellData.school} spell</div>

            <div style={spellStyles.text}>Casting Time: {spellData.casting_time}</div>
            <div style={spellStyles.text}>Range: {spellData.range}</div>
            <div style={spellStyles.text}>Components: 
                {spellData.requires_verbal_components && 'V'}
                {spellData.requires_somatic_components && 'S'}
                {spellData.requires_material_components && `M (${spellData.material})`}
            </div>
            <div style={spellStyles.text}>Duration: {spellData.duration}</div>

            <div style={spellStyles.text}>
                Classes: {spellData.dnd_class}
            </div>

            {/* Spell Description */}
            <div style={spellStyles.category}>Description</div>
            <div style={spellStyles.text}>{spellData.desc}</div>

            {/* Higher Level Description */}
            {spellData.higher_level && (
                <div>
                    <div style={spellStyles.category}>At Higher Levels</div>
                    <div style={spellStyles.text}>{spellData.higher_level}</div>
                </div>
            )}

            {/* Document Information - You can decide if you need this */}
            <div style={spellStyles.text}>Document: <a href={spellData.document__url}>{spellData.document__title}</a></div>
        </div>
    );
}

export default SpellsDisplay;