import { NextPage } from 'next';
// -------- custom component -------- //
import { Blog8 } from 'components/blocks/blog';
import { Team9 } from 'components/blocks/team';
import { Hero32 } from 'components/blocks/hero';
import { Navbar } from 'components/blocks/navbar';
import { Footer8 } from 'components/blocks/footer';
import { CTA12 } from 'components/blocks/call-to-action';
import { About32, About33 } from 'components/blocks/about';
import { Testimonial26 } from 'components/blocks/testimonial';
import { Services34, Services35 } from 'components/blocks/services';
import PageProgress from 'components/common/PageProgress';
// -------- custom hooks -------- //
import useLightBox from 'hooks/useLightBox';
import useProgressbar from 'hooks/useProgressbar';

const Demo32: NextPage = () => {
  // used for popup lightbox
  useLightBox();
  // used for svg progress bar
  useProgressbar();

  return (
    <div className="box-layout">
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="position-absolute w-100 pt-1">
        <Navbar
          info
          search
          logoAlt="logo-light"
          navClassName="navbar navbar-expand-lg center-nav transparent navbar-dark caret-none"
        />
      </header>

      {/* ========== main content ========== */}
      <main className="content-wrapper">
        {/* ========== hero section ========== */}
        <Hero32 />

        {/* ========== plyr & about section ========== */}
        <section className="wrapper bg-light">
          <div className="container py-15 py-md-17 position-relative">
            {/* ========== video plyr section ========== */}
            <figure
              data-delay="250"
              data-cues="fadeIn"
              className="rounded mt-n21 mt-lg-n23 mb-16 mb-md-18 position-relative"
            >
              <a
                data-glightbox
                href="/media/movie3.mp4"
                className="btn btn-circle btn-white btn-play ripple mx-auto position-absolute"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
              >
                <i className="icn-caret-right" />
              </a>

              <video
                loop
                muted
                autoPlay
                playsInline
                src="/media/movie3.mp4"
                poster="/img/photos/movie3.jpg"
                className="w-100 rounded caption-overlay d-block"
              />
            </figure>

            {/* ========== who are we section ========== */}
            <About32 />
          </div>
        </section>

        {/* ========== our services section ========== */}
        <Services34 />

        {/* ========== what make us section ========== */}
        <About33 />

        {/* ========== what make us section ========== */}
        <Blog8 />

        {/* ========== why choose sandbox section ========== */}
        <Services35 />

        {/* ========== our team section ========== */}
        <Team9 />

        {/* ========== testimonial & community section ========== */}
        <section className="wrapper gradient-8 bg-lines">
          <div className="container py-15 pt-md-0 pb-md-17 text-center">
            {/* ========== testimonial section ========== */}
            <Testimonial26 />

            {/* ========== our community section ========== */}
            <CTA12 />
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer8 />
    </div>
  );
};

export default Demo32;
