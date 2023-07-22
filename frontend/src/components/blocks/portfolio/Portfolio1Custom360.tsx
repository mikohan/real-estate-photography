import { FC } from 'react';
import Image from 'next/image';
import Carousel from 'components/reuseable/Carousel';
import { IProject, ProjectDatum } from 'interfaces/IProjects';
// -------- data -------- //
import { portfolioList1 } from 'data/portfolio';
import { IPriceDatum } from 'interfaces/IPrice';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
import { IMediaSet } from 'interfaces/IMediaSet';

const ReactPhotoSphereViewer = dynamic(
  () => import('react-photo-sphere-viewer').then((mod) => mod.ReactPhotoSphereViewer),
  {
    ssr: false
  }
);

export interface PropsInterface {
  projectImages: IMediaSet;
}
const Portfolio1Custom360: FC<PropsInterface> = ({ projectImages }) => {
  const image = projectImages.data.attributes.media.data[0].attributes.url;
  const images = projectImages.data.attributes.media.data;
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <div className="container-fluid px-md-6">
      <div className="container py-11 py-md-12">
        <div className="row mb-8 text-center">
          <div className="col-lg-9 col-xl-8 col-xxl-7 mx-auto">
            <h2 className="fs-16 text-uppercase text-primary mb-3">Drone 360 Tours</h2>
            <h3 className="display-4">Check out some of our awesome projects with creative ideas and great design.</h3>
          </div>
        </div>
        <div className="grid grid-view projects-masonry">
          <div className="row gx-md-8 gy-10 gy-md-13 isotope">
            {images.map((item) => (
              <div className="project item col-md-6 col-xl-4 product" key={item.id}>
                <figure className="lift rounded mb-6">
                  <div id="some" className="row">
                    <ReactPhotoSphereViewer
                      container={'some'}
                      src={`http://localhost:1337${image}`}
                      height={'30vh'}
                      width={'100%'}
                    ></ReactPhotoSphereViewer>
                  </div>
                </figure>

                <div className="project-details d-flex justify-content-center flex-column">
                  <div className="post-header">
                    <div className={`post-category mb-2 text-aqua`}>Some text</div>
                    <h2 className="post-title h3">Some h2 text</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="swiper-container blog grid-view mb-11 mb-md-12">
        <div className="row mb-8 text-center">
          <div className="col-lg-9 col-xl-8 col-xxl-7 mx-auto">
            <h2 className="fs-16 text-uppercase text-primary mb-3">Some text</h2>
            <h3 className="display-4">Check out some of our awesome projects with creative ideas and great design.</h3>
          </div>
        </div>

        <Carousel grabCursor breakpoints={carouselBreakpoints}>
          {projectImages.map((item: ProjectDatum, i: number) => (
            <figure className="rounded" key={item.id}>
              <Image
                width={900}
                height={650}
                src={`http://localhost:1337${item.attributes.formats.small.url}`}
                alt="project"
                style={{ width: '100%', height: 'auto' }}
              />
            </figure>
          ))}
        </Carousel>
      </div> */}
    </div>
  );
};

export default Portfolio1Custom360;
