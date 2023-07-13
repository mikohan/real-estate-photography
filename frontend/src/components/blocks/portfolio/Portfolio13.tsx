import { FC } from 'react';
import { ProjectCard4 } from 'components/reuseable/project-cards';
// -------- hook -------- //
import useTooltip from 'hooks/useTooltip';
// -------- data -------- //
import { projects } from 'data/demo-28';

const Portfolio13: FC = () => {
  useTooltip();

  return (
    <div className="grid grid-view projects-masonry mt-md-n20 mt-lg-n22 mb-20">
      <div className="row g-8 g-lg-10">
        {projects.map((item) => (
          <div key={item.id} className="project col-md-6 col-xl-4">
            <ProjectCard4 {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio13;
