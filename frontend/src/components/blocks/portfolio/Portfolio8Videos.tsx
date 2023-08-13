import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Plyr from 'plyr-react';
// -------- data -------- //
import { portfolioList5 } from 'data/portfolio';
import { ProjectDatum } from 'interfaces/IProjects';
import { companyInfo } from 'config';

interface IProps {
  projectVideos: ProjectDatum[];
  serviceTitle: string;
}

const Portfolio8Videos: FC<IProps> = ({ projectVideos, serviceTitle }) => {
  return (
    <section className="wrapper bg-light">
      <div className="container">
        <div className="row mb-8 text-center">
          <div className="col-lg-9 col-xl-8 col-xxl-7 mx-auto">
            <h2 className="fs-16 text-uppercase text-primary mb-3">{serviceTitle}</h2>
            <h3 className="display-4">Check out some of {serviceTitle}.</h3>
          </div>
        </div>

        <div className="grid grid-view projects-masonry">
          <div className="row gx-md-8 gy-10 gy-md-13 isotope">
            {projectVideos.map((item: ProjectDatum) => (
              <div className="project item col-md-6 col-xl-4 product" key={item.id}>
                <figure className="lift rounded mb-6">
                  <Plyr
                    options={{ loadSprite: true, clickToPlay: true }}
                    source={{
                      type: 'video',
                      sources: [{ src: companyInfo.backendUrl + item.attributes.url, provider: 'html5' }]
                    }}
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio8Videos;
