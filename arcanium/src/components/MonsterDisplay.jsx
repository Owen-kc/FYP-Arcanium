const monsterStyles = {
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

function MonsterDisplay({ monsterData }) {
    if (!monsterData) return null;

    return (
        <div style={monsterStyles.container}>
            <div style={monsterStyles.title}>{monsterData.name}</div>
            <div style={monsterStyles.subheading}>{monsterData.size}, {monsterData.alignment}</div>

            {/* Display basic attributes */}
            <div style={monsterStyles.text}>Armor Class: {monsterData.armor_class} ({monsterData.armor_desc})</div>
            <div style={monsterStyles.text}>Hit Points: {monsterData.hit_points}</div>
            <div style={monsterStyles.text}>
                Speed:
                {Object.entries(monsterData.speed).map(([key, value], index) => (
                    <span key={key}>
                        {key}: {value} ft.
                        {index !== Object.keys(monsterData.speed).length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>

            <div style={monsterStyles.attributes}>
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
                    <div key={stat} style={monsterStyles.attribute}>
                        {stat.toUpperCase()}: {monsterData[stat]}
                    </div>
                ))}
            </div>

            {/* Display skills */}
            <div style={monsterStyles.text}>
                Skills:
                {Object.entries(monsterData.skills).map(([key, value], index) => (
                    <span key={key}>
                        {key}: +{value}
                        {index !== Object.keys(monsterData.skills).length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>

            {/* Damage Resistances, Immunities etc. can be added similarly */}
            {monsterData.damage_resistances && <div style={monsterStyles.text}>Damage Resistances: {monsterData.damage_resistances}</div>}

            {/* Display special traits */}
            {monsterData.special_abilities && monsterData.special_abilities.map((ability) => (
                <div key={ability.name}>
                    <div style={monsterStyles.category}>{ability.name}</div>
                    <div style={monsterStyles.text}>{ability.desc}</div>
                </div>
            ))}

            {/* Display actions */}
            {monsterData.actions && (
                <div>
                    <div style={monsterStyles.category}>ACTIONS</div>
                    {monsterData.actions.map((action) => (
                        <div key={action.name}>
                            <div style={monsterStyles.text}>{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Display legendary actions */}
            {monsterData.legendary_actions && (
                <div>
                    <div style={monsterStyles.category}>LEGENDARY ACTIONS</div>
                    {monsterData.legendary_actions.map((action) => (
                        <div key={action.name}>
                            <div style={monsterStyles.text}>{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MonsterDisplay;