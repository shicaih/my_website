import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// UIs
import { MainButton, ScrollIndicator, SocialButton } from '../UI/Buttons';
import Loader from '../UI/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectList from '../components/ProjectList';
import cover from '../assets/1web.png';
import me from '../assets/me.jpg';

// Helpers
import { scrollElementIntoView } from '../helpers';

const GET_PROJECTS = gql`
  query GetProjects {
    allProject(sort: [{ order: ASC }]) {
      name
      order
      slug {
        current
      }
      briefRaw
      coverImage {
        asset {
          url
        }
      }
      categories {
        name
      }
      tags {
        name
      }
    }
    allProjectCategory(sort: [{ _updatedAt: ASC }]) {
      name
      _updatedAt
    }
    allProjectTag {
      name
    }
  }
`;

const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading: projectLoading, data: projectData } = useQuery(GET_PROJECTS);

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      scrollElementIntoView(scrollTo);
    }
  }, [projectLoading, projectData]);

  return (
    <div>
      <Header />
      <div className="relative h-[100svh] w-[100svw]">
        <div className="absolute top-0 z-[-1] h-[100vh] w-full overflow-hidden">
          <img src={cover} className="z-[-1] max-w-none object-fill" />
          <div className="absolute top-0 h-[100%] w-[100%] bg-[#00000040]" />
          {/* <div className="absolute right-5 bottom-5 text-xs text-[#ffffff70]">
              background image designed and rendered by me @Shicai He
            </div> */}
        </div>
        <div className="flex flex-col items-center px-[120px] pt-[20%]">
          <div className="text-6xl">
            <span className="font-futura font-bold uppercase">
              Hi, I&#39;m Shicai
            </span>
          </div>
          <div className="font-futura text-3xl uppercase">
            a web & game developer
          </div>
          <div className="mt-20 text-base">
            Welcome to my little universe :)
            <br />
            This place shows all my creations, feel free to walk around.
          </div>
          <div className="flex gap-10">
            <MainButton
              buttonText="My Projects"
              onClick={() => scrollElementIntoView('projectList')}
              styleT="mt-5"
            />
            {/* Activate when I have a blog */}
            {/* <MainButton
              buttonText="MY Tech Blog"
              onClick={() => scrollElementIntoView('projectList')}
              tStyle="mt-5"
            /> */}
          </div>
        </div>
        <div className="absolute bottom-10 flex w-full justify-center">
          <ScrollIndicator scrollToId="projectList" />
        </div>
      </div>
      {projectLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col px-4 lg:items-center">
          <div className="flex flex-col lg:max-w-[1024px]">
            <div id="projectList" className="mt-10">
              <ProjectList data={projectData} />
            </div>
            <div id="me" className="flex flex-col items-center overflow-auto">
              <div className="mt-4 lg:max-w-[1024px]">
                <h1># About Me</h1>
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                    <img src={me} />
                  </div>
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      Hi! My name is Shicai He. I'm a 2nd-year graduate student
                      at Entertainment Technology Center, Carnegie Mellon
                      University.
                      <br />
                      <br />
                      I am a programmer with an interdisciplinary background in
                      computer science, CG art, and architecture. What I love
                      about programming is that it empowers me to solve problems
                      in our daily life and pack the solutions as apps for other
                      people to use. I'm passionate upon developing applications
                      and games that people enjoy.
                      <br />
                      <br />
                      I'm currently a fullstack engineer intern at Tesla and I'm
                      looking for software engineer / game developer jobs.
                    </div>
                    <div>
                      <SocialButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
