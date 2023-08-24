import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { CodeBlock, dracula } from 'react-code-blocks';

import Loader from '../UI/Loading';

const getProject = (slug) => gql`
  query GetProjects {
    allProject(where: {slug: {current: {eq: "${slug}"}}}) {
      code
    }
  }
`;

const Code = ({ code, language, showLineNumbers, startingLineNumber }) =>
  (
    <CodeBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      wrapLines
      theme={dracula}
    />
  );

const CodePage = () => {
  const { projectSlug } = useParams();
  const { loading: projectLoading, data } = useQuery(getProject(projectSlug));
  const projectData = data ? data.allProject[0] : null;

  return projectLoading ? (
    <Loader />
  ) : (
    projectData.code
    && (
    <Code
      code={projectData.code}
      language="csharp"
      showLineNumbers
      startingLineNumber={1}
      wrapLines
    />
    )
  );
};

export default CodePage;
