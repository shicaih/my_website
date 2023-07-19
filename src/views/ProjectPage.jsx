import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Helpers
import { PortableText } from '@portabletext/react';
import ImageUrlBuilder from '@sanity/image-url';

// UIs
import { Buttony, ScrollIndicator, MainButton } from '../UI/Buttons';
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
    image: ({ value }) => <img src={urlFor(value.asset)} />,
  },
};

const ProjectDes = ({ projectData, styleT }) => (
  <div
    className={`mt-6 flex flex-col justify-between gap-4 lg:flex-row ${styleT}`}
  >
    {/* left part */}
    <div className="text-md">
      {projectData.description}
      <br />
      <br />
      My Contribution:
      <PortableText value={projectData.myContributionRaw} />
    </div>
    {/* right part */}
    <div className="flex flex-col justify-between gap-4 lg:min-w-[400px]">
      <div className="flex flex-col gap-4">
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
      </div>
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
      {/* The featured */}
      <div className="relative">
        {/* Background image and mask */}
        <div className="absolute top-0 z-[-1] h-[100svh] w-[100svw] bg-black">
          <img
            src={projectData.coverImage.asset.url}
            className="z-[-1] object-cover h-full w-full "
          />
          <div className="from-52.6% via-76.56% to-100%)] absolute top-0 h-[100%] w-[100%] bg-gradient-to-b from-[#00000000] via-[#00000072] to-[#000000]" />
          <div className="absolute bottom-10 flex w-full justify-center">
            <ScrollIndicator scrollToId="article" />
          </div>
        </div>
        {/* Project Info */}
        <div className="px-4 lg:px-10">
          <div className="relative flex h-[100svh] flex-col justify-center lg:justify-end lg:pb-[100px]">
            <div className="font-sansL text-xl">
              {projectData.dateDescription}
            </div>
            <div className="font-sansB text-6xl">{projectData.name}</div>
            <ProjectDes projectData={projectData} styleT="hidden lg:flex" />
          </div>
          <ProjectDes projectData={projectData} styleT="lg:hidden" />
          {/* The actual article */}
          <div id="article" className="flex flex-col items-center">
            <div className="mt-4 lg:w-[1024px]">
              <PortableText
                value={projectData.contentRaw}
                components={contentComponents}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectPage;
