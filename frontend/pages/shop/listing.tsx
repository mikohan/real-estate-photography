import { NextPage } from 'next';
import { Fragment } from 'react';
// -------- custom component -------- //
import Filter from 'components/common/Filter';
import Select from 'components/reuseable/Select';
import ShopService from 'components/common/ShopService';
import Breadcrumb from 'components/reuseable/Breadcrumb';
import PageProgress from 'components/common/PageProgress';
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import { Footer8 } from 'components/blocks/footer';
import { ProductCardCustom } from 'components/reuseable/product-cards';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { ICompany, PurpleAttributes } from 'interfaces/ICompany';
import { ISocial, ISocialDatum } from 'interfaces/ISocial';
// -------- data -------- //
import products from 'data/product-list';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
};

const ShopTwo: NextPage<Props> = (props) => {
  // filter options
  const options = [
    { id: 1, title: 'Sort by popularity', value: 'popular' },
    { id: 2, title: 'Sort by average rating', value: 'rating' },
    { id: 3, title: 'Sort by newness', value: 'new' },
    { id: 4, title: 'Sort by price: low to high', value: 'low-to-high' },
    { id: 5, title: 'Sort by price: high to low', value: 'high-to-low' }
  ];
  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        {/* <Navbar4Custom cart navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light" /> */}
        <Navbar4Custom social={social} company={company} onePageDemo />
      </header>

      <main className="content-wrapper">
        {/* ========== breadcrumb section ========== */}
        <section className="wrapper bg-gray">
          <div className="container py-3 py-md-5">
            <Breadcrumb className="mb-0" />
          </div>
        </section>

        {/* ========== products section ========== */}
        <section className="wrapper bg-light">
          <div className="container pb-14 pb-md-16 pt-12">
            <div className="row gy-10">
              <div className="col-lg-12 order-lg-2">
                <div className="row gx-md-8 gy-10 gy-md-13 mb-10">
                  {products.map((item) => (
                    <ProductCardCustom {...item} key={item.id} className="col-md-12 col-xl-12" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== service section ========== */}
        <ShopService />
      </main>

      {/* ========== footer section ========== */}
      <Footer5Custom company={company} social={social} />
    </Fragment>
  );
};

export async function getStaticProps() {
  //Prices fetching starts here
  const price_res = await fetch('http://localhost:1337/api/prices?populate=thumbnail');
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  // Getting panorama data

  return {
    props: {
      price,
      company,
      social
    }
  };
}

export default ShopTwo;
