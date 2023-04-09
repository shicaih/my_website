import React, { useState, useEffect } from 'react';

// UI
import { BasicButton } from '../UI/Buttons';

const FilterList = ({ setCurrentTag, tags }) => (
  <div>
    {tags.map((tag) => (
      <BasicButton buttonText={tag.name} onClick={() => setCurrentTag()} />
    ))}
  </div>
);

const ProjectList = ({ data }) => {
  const projects = data.allProject;
  const tags = data.allProjectTag;
  const [currentTag, setCurrentTag] = useState('');
  useEffect(() => {
    if (currentTag === '') {
      setCurrentTag(tags[0].name);
    }
  }, [currentTag]);
  return (
    <>
      <FilterList setCurrentTag={setCurrentTag} tags={tags} />
      {projects
        .filter((project) => project.tag === currentTag)
        .map((project) => (
          <div>{project.name}</div>
        ))}
    </>
  );
};

export default ProjectList;
