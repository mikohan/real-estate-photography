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
import { Services4, Services4Custom } from 'components/blocks/services';
import { CTA4 } from 'components/blocks/call-to-action';
import { Testimonial2 } from 'components/blocks/testimonial';
import NextLink from 'components/reuseable/links/NextLink';
import PageProgress from 'components/common/PageProgress';
import { Portfolio1Custom } from 'components/blocks/portfolio';
import { IService, Datum } from 'interfaces/IServices';
import { IProject, ProjectDatum } from 'interfaces/IProjects';
import Portfolio8Videos from 'components/blocks/portfolio/Portfolio8Videos';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { ICompany, PurpleAttributes } from 'interfaces/ICompany';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';

type Props = {
  port1: IProject;
  services: IService;
  drone: IProject;
  video: IProject;
  price: IPrice;
  company: ICompany;
};

const Demo3: NextPage<Props> = (props) => {
  // console.log(props.port1.data.attributes.photo.data);
  const imgs1: ProjectDatum[] = props.port1.data.attributes.photo!.data;
  const serv: Datum[] = props.services.data;
  const drone_img: ProjectDatum[] = props.drone.data.attributes.photo!.data;
  const video_img: ProjectDatum[] = props.video.data.attributes.photo!.data;
  const video_video: ProjectDatum[] = props.video.data.attributes.video!.data;
  const prices: IPriceDatum[] = props.price.data;
  const rEPrice = prices[0];
  const company: PurpleAttributes = props.company.data.attributes;
  console.log(company);

  // const serviceRE = 'Real Estate Photography';
  const serviceRE: string = props.port1.data.attributes.title;
  const serviceDrone: string = props.drone.data.attributes.title;
  const serviceVideo: string = props.video.data.attributes.title;
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
              <Services4Custom services={serv} />
            </section>

            <section id="portfolio">
              {/* ========== how it works section ========== */}
              <Portfolio1Custom projectImages={imgs1} serviceTitle={serviceRE} />
              <Portfolio1Custom projectImages={drone_img} serviceTitle={serviceDrone} />
            </section>
            <section id="video">
              <Portfolio8Videos projectVideos={video_video} serviceTitle={serviceVideo} />
            </section>

            {/* ========== why choose us section ========== */}
            {/* <About3 /> */}
          </div>
        </section>

        {/* ========== call to action section ========== */}
        <CTA4 />

        {/* ========== case studies section ========== */}
        {/* <Blog1 /> */}

        <section className="wrapper bg-light angled upper-end lower-start">
          <div className="container py-16 py-md-18 position-relative">
            {/* ========== contact section ========== */}
            <Contact1 company={company} />
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer5Custom company={company} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res1 = await fetch('http://localhost:1337/api/projects/1?populate=photo&populate=images');
  const port1: IProject = await res1.json();

  const res_drone = await fetch('http://localhost:1337/api/projects/2?populate=photo&populate=images');
  const drone: IProject = await res_drone.json();

  const res_video = await fetch('http://localhost:1337/api/projects/3/?populate=photo&populate=video');
  const video: IProject = await res_video.json();

  //Services fetching starts here
  const res2 = await fetch('http://localhost:1337/api/services/?populate=photo&populate=image');
  const services: IService = await res2.json();

  //Prices fetching starts here
  const price_res = await fetch('http://localhost:1337/api/prices?populate=thumbnail');
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      port1,
      services,
      drone,
      video,
      price,
      company
    }
  };
}

export default Demo3;
