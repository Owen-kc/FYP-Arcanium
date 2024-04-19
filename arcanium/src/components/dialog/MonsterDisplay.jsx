import './DialogStyles.css';

function MonsterDisplay({ monsterData }) {
    if (!monsterData) return null;

    return (
        <div className="container">
            <div className="title">{monsterData.name}</div>
            <div className="subheading">{monsterData.size}, {monsterData.alignment}</div>

            <div className="text">Armor Class: {monsterData.armor_class} ({monsterData.armor_desc})</div>
            <div className="text">Hit Points: {monsterData.hit_points}</div>
            <div className="text">
                Speed:
                {monsterData.speed && Object.entries(monsterData.speed).map(([key, value], index, array) => (
                    <span key={key}>
                        {key}: {value} ft.{index < array.length - 1 ? ', ' : ''}
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

            <div className="text">
                Skills:
                {monsterData.skills && Object.entries(monsterData.skills).map(([key, value], index, array) => (
                    <span key={key}>
                        {key}: +{value}{index < array.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>

            {monsterData.damage_resistances && <div className="text">Damage Resistances: {monsterData.damage_resistances}</div>}

            {monsterData.special_abilities && monsterData.special_abilities.map((ability, index) => (
                <div key={index}>
                    <div className="category">{ability.name}</div>
                    <div className="text">{ability.desc}</div>
                </div>
            ))}

            {monsterData.actions && (
                <div>
                    <div className="category">ACTIONS</div>
                    {monsterData.actions.map((action, index) => (
                        <div key={index}>
                            <div className="text">{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}

            {monsterData.legendary_actions && (
                <div>
                    <div className="category">LEGENDARY ACTIONS</div>
                    {monsterData.legendary_actions.map((action, index) => (
                        <div key={index}>
                            <div className="text">{action.name}: {action.desc}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MonsterDisplay;
