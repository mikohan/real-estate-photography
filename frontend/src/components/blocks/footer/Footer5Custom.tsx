import { FC } from 'react';
import Image from 'next/image';
// -------- custom component -------- //
import NextLink from 'components/reuseable/links/NextLink';
import SocialLinksCustom from 'components/reuseable/SocialLinksCustom';
// -------- data -------- //
import footerNav from 'data/footer';
import { PurpleAttributes } from 'interfaces/ICompany';
import { ISocialDatum } from 'interfaces/ISocial';

interface IProps {
  company: PurpleAttributes;
  social: ISocialDatum[];
}

const Footer5Custom: FC<IProps> = ({ company, social }) => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-inverse pt-13">
      <div className="container pt-13 pb-7">
        <div className="row gx-lg-0 gy-6">
          <div className="col-lg-4">
            <div className="widget">
              <img
                className="mb-4"
                src="/img/logo-dark3.png"
                srcSet="/img/logo-dark@2x3.png 2x"
                alt="Logo Angara Lab"
              />
              <p className="lead mb-0">
                We are {company.companyName}, a team of photographers specializing in Real Estate Photography.
              </p>
            </div>
          </div>

          <div className="col-lg-3 offset-lg-2">
            <div className="widget">
              <div className="d-flex flex-row">
                <div>
                  <div className="icon text-primary fs-28 me-4 mt-n1">
                    <i className="uil uil-phone-volume" />
                  </div>
                </div>

                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">{company.companyPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="widget">
              <div className="d-flex flex-row">
                <div>
                  <div className="icon text-primary fs-28 me-4 mt-n1">
                    <i className="uil uil-location-pin-alt" />
                  </div>
                </div>

                <div className="align-self-start justify-content-start">
                  <h5 className="mb-1">Address</h5>
                  <address>{company.companyAddress + ', ' + company.companyAddress2}</address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-11 mt-md-12 mb-7" />
        <div className="d-md-flex align-items-center justify-content-between">
          <p className="mb-2 mb-lg-0">
            © {year} {company.companyName}. All rights reserved.
          </p>
          <SocialLinksCustom social={social} className="nav social social-muted mb-0 text-md-end" />
        </div>
      </div>
    </footer>
  );
};

export default Footer5Custom;
