import React, { useState, useEffect } from 'react';

// Helpers
import { some } from 'lodash';
import { scrollElementIntoView } from '../helpers';

// UIs
import ProjectCard from './ProjectCard';
import { RadioButton } from '../UI/Buttons';

const FilterList = ({ currentCategory, setCurrentCategory, categories }) => (
  <div className=" flex w-full items-center justify-start gap-4 overflow-x-auto">
    <RadioButton
      key="all"
      buttonText="All Projects"
      onClick={() => {
        scrollElementIntoView('projectList');
        setCurrentCategory('All');
      }}
      checked={currentCategory === 'All'}
    />
    {categories.map((category) => (
      <RadioButton
        key={category}
        buttonText={category}
        onClick={() => {
          scrollElementIntoView('projectList');
          setCurrentCategory(category);
        }}
        checked={category === currentCategory}
      />
    ))}
  </div>
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
      <div className="mb-10 flex w-full flex-col">
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
