import React from 'react';

type Props = {
  text: string;
};

const PageTitle = ({ text }: Props) => {
  return <h1>{text}</h1>;
};

export default PageTitle;
