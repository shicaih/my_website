import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helpers
import { scrollElementIntoView } from '../helpers';

const SectionTitle = ({ name, onClick }) => (
  <div
    className="cursor-pointer font-futura uppercase underline-offset-4 hover:underline"
    onClick={onClick}
  >
    {name}
  </div>
);

export default () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-0 z-50 flex h-12 w-full items-center bg-black">
      <div className="ml-[2vw] mr-[2vw] flex grow items-center justify-between">
        <SectionTitle
          name="Shicai He"
          onClick={() => {
            navigate('/');
          }}
        />
        <div className="flex justify-end gap-4">
          <SectionTitle
            name="ALL PROJECTS"
            onClick={() => {
              navigate('/?scrollTo=projectList');
              scrollElementIntoView('projectList');
            }}
          />
          {/* <SectionTitle
            name="BLOG"
            onClick={() => {
              navigate('/blogs');
            }}
          /> */}
          <SectionTitle
            name="ABOUT ME"
            onClick={() => {
              navigate('/?scrollTo=me');
              scrollElementIntoView('me');
            }}
          />
        </div>
      </div>
    </div>
  );
};
