import React from 'react';
import DOMPurify from 'dompurify';
import './DialogStyles.css'; 
import { markdownToHTML } from '../utils/markdownToHTML';

function ClassDisplay({ classData }) {
    if (!classData) return null;

    // Convert Markdown to HTML and sanitize
    const descriptionHTML = DOMPurify.sanitize(markdownToHTML(classData.desc));
    const hitDiceHTML = DOMPurify.sanitize(markdownToHTML(`Hit Dice: ${classData.hit_dice}`));
    const proficienciesHTML = DOMPurify.sanitize(markdownToHTML(classData.prof_armor + ", " + classData.prof_weapons));

    // If classData has a skills field that is a string, convert and sanitize
    const skillsHTML = classData.prof_skills ? DOMPurify.sanitize(markdownToHTML(classData.prof_skills)) : "";

    // If classData has equipment field that is a string, convert and sanitize
    const equipmentHTML = classData.equipment ? DOMPurify.sanitize(markdownToHTML(classData.equipment)) : "";

    return (
        <div className="container">
            <div className="title">{classData.name}</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>

            {/* Hit Dice */}
            <div className="category">Hit Dice</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: hitDiceHTML }}></div>

            {/* Proficiencies */}
            <div className="category">Proficiencies</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: proficienciesHTML }}></div>

            {/* Skills */}
            <div className="category">Skills</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: skillsHTML }}></div>

            {/* Starting Equipment */}
            <div className="category">Starting Equipment</div>
            <div className="text" dangerouslySetInnerHTML={{ __html: equipmentHTML }}></div>

            {/* Add more fields in future */}
        </div>
    );
}

export default ClassDisplay;
