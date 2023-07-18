import { NextPage } from 'next';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Fragment } from 'react';
// -------- custom component -------- //
import { Hero3 } from 'components/blocks/hero';
import { Blog1 } from 'components/blocks/blog';
import { Facts1 } from 'components/blocks/facts';
import { About3 } from 'components/blocks/about';
import { Navbar4 } from 'components/blocks/navbar';
import { Footer5 } from 'components/blocks/footer';
import { Contact1 } from 'components/blocks/contact';
import { Pricing3 } from 'components/blocks/pricing';
import { Process3 } from 'components/blocks/process';
import { Services4 } from 'components/blocks/services';
import { CTA4 } from 'components/blocks/call-to-action';
import { Testimonial2 } from 'components/blocks/testimonial';
import NextLink from 'components/reuseable/links/NextLink';
import PageProgress from 'components/common/PageProgress';
import { Portfolio1Custom } from 'components/blocks/portfolio';
import { PropsInterface, ProjectImages } from 'components/blocks/portfolio/Portfolio1Custom';

type Props = {
  port1: any;
};

const Demo3: NextPage<Props> = (props) => {
  // console.log(props.port1.data.attributes.photo.data);
  const imgs1: ProjectImages[] = props.port1.data.attributes.photo.data;
  console.log(imgs1);
  // data.attributes.photo.data
  // [0].attributes.formats.small
  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-dark">
        <Navbar4 onePageDemo />
      </header>

      <main className="content-wrapper">
        {/* ========== hero section ========== */}
        <Hero3 />

        <section className="wrapper bg-light">
          <div className="container pt-19 pt-md-21 pb-16 pb-md-18">
            {/* ========== our pricing section ========== */}
            <Pricing3 />

            {/* ========== what we do section ========== */}
            <section id="services">
              <Services4 />
            </section>

            <section id="portfolio">
              {/* ========== how it works section ========== */}
              <Portfolio1Custom projectImages={imgs1} />
            </section>

            {/* ========== why choose us section ========== */}
            <About3 />
          </div>
        </section>

        {/* ========== call to action section ========== */}
        <CTA4 />

        {/* ========== case studies section ========== */}
        <Blog1 />

        {/* ========== company facts section ========== */}
        <section id="whyus">
          <Facts1 />
        </section>

        <section className="wrapper bg-light angled upper-end lower-start">
          <div className="container py-16 py-md-18 position-relative">
            {/* ========== contact section ========== */}
            <Contact1 />
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer5 />
    </Fragment>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res1 = await fetch('http://localhost:1337/api/projects/1?populate=photo&populate=images');
  const port1: Port = await res1.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  type Port = {
    data: any;
  };

  return {
    props: {
      port1
    }
  };
}

export default Demo3;
