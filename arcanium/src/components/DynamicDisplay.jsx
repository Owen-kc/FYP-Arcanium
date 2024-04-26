// DynamicDisplay.js
import React from 'react';

const styles = {
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
    text: {
        fontSize: '16px',
        color: '#3D2817',
        marginTop: '5px'
    }
};

// This component will display the data passed to it, depending on the display type
function DynamicDisplay({ data }) {
    if (!data) return null;

    return (
        <div style={styles.container}>
            <div style={styles.title}>{data.name}</div>
            
            <div style={styles.text}>{data.desc}</div>
            
        </div>
    );
}

export default DynamicDisplay;
