import { NextPage } from 'next';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Fragment } from 'react';
// -------- custom component -------- //
import { Hero3 } from 'components/blocks/hero';
import { Contact1, Contact1Custom } from 'components/blocks/contact';
import { Pricing3, Pricing3Custom } from 'components/blocks/pricing';
import { Services4Custom } from 'components/blocks/services';
import { CTA4Custom } from 'components/blocks/call-to-action';
import PageProgress from 'components/common/PageProgress';
import { Portfolio1Custom } from 'components/blocks/portfolio';
import { IService, Datum } from 'interfaces/IServices';
import { IProject, ProjectDatum } from 'interfaces/IProjects';
import Portfolio8Videos from 'components/blocks/portfolio/Portfolio8Videos';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { ICompany, PurpleAttributes } from 'interfaces/ICompany';
import { ISocial, ISocialDatum } from 'interfaces/ISocial';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';
import { IMediaSet } from 'interfaces/IMediaSet';
import { Portfolio1Custom360 } from 'components/blocks/portfolio';
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import { IPackageSet } from 'interfaces/IPackageSet';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Script from 'next/script';
import { BACKEND_IMG_URL, HOST_URL, companyInfo } from 'config';

type Props = {
  port1: IProject;
  services: IService;
  drone: IProject;
  video: IProject;
  price?: IPrice;
  company: ICompany;
  social: ISocial;
  panorama: IMediaSet;
  pack: IPackageSet;
};

const Demo3: NextPage<Props> = (props) => {
  // console.log(props.port1.data.attributes.photo.data);
  const imgs1: ProjectDatum[] = props.port1.data.attributes.photo!.data;
  const serv: Datum[] = props.services.data;
  const drone_img: ProjectDatum[] = props.drone.data.attributes.photo!.data;
  const video_img: ProjectDatum[] = props.video.data.attributes.photo!.data;
  const video_video: ProjectDatum[] = props.video.data.attributes.video!.data;
  const prices: IPriceDatum[] = props.price!.data;
  const rEPrice = prices[0];
  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  const mediaSet: IMediaSet = props.panorama;
  const pack: IPackageSet = props.pack;
  //data.attributes.media.data

  // const serviceRE = 'Real Estate Photography';
  const serviceRE: string = props.port1.data.attributes.title;
  const serviceDrone: string = props.drone.data.attributes.title;
  const serviceVideo: string = props.video.data.attributes.title;
  // Comment

  const title = 'Real Estate Photogrpaphy | Angara Lab LLC';
  const description =
    'Schedule the shoot, and we will handle the rest. High resolution photography, aerial photography, virtual tours and more, made easy.';
  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={HOST_URL}
        openGraph={{
          url: HOST_URL,
          title,
          description,
          images: [
            {
              url: BACKEND_IMG_URL + 'rose1200.jpg',
              width: 1200,
              height: 800,
              alt: 'Angara Lab LLC First Image',
              type: 'image/jpeg'
            },
            {
              url: BACKEND_IMG_URL + 'og-image02.jpg',
              width: 900,
              height: 800,
              alt: 'Angara Lab LLC Second Image',
              type: 'image/jpeg'
            },
            { url: BACKEND_IMG_URL + 'og-image03.jpg' },
            { url: BACKEND_IMG_URL + 'og-image04.jpg' }
          ],
          site_name: companyInfo.companyName
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-dark">
        <Navbar4Custom showLogo social={social} company={company} onePageDemo />
      </header>

      <main className="content-wrapper">
        {/* ========== hero section ========== */}
        <Hero3 />

        <section className="wrapper bg-light">
          <div className="container pt-19 pt-md-21 pb-16 pb-md-18">
            {/* ========== our pricing section ========== */}
            <Pricing3Custom pack={pack} />

            {/* ========== what we do section ========== */}
            <section id="why-us">
              <Services4Custom services={serv} />
            </section>

            <section id="portfolio">
              {/* ========== how it works section ========== */}
              <Portfolio1Custom projectImages={imgs1} serviceTitle={serviceRE} />
              <Portfolio1Custom projectImages={drone_img} serviceTitle={serviceDrone} />
              <Portfolio8Videos projectVideos={video_video} serviceTitle={serviceVideo} />
              <Portfolio1Custom360 projectImages={mediaSet} />
            </section>

            {/* ========== why choose us section ========== */}
            {/* <About3 /> */}
          </div>
        </section>

        {/* ========== call to action section ========== */}
        <CTA4Custom />

        {/* ========== case studies section ========== */}
        {/* <Blog1 /> */}

        <section id="contacts" className="wrapper bg-light angled upper-end lower-start">
          <div className="container py-16 py-md-18 position-relative">
            {/* ========== contact section ========== */}
            <Contact1Custom company={company} />
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer5Custom company={company} social={social} />
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

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  // Getting panorama data

  const panorama_res = await fetch('http://localhost:1337/api/images/1?populate=media');
  const panorama: IMediaSet = await panorama_res.json();
  // Packages

  const package_res = await fetch(`http://localhost:1337/api/package-sets?populate=*`);
  const pack: IPackageSet = await package_res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      port1,
      services,
      drone,
      video,
      price,
      company,
      social,
      panorama,
      pack
    }
  };
}

export default Demo3;
