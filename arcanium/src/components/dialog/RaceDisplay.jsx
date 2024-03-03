import { markdownToHTML } from '../utils/markdownToHTML';
  
  function RaceDisplay({ raceData }) {
      if (!raceData) return null;
  
      // Convert Markdown to HTML
      const traitsHTML = markdownToHTML(raceData.traits);
      const alignmentHTML = markdownToHTML(raceData.alignment);
      const ageHTML = markdownToHTML(raceData.age);
      const languageHTML = markdownToHTML(raceData.languages);
  
      return (
          <div className="container">
              <div className="title">{raceData.name}</div>
              <div className="text">Type: {raceData.size_raw}</div>
              <div className="text">Speed: {raceData.speed.walk} feet</div>
              <div className="text" dangerouslySetInnerHTML={{ __html: alignmentHTML }}></div>
              <div className="text" dangerouslySetInnerHTML={{ __html: ageHTML }}></div>        
              <div className="text" dangerouslySetInnerHTML={{ __html: languageHTML }}></div>      
  
              {/* Ability Bonuses */}
              <div className="category">Ability Bonuses</div>
              {raceData.asi && raceData.asi.map((bonus, index) => (
                  <div key={index} className="text">
                      {bonus.attributes.join(", ")}: +{bonus.value}
                  </div>
              ))}
  
              {/* Traits */}
              <div className="category">Traits</div>
              <div className="text" dangerouslySetInnerHTML={{ __html: traitsHTML }} />
  
              <div className="text">Document: <a href={raceData.document__url}>{raceData.document__title}</a></div>
          </div>
      );
  }
  
  export default RaceDisplay;
  