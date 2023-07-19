import { FC } from 'react';
import Image from 'next/image';
import Carousel from 'components/reuseable/Carousel';
// -------- data -------- //
import { portfolioList1 } from 'data/portfolio';

export interface PropsInterface {
  projectImages: ProjectImages[];
}
export interface ProjectImages {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  name: string;
  alternativeText: string;
  caption?: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: null;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Formats {
  thumbnail: ThumbnailOrSmallOrLargeOrMedium;
  small: ThumbnailOrSmallOrLargeOrMedium;
  large: ThumbnailOrSmallOrLargeOrMedium;
  medium: ThumbnailOrSmallOrLargeOrMedium;
}
export interface ThumbnailOrSmallOrLargeOrMedium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

const Portfolio1: FC<PropsInterface> = ({ projectImages }) => {
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <div className="container-fluid px-md-6">
      <h2 className="fs-16 text-uppercase text-line text-primary mb-3">Real Estate Photography</h2>
      <div className="swiper-container blog grid-view mb-17 mb-md-19">
        <Carousel grabCursor breakpoints={carouselBreakpoints}>
          {projectImages.map((item: ProjectImages, i: number) => (
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
