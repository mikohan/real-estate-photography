import { FC } from 'react';
import { urls } from 'utils/urls';
import Link from 'next/link';
import LinkType from 'types/link';
// -------- custom component -------- //
import ListItemLink from 'components/reuseable/links/ListItemLink';
import DropdownToggleLink from 'components/reuseable/links/DropdownToggleLink';
// -------- data -------- //
import { blogsNavigation, demos, pages, projectsNavigation } from 'data/navigation';

const Navigations: FC = () => {
  return (
    <ul className="navbar-nav">
      <ListItemLink href={urls.home()} title="Home" />
      <ListItemLink href={urls.shop()} title="A La Cart" />
    </ul>
  );
};

export default Navigations;
