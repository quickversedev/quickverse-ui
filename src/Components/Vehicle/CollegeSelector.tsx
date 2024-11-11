import React, {useEffect, useState} from 'react';
import {fetchCampusIds} from '../../services/fetchCampusIds';

interface CollegeOption {
  label: string;
  value: string;
  key?: string;
}

interface CollegeSelectorProps {
  onSelectCollege: (college: string) => void;
}

const CollegeSelector: React.FC<CollegeSelectorProps> = ({onSelectCollege}) => {
  const [collegesData, setCollegesData] = useState<CollegeOption[]>([
    {label: 'Select College', value: '', key: 'default'},
  ]);
  const [selectedCollege, setSelectedCollege] = useState<string>('');

  const fetchCampusOptions = async () => {
    try {
      const campuses = await fetchCampusIds();
      const campusOptions = campuses.map(campus => ({
        label: campus.campusName,
        value: campus.campusId,
        key: campus.campusId,
      }));
      setCollegesData([
        {label: 'Select College', value: '', key: 'default'},
        ...campusOptions,
      ]);
    } catch (error) {
      console.error('Error fetching campus data:', error);
    }
  };

  useEffect(() => {
    fetchCampusOptions();
  }, []);

  const handleSelectCollege = (value: string) => {
    setSelectedCollege(value);
    onSelectCollege(value);
  };

  return (
    <select
      value={selectedCollege}
      onChange={e => handleSelectCollege(e.target.value)}>
      {collegesData.map(college => (
        <option key={college.key} value={college.value}>
          {college.label}
        </option>
      ))}
    </select>
  );
};

export default CollegeSelector;
