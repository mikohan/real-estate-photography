import NextLink from 'components/reuseable/links/NextLink';
import SocialLinks from 'components/reuseable/SocialLinks';
import Link from 'next/link';
import { FC, Fragment, ReactElement } from 'react';
import { PurpleAttributes } from 'interfaces/ICompany';
import { ISocialDatum } from 'interfaces/ISocial';
import SocialLinksCustom from 'components/reuseable/SocialLinksCustom';
import { ILink } from '../Navbar4Custom';
import { Link as ScrollLink } from 'react-scroll';

// ========================================================
type InfoProps = {
  company: PurpleAttributes;
  social: ISocialDatum[];
  linkList: ILink[];
};
// ========================================================

const Info: FC<InfoProps> = (props) => {
  const { social, company, linkList } = props;

  const otherPages = [
    { title: 'Our Story', url: '#' },
    { title: 'Terms of Use', url: '#' },
    { title: 'Privacy Policy', url: '#' },
    { title: 'Contact Us', url: '#' }
  ];

  return (
    <div className="offcanvas offcanvas-end text-inverse" id="offcanvas-info" data-bs-scroll="true">
      <div className="offcanvas-header">
        <h3 className="text-white fs-30 mb-0">{company.companyName}</h3>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>

      <div className="offcanvas-body pb-6">
        <div className="widget mb-8">
          <p>{company.slogan}</p>
        </div>

        <div className="widget mb-8">
          <h4 className="widget-title text-white mb-3">Contact Info</h4>
          <address>{company.companyAddress + ', ' + company.companyAddress2}</address>
          <NextLink title={company.companyEmail} className="link-inverse" href={`mailto:${company.companyEmail}`} />
          <br />
          <NextLink href={`tel:${company.companyPhone}`} title={company.companyPhone!} />
        </div>

        <div className="widget mb-8">
          <h4 className="widget-title text-white mb-3">Learn More</h4>
          <ul className="list-unstyled">
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
        </div>

        <div className="widget">
          <h4 className="widget-title text-white mb-3">Follow Us</h4>
          <SocialLinksCustom social={social} className="nav social social-white" />
        </div>
      </div>
    </div>
  );
};

// set default props
// Info.defaultProps = {
//   title: 'Sandbox',
//   phone: '00 (123) 456 78 90',
//   description: `Sandbox is a multipurpose HTML5 template with various layouts which will be a great solution for your business.`,
//   address: (
//     <Fragment>
//       Moonshine St. 14/05 <br /> Light City, London
//     </Fragment>
//   )
// };

export default Info;
