import './DialogStyles.css';

function MonsterDisplay({ monsterData }) {
    if (!monsterData) return null;

    return (
        <div className="container">
            <div className="title">{monsterData.name}</div>
            <div className="subheading">{monsterData.size}, {monsterData.alignment}</div>

            {/* Display basic attributes */}
            <div className="text">Armor Class: {monsterData.armor_class} ({monsterData.armor_desc})</div>
            <div className="text">Hit Points: {monsterData.hit_points}</div>
            <div className="text">
                Speed:
                {Object.entries(monsterData.speed).map(([key, value], index) => (
                    <span key={key}>
                        {key}: {value} ft.
                        {index !== Object.keys(monsterData.speed).length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>

            <div className="attributes">
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
                    <div key={stat} className="attribute">
                        {stat.toUpperCase()}: {monsterData[stat]}
                    </div>
                ))}
            </div>

            {/* Display skills */}
            <div className="text">
                Skills:
                {Object.entries(monsterData.skills).map(([key, value], index) => (
                    <span key={key}>
                        {key}: +{value}
                        {index !== Object.keys(monsterData.skills).length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>

            {/* Damage Resistances, Immunities etc, more added similarly*/}
            {monsterData.damage_resistances && <div className="text">Damage Resistances: {monsterData.damage_resistances}</div>}

            {/* Display special traits */}
            {monsterData.special_abilities && monsterData.special_abilities.map((ability) => (
                <div key={ability.name}>
                    <div className="category">{ability.name}</div>
                    <div className="text">{ability.desc}</div>
                </div>
            ))}

            {/* Display actions */}
            {monsterData.actions && (
                <div>
                    <div className="category">ACTIONS</div>
                    {monsterData.actions.map((action) => (
                        <div key={action.name}>
                            <div className="text">{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Display legendary actions */}
            {monsterData.legendary_actions && (
                <div>
                    <div className="category">LEGENDARY ACTIONS</div>
                    {monsterData.legendary_actions.map((action) => (
                        <div key={action.name}>
                            <div className="text">{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MonsterDisplay;
