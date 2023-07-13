import { FC } from 'react';
import Carousel from 'components/reuseable/Carousel';
import { BlogCard5 } from 'components/reuseable/blog-cards';
// -------- data -------- //
import { blogList5 } from 'data/blog';

const Hero25: FC = () => {
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    992: { slidesPerView: 2 }
  };

  return (
    <div className="swiper-container blog grid-view mb-16">
      <Carousel slidesPerView={2} navigation={false} breakpoints={carouselBreakpoints}>
        {blogList5.map((item) => (
          <BlogCard5 key={item.id} {...item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero25;
