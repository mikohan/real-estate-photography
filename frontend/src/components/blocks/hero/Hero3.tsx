import { FC } from 'react';
import { slideInDownAnimate } from 'utils/animation';
import Typewriter from 'typewriter-effect';
import Contact from 'components/blocks/navbar/partials/Contact';
// -------- custom hook -------- //
import useLightBox from 'hooks/useLightBox';

const Hero3: FC = () => {
  // used for lightbox
  useLightBox();

  return (
    <section className="wrapper bg-dark angled lower-start">
      <div className="container pt-7 pt-md-11 pb-8">
        <div className="row gx-0 gy-10 align-items-center">
          <div className="col-lg-6">
            <h1 className="display-1 text-white mb-4" style={slideInDownAnimate('600ms')}>
              We Focus on <br />
              <span className="text-primary text-nowrap">
                <Typewriter
                  options={{
                    loop: true,
                    autoStart: true,
                    strings: [
                      'Real Estate Photography',
                      'Aerial/Drone Photography',
                      '360 Virtual Tours',
                      'Virtual Staging',
                      'Real Estate Marketing Sevices'
                    ]
                  }}
                />
              </span>
            </h1>

            <p
              className="lead fs-24 lh-sm text-white mb-7 pe-md-18 pe-lg-0 pe-xxl-15"
              style={slideInDownAnimate('900ms')}
            >
              Besides media listing services we provide real estate online marketing as well as pre photo shoot
              cleaning.
            </p>

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

          <div className="col-lg-5 offset-lg-1 mb-n18" data-cues="slideInDown">
            <div className="position-relative" style={slideInDownAnimate('0ms')}>
              <a
                data-glightbox
                href="/media/intro1.mov"
                className="btn btn-circle btn-primary btn-play ripple mx-auto mb-6 position-absolute"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 3 }}
              >
                <i className="icn-caret-right" />
              </a>
              <figure className="rounded shadow-lg">
                <img src="/img/photos/about13-2.jpg" srcSet="/img/photos/about13-2@2x.jpg 2x" alt="hero" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
