import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import { Author } from '../../types';

type Props = {
  service: keyof Author['social'];
  url: Author['social'][keyof Author['social']];
};

function SocialIconButton({ service, url }: Props) {
  const Icons = {
    github: <GitHubIcon />,
    email: <EmailIcon />,
    instagram: <InstagramIcon />,
  };

  return (
    <IconButton href={`${service === 'email' ? 'mailto:' : ''}${url}`}>
      {Icons[service]}
    </IconButton>
  );
}

export default SocialIconButton;
