import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Helpers
import { PortableText } from '@portabletext/react';
import ImageUrlBuilder from '@sanity/image-url';

// UIs
import { Buttony, ScrollIndicator, MainButton } from '../UI/Buttons';
// import { BlackMask80 } from '../UI/Auxilliary';
import Loader from '../UI/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';

const getProject = (slug) => gql`
  query GetProjects {
    allProject(where: {slug: {current: {eq: "${slug}"}}}) {
      name
      dateDescription
      slug {
        current
      }
      description
      startDate
      endDate
      teamSize
      platform
      myRole
      myContributionRaw
      contentRaw
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
      links {
        url
        to
      }
    }
    allProjectCategory {
      name
    }
    allProjectTag {
      name
    }
  }
`;

const builder = ImageUrlBuilder({
  baseUrl: 'https://cdn.sanity.io',
  projectId: 'qkpbnng0',
  dataset: 'production',
});

const urlFor = (imageId) => builder.image(imageId).url();

const contentComponents = {
  types: {
    videoLink: ({ value }) => (
      <iframe
        className="mt-4 aspect-[16/9]"
        width="100%"
        src={value.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ),
    h1: ({ value }) => <div className="text-2xl">{value}</div>,
    p: ({ value }) => <p style={{ margin: '10px' }}>{value}</p>,
    image: ({ value }) => (
      <div className="my-6">
        <img src={urlFor(value.asset)} />
      </div>
    ),
  },
};

const ProjectDes = ({ projectData, styleT }) => (
  <div className={`flex max-w-[400px] flex-col justify-center ${styleT}`}>
    {/* Text part */}
    <div className="text-md my-4">
      <span className="font-sansB">Platform:</span> {projectData.platform}
      <br />
      <span className="font-sansB">My Role:</span> {projectData.myRole}
      <br />
      <br />
      {projectData.description}
      <br />
      <br />
      <span className="font-sansB">My Contribution:</span>
      <PortableText value={projectData.myContributionRaw} />
    </div>
    {/* Icon part */}
    <div className="flex flex-col justify-between gap-4 lg:min-w-[400px]">
      {/* <div className="flex flex-col gap-4">
        <Buttony
          boldText="Platform: "
          buttonText={projectData.platform}
          styleT="bg-zinc-600"
        />
        <Buttony
          boldText="My Role: "
          buttonText={projectData.myRole}
          styleT="bg-zinc-600"
        />
      </div> */}
      <div className="flex justify-between gap-4">
        {projectData.links?.map((link) => (
          <MainButton
            styleT="flex-1"
            key={link.url}
            buttonText={link.to}
            onClick={() => window.open(link.url, '_blank')}
          />
        ))}
      </div>
    </div>
  </div>
);

const ProjectPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { projectSlug } = useParams();
  const { loading: projectLoading, data } = useQuery(getProject(projectSlug));
  const projectData = data ? data.allProject[0] : null;

  return projectLoading ? (
    <Loader />
  ) : (
    <div className="overflow-x-hidden">
      <Header />
      {/* Article header */}
      <div className="relative flex flex-col bg-black lg:flex-row-reverse">
        {/* Background image and mask */}
        <div className="flex-grow bg-black">
          <img
            src={projectData.coverImage.asset.url}
            className="z-[-1] h-full w-full object-cover "
          />
        </div>
        {/* Project Info */}
        <div className="max-w-[600px] px-4 lg:px-20">
          <div className="relative flex lg:h-[100svh] flex-col justify-center ">
            <div className="font-sansL text-xl">
              {projectData.dateDescription}
            </div>
            <div className="font-sansB text-4xl lg:text-6xl">{projectData.name}</div>
            <ProjectDes projectData={projectData} styleT="hidden lg:flex" />
          </div>
          <ProjectDes projectData={projectData} styleT="lg:hidden" />
        </div>

        <div className="absolute bottom-10 flex w-full items-center justify-center">
          <ScrollIndicator scrollToId="article" />
        </div>
      </div>
      {/* Article content */}
      <div id="article" className="flex flex-col items-center">
        <div className="mt-4 leading-loose lg:w-[720px]">
          <PortableText
            value={projectData.contentRaw}
            components={contentComponents}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
