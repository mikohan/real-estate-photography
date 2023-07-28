import { FC } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { ILink } from '../Navbar4Custom';
import Link from 'next/link';

type IProps = { linkList: ILink[] };

const OnePageDemoLinksCustom: FC<IProps> = ({ linkList }) => {
  return (
    <ul className="navbar-nav">
      {linkList.map((item: ILink) =>
        item.scroll ? (
          <li className="nav-item" key={item.id}>
            <ScrollLink smooth spy activeClass="active" to={item.to} className="nav-link scroll" offset={-75}>
              {item.title}
            </ScrollLink>
          </li>
        ) : (
          <li className="nav-item" key={item.id}>
            <Link href={item.to}>
              <div className="nav-link scroll" style={{ cursor: 'pointer' }}>
                {item.title}
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default OnePageDemoLinksCustom;
