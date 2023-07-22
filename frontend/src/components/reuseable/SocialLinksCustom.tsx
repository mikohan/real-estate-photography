import { FC } from 'react';
import { ISocialDatum } from 'interfaces/ISocial';

// ========================================================
type SocialLinksProps = { className?: string; social: ISocialDatum[] };
// ========================================================

const SocialLinksCustom: FC<SocialLinksProps> = ({ className = 'nav social social-white mt-4', social }) => {
  return (
    <nav className={className}>
      {social.map((item: ISocialDatum) => (
        <a href={item.attributes.link} key={item.id} target="_blank" rel="noreferrer">
          <i className={item.attributes.icon} />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinksCustom;
