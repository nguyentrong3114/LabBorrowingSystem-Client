import React from 'react';
import * as LucideIcons from 'lucide-react';

const IconList = () => {
  const scienceRelatedIcons = Object.keys(LucideIcons).filter(iconName => {
    return [
      'Beaker', 'Microscope', 'Atom', 'Cylinder', 'TestTube', 'Flask', 
      'Pipette', 'Flasks', 'Vial', 'Brain', 'Chemistry', 'Lab', 'Science',
      'Research', 'Experiment', 'Dna'
    ].some(keyword => iconName.toLowerCase().includes(keyword.toLowerCase()));
  });

  return (
    <div>
      <h1>Science-Related Icons in lucide-react:</h1>
      <ul>
        {scienceRelatedIcons.map(iconName => (
          <li key={iconName}>{iconName}</li>
        ))}
      </ul>
    </div>
  );
};

export default IconList;