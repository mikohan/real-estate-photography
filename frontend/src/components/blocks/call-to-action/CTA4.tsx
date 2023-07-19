import { FC } from 'react';
import NextLink from 'components/reuseable/links/NextLink';

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
            <NextLink href="#" title="Contact Us" className="btn btn-white rounded mb-0 text-nowrap" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA4;
