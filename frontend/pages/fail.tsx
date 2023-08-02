import { NextPage } from 'next';
import { Fragment } from 'react';
// -------- custom component -------- //
import { Navbar } from 'components/blocks/navbar';
import { Footer8 } from 'components/blocks/footer';
import FigureImage from 'components/reuseable/FigureImage';
import NextLink from 'components/reuseable/links/NextLink';
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';

const NotFound: NextPage = () => {
  return (
    <Fragment>
      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        <Navbar4Custom showLogo onePageDemo={false} />
      </header>

      <main className="content-wrapper">
        <section className="wrapper bg-light">
          <div className="container pt-12 pt-md-14 pb-14 pb-md-16">
            <div className="row">
              <div className="col-lg-9 col-xl-8 mx-auto" style={{ display: 'flex', justifyContent: 'center' }}>
                <FigureImage
                  style={{ width: '50%' }}
                  width={400}
                  height={316}
                  src="/img/warning.png"
                  className="mb-10"
                />
              </div>

              <div className="col-lg-8 col-xl-7 col-xxl-6 mx-auto text-center">
                <h1 className="mb-3">Transaction failed!</h1>
                <p className="lead mb-7 px-md-12 px-lg-5 px-xl-7">Try to call us or reach some of the ways.</p>

                <NextLink title="Go to Homepage" href="/" className="btn btn-primary rounded-pill" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer5Custom />
    </Fragment>
  );
};

export default NotFound;
