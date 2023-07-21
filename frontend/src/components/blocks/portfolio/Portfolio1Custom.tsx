import { FC } from 'react';
import Image from 'next/image';
import Carousel from 'components/reuseable/Carousel';
import { IProject, ProjectDatum } from 'interfaces/IProjects';
// -------- data -------- //
import { portfolioList1 } from 'data/portfolio';
import { IPriceDatum } from 'interfaces/IPrice';

export interface PropsInterface {
  projectImages: ProjectDatum[];
  serviceTitle: string;
  priceUnit?: IPriceDatum;
}
const Portfolio1: FC<PropsInterface> = ({ projectImages, serviceTitle, priceUnit }) => {
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <div className="container-fluid px-md-6">
      <div className="swiper-container blog grid-view mb-11 mb-md-12">
        <div className="row mb-8 text-center">
          <div className="col-lg-9 col-xl-8 col-xxl-7 mx-auto">
            <h2 className="fs-16 text-uppercase text-primary mb-3">{serviceTitle}</h2>
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
      </div>
    </div>
  );
};

export default Portfolio1;
