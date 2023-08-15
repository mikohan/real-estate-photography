import { FC } from 'react';
import { slideInDownAnimate } from 'utils/animation';
import Contact from '../navbar/partials/Contact';
import FigureImage from 'components/reuseable/FigureImage';
import { PurpleAttributes } from 'interfaces/ICompany';
import { BACKEND_IMG_URL } from 'config';

interface IProps {
  company: PurpleAttributes;
}

const Contact1: FC<IProps> = ({ company }) => {
  return (
    <div className="row gy-10 gy-sm-13 gx-lg-3 align-items-center">
      <div className="col-md-8 col-lg-6 position-relative">
        <div className="shape bg-dot primary rellax w-17 h-21" style={{ top: '-2rem', left: '-1.9rem' }} />
        <div
          className="shape rounded bg-soft-primary rellax d-md-block"
          style={{ width: '85%', height: '90%', right: '-1.5rem', bottom: '-1.8rem' }}
        />

        <figure className="rounded">
          <img
            src={BACKEND_IMG_URL + company.companyMainPhoto.data.attributes.formats.large.url}
            srcSet="/img/photos/about14@2x.jpg 2x"
            alt={company.companyName}
          />
        </figure>
      </div>

      <div className="col-lg-5 col-xl-4 offset-lg-1">
        <h2 className="fs-16 text-uppercase text-line text-primary mb-3">Get In Touch</h2>
        <h2 className="display-4 mb-8">Convinced yet? Let's make something great together.</h2>

        <div className="d-flex flex-row">
          <div>
            <div className="icon text-primary fs-28 me-6 mt-n1">
              <i className="uil uil-location-pin-alt" />
            </div>
          </div>

          <div>
            <h5 className="mb-1">Address</h5>
            <address>
              {company.companyAddress}, <br className="d-none d-md-block" />
              {company.companyAddress2}
            </address>
          </div>
        </div>

        <div className="d-flex flex-row">
          <div>
            <div className="icon text-primary fs-28 me-6 mt-n1">
              <i className="uil uil-phone-volume" />
            </div>
          </div>
          <div>
            <h5 className="mb-1">Phone</h5>
            <p>{company.companyPhone}</p>
          </div>
        </div>

        <div className="d-flex flex-row">
          <div>
            <div className="icon text-primary fs-28 me-6 mt-n1">
              <i className="uil uil-envelope" />
            </div>
          </div>
          <div>
            <h5 className="mb-1">E-mail</h5>
            <p className="mb-0">
              <a href="mailto:sandbox@email.com" className="link-body">
                {company.companyEmail}
              </a>
            </p>
          </div>
        </div>
        <div className="d-flex flex-row mt-12">
          <div>
            <div style={slideInDownAnimate('1200ms')}>
              <button
                className="btn btn-primary rounded-pill mx-1 mb-2 mb-md-0"
                data-bs-toggle="modal"
                data-bs-target="#modal-contact"
              >
                Get Instant Quote
              </button>
            </div>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact1;
