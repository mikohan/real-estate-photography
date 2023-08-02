import { FC, Fragment, useRef } from 'react';
// -------- custom hook -------- //
import useSticky from 'hooks/useSticky';
// -------- custom component -------- //
import NextLink from 'components/reuseable/links/NextLink';
import SocialLinksCustom from 'components/reuseable/SocialLinksCustom';
// -------- partial header component -------- //
import InfoCustom from './partials/InfoCustom';
import Search from './partials/Search';
import NavigationsCustom from './partials/NavigationsCustom';
import OnePageDemoLinksCustom from './partials/OnePageDemoLinksCustom';
import { ISocialDatum } from 'interfaces/ISocial';
import { PurpleAttributes } from 'interfaces/ICompany';
import { urls } from 'utils/urls';

// ===================================================================
type Navbar4Props = {
  navClassName?: string;
  onePageDemo?: boolean;
  social?: ISocialDatum[];
  company?: PurpleAttributes;
  showLogo: boolean;
};
export type ILink = { id: number; title: string; to: string; scroll?: boolean };

// ===================================================================

// -------- data -------- //
const linkList: ILink[] = [
  { id: 1, title: 'Home', to: urls.home(), scroll: false },
  { id: 2, title: 'A La Cart', to: urls.shop(), scroll: false },
  { id: 3, title: 'Pricing', to: 'pricing', scroll: true },
  { id: 4, title: 'Why Us', to: 'why-us', scroll: true },
  { id: 5, title: 'Portfolio', to: 'portfolio', scroll: true },
  { id: 6, title: 'Contacts', to: 'contacts', scroll: true }
];

const Navbar4Custom: FC<Navbar4Props> = ({ navClassName, onePageDemo, social, company, showLogo }) => {
  const sticky = useSticky(350);
  const navbarRef = useRef<HTMLElement | null>(null);

  // dynamically added navbar classname
  const fixedClassName = `navbar navbar-expand-lg extended extended-alt navbar-light navbar-bg-light navbar-clone fixed`;

  return (
    <Fragment>
      <div style={{ paddingTop: sticky ? navbarRef.current?.clientHeight : 0 }} />

      <nav ref={navbarRef} className={sticky ? fixedClassName : navClassName}>
        <div className="container flex-lg-column">
          {showLogo && (
            <div className="topbar d-flex flex-row justify-content-lg-center align-items-center">
              <div className="navbar-brand">
                <NextLink
                  href="/"
                  title={<img alt="logo" src="/img/logo-dark3.png" srcSet="/img/logo-dark@2x3.png 2x" />}
                />
              </div>
              <div></div>
            </div>
          )}

          <div className="navbar-collapse-wrapper bg-white d-flex flex-row align-items-center justify-content-between">
            {/* ============= left side content ============= */}
            <div className="navbar-other w-100 d-none d-lg-block">
              {social && <SocialLinksCustom social={social} className="nav social social-muted" />}{' '}
            </div>

            <div
              className="navbar-collapse offcanvas offcanvas-nav offcanvas-start"
              data-bs-scroll="true"
              id="offcanvas-nav"
            >
              <div className="offcanvas-header d-lg-none">
                {company && <h3 className="text-white fs-30 mb-0">{company.companyName}</h3>}
                <button
                  type="button"
                  aria-label="Close"
                  data-bs-dismiss="offcanvas"
                  className="btn-close btn-close-white"
                />
              </div>

              <div className="offcanvas-body d-flex flex-column h-100">
                {onePageDemo ? <OnePageDemoLinksCustom linkList={linkList} /> : <NavigationsCustom />}

                {/* ============= show contact info in the small device sidebar ============= */}
                {company && social && (
                  <div className="offcanvas-footer d-lg-none">
                    <div>
                      <NextLink
                        title={company.companyEmail}
                        className="link-inverse"
                        href={`mailto:${company.companyEmail}`}
                      />
                      <br />
                      <NextLink href={`tel:${company.companyPhone}`} title={company.companyPhone} />
                      <br />
                      <SocialLinksCustom social={social} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ============= right side content ============= */}
            <div className="navbar-other w-100 d-flex">
              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* ============= info button ============= */}
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-info">
                    <i className="uil uil-info-circle" />
                  </a>
                </li>
                {/* ============= search icon button ============= */}
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-search">
                    <i className="uil uil-search" />
                  </a>
                </li>

                <li className="nav-item d-lg-none">
                  <button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas-nav"
                    className="hamburger offcanvas-nav-btn"
                  >
                    <span />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* ============= info sidebar ============= */}
      {company && social && <InfoCustom company={company} social={social} linkList={linkList} />}

      {/* ============= show search box ============= */}
      <Search />
    </Fragment>
  );
};

// set deafult Props
Navbar4Custom.defaultProps = {
  navClassName: 'navbar navbar-expand-lg extended extended-alt navbar-light navbar-bg-light'
};

export default Navbar4Custom;
