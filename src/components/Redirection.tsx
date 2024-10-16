import { ReactNode } from 'react';

import { getUrlForRedirection } from '@graasp/sdk';
import { RedirectionContent } from '@graasp/ui';

import { GRAASP_BUILDER_HOST } from '../config/env';
import { hooks } from '../config/queryClient';
import { useRedirection } from '../hooks/searchParams';

type Props = {
  children: ReactNode;
};

const Redirection = ({ children }: Props) => {
  const { data: member } = hooks.useCurrentMember();
  const redirect = useRedirection();
  if (member) {
    return (
      <RedirectionContent
        link={redirect.url ?? getUrlForRedirection() ?? GRAASP_BUILDER_HOST}
      />
    );
  }

  return children;
};

export default Redirection;
