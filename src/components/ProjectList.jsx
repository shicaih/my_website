import React, { useState, useEffect } from 'react';

// Helpers
import { some } from 'lodash';
import { scrollElementIntoView } from '../helpers';

// UIs
import ProjectCard from './ProjectCard';
import { RadioButton } from '../UI/Buttons';

const FilterList = ({ currentCategory, setCurrentCategory, categories }) => (
  <fieldset className="my-4 flex items-center justify-start gap-4">
    <div key="All">
      <RadioButton
        buttonText="All Projects"
        onClick={() => {
          scrollElementIntoView('projectList');
          setCurrentCategory('All');
        }}
        checked={currentCategory === 'All'}
      />
    </div>
    {categories.map((category) => (
      <div key={category}>
        <RadioButton
          buttonText={category}
          onClick={() => {
            scrollElementIntoView('projectList');
            setCurrentCategory(category);
          }}
          checked={category === currentCategory}
        />
      </div>
    ))}
  </fieldset>
);

const ProjectList = ({ data }) => {
  const projects = data.allProject;
  const categories = data.allProjectCategory.map((category) => category.name);
  const [currentCategory, setCurrentCategory] = useState('');
  useEffect(() => {
    if (currentCategory === '') {
      setCurrentCategory(categories[0]);
    }
  }, [currentCategory]);
  return (
    <>
      <div className="mb-10">
        <h1># Projects Overview</h1>
        <FilterList
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          categories={categories}
        />
      </div>
      <div className="flex flex-col gap-10">
        {projects
          .filter(
            (project) =>
              some(
                project.categories,
                (category) => category.name === currentCategory,
              ) || currentCategory === 'All',
          )
          .map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
      </div>
    </>
  );
};

export default ProjectList;
