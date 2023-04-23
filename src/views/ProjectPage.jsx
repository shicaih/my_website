import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// Helpers
import { PortableText } from '@portabletext/react';
import ImageUrlBuilder from '@sanity/image-url';

// UIs
import { Buttony, ScrollIndicator, MainButton } from '../UI/Buttons';
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
        className="mt-4"
        width="1024"
        height="576"
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

const ProjectPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { projectSlug } = useParams();
  const { loading: projectLoading, data } = useQuery(getProject(projectSlug));
  const projectData = data ? data.allProject[0] : null;

  return projectLoading ? null : (
    <div>
      <Header />
      {/* The featured */}
      <div className="relative h-[100vh]">
        {/* Background image and mask */}
        <div className="absolute top-0 z-[-1] h-full w-full bg-black">
          <img
            src={projectData.coverImage.asset.url}
            className="z-[-1] h-full object-cover"
          />
          <div className="from-52.6% via-76.56% to-100%)] absolute top-0 h-[100%] w-[100%] bg-gradient-to-b from-[#00000000] via-[#00000072] to-[#000000]" />
        </div>
        {/* Project Info */}
        <div className="px-[120px] pt-[30%]">
          <div className="font-sansL text-xl">
            {projectData.dateDescription}
          </div>
          <div className="font-sansB text-6xl">{projectData.name}</div>
          <div className="mt-6 flex justify-between gap-10">
            {/* left part */}
            <div className="text-md">
              {projectData.description}
              <br />
              <br />
              My Contribution:
              <PortableText value={projectData.myContributionRaw} />
            </div>
            {/* right part */}
            <div className="flex min-w-[400px] flex-col justify-between gap-10">
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
                {projectData.links.map((link) => (
                  <MainButton
                    styleT="flex-1"
                    key={link.url}
                    buttonText={link.to}
                    onClick={() => window.open(link.url, '_blank')}
                  />
                ))}

                {/* <MainButton
                  styleT="flex-1"
                  buttonText="Play Game"
                  onClick={() =>
                    window.open(
                      'https://picopicopi.itch.io/mochis-tale',
                      '_blank',
                    )
                  }
                /> */}
              </div>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <ScrollIndicator scrollToId="article" />
          </div>
        </div>
      </div>
      {/* The actual article */}
      <div id="article" className="flex flex-col items-center">
        <div className="mt-20 w-[1024px]">
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
