import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// UI
import { ShadowButton, SocialButton } from '../UI/Buttons';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';

const GET_COVER_IMAGE = gql`
  query GetCoverImage {
    allImagePool {
      name
      imageFile {
        asset {
          url
        }
      }
    }
  }
`;

const GET_PROJECTS = gql`
  query GetProjects {
    allProject {
      _id
      name
      tags {
        name
      }
    }
    allProjectTag {
      name
    }
  }
`;

const LandingPage = () => {
  const params = useParams();
  const { loading: imageLoading, data: imageData } = useQuery(GET_COVER_IMAGE);
  const { loading: projectLoading, data: projectData } = useQuery(GET_PROJECTS);

  return (
    <>
      <div>
        {!imageLoading && (
          <div className="absolute z-[-1] w-[100%]">
            <img
              src={imageData.allImagePool[0].imageFile.asset.url}
              className="absolute z-[-1] w-[100%]"
            />
            <div className="absolute w-[100%] h-[100vh] bg-[#00000025]" />
          </div>
        )}
        <Header />
        <div className="App m-[30px] overflow-visible">
          <div className="text-8xl text-white mt-[20%]">
            <span className="font-['jost-bold']">WELCOME,&nbsp;</span>
            <span className="font-['jost-light']">STRANGER</span>
          </div>
          <div className="text-6xl text-white">
            <span className="font-['jost-light']">TO MY SPACE</span>
          </div>
          <div className="text-base text-white font-['ubuntu'] mt-20">
            Hi, my name is Shicai He. A programmer/CG artist.
            <br />
            This place shows all my creations, feel free to walk around.
          </div>
          <ShadowButton onClick={() => console.log('!')} tStyle="mt-5" />
        </div>
      </div>
      {!projectLoading && <ProjectList data={projectData} />}
    </>
  );
};

export default LandingPage;
