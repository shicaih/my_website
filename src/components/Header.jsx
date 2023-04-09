import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SectionTitle = ({ name, linkTo }) => (
  <Link to={linkTo}>
    <div className="text-white font-['jost-light'] hover:font-['jost-bold']">
      {name}
    </div>
  </Link>
);

export default () => (
  <div className="w-full h-16 bg-black flex items-center">
    <div className="flex grow justify-between items-center ml-[2vw] mr-[2vw]">
      <div className="text-base text-white font-['jost-light']">SHICAI HE</div>
      <div className="flex justify-end gap-4">
        <SectionTitle name="ALL PROJECTS" />
        <SectionTitle name="BLOG" />
        <SectionTitle name="ABOUT ME" />
      </div>
    </div>
  </div>
);
