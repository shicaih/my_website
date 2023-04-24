import React from 'react';
import { useNavigate } from 'react-router-dom';

// UIs
import { PortableText } from '@portabletext/react';
import { Buttony, MainButton } from '../UI/Buttons';

export default ({ project }) => {
  const { name, slug, briefRaw, coverImage, tags } = project;
  const navigate = useNavigate();

  return (
    <article className="flex h-72 flex-col gap-6 text-white transition lg:flex-row">
      <div
        className="aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-black hover:shadow-xl"
        onClick={() => navigate(`/project/${slug.current}`)}
      >
        <img
          alt="Project Cover"
          src={coverImage.asset.url}
          className="h-full w-full object-cover transition duration-1000 hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="border-l border-gray-900/10">
          <div onClick={() => navigate(`/project/${slug.current}`)}>
            <h3 className="cursor-pointer font-futura text-3xl font-bold uppercase">
              {name}
            </h3>
          </div>
          <div className="text-md line-clamp-3 mt-2 leading-relaxed">
            <PortableText value={briefRaw} />
          </div>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Buttony key={tag.name} buttonText={tag.name} />
          ))}
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <MainButton
            onClick={() => navigate(`/project/${slug.current}`)}
            buttonText="Read More"
          />
        </div>
      </div>
    </article>
  );
};
