import { FC } from 'react';
import { slideInDownAnimate } from 'utils/animation';
import Contact from '../navbar/partials/Contact';

const CTA4: FC = () => {
  return (
    <section
      className="wrapper image-wrapper bg-image bg-overlay"
      style={{ backgroundImage: 'url(/img/photos/apt1_2500.jpg)' }}
    >
      <div className="container py-18">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="fs-16 text-uppercase text-white mb-3 text-line">Join Our Community</h2>
            <h3 className="display-4 mb-5 mb-6 text-white pe-xxl-18">We just will make your life easier.</h3>
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
    </section>
  );
};

export default CTA4;
