import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, NextPage } from 'next';
import { Fragment } from 'react';
import currency from 'utils/currency';
// -------- custom component -------- //
import { Navbar } from 'components/blocks/navbar';
import { Footer8 } from 'components/blocks/footer';
import ShopService from 'components/common/ShopService';
import Breadcrumb from 'components/reuseable/Breadcrumb';
import PageProgress from 'components/common/PageProgress';
import { ProductCard2 } from 'components/reuseable/product-cards';
import { Checkbox, Input, Select } from 'components/elements/checkout-form';
// -------- data -------- //
import { breadcrumb, orderProducts, orderSummeryRow } from 'data/checkout-page';
import { IPrice } from 'interfaces/IPrice';
import { ICompany } from 'interfaces/ICompany';
import { ISocial } from 'interfaces/ISocial';
import { IPackageSet } from 'interfaces/IPackageSet';
import { BACKEND_API_URL } from 'config';

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
  pack: IPackageSet;
};
const Checkout: NextPage<Props> = ({ price, company, social, pack }) => {
  const total = 123;
  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        <Navbar search cart navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light" />
      </header>

      <main className="content-wrapper">
        {/* ========== breadcrumb section ========== */}
        <section className="wrapper bg-gray">
          <div className="container py-3 py-md-5">
            <Breadcrumb data={breadcrumb} className="mb-0" />
          </div>
        </section>

        <div className="wrapper bg-light">
          <div className="container pt-12 pt-md-14 pb-14 pb-md-16">
            <div className="row gx-md-8 gx-xl-12 gy-12">
              {/* ========== shipping section ========== */}
              <div className="col-lg-8">
                <div className="alert alert-blue alert-icon mb-6" role="alert">
                  <i className="uil uil-exclamation-circle"></i> Tell us about real estate{' '}
                  <strong>Location and Contacts</strong> of representative please for faster checkout experience.
                </div>

                <h3 className="mb-4">Property Address</h3>

                <form className="needs-validation">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <Input type="text" id="firstName" placeholder="First name" label="First name" />
                    </div>

                    <div className="col-sm-6">
                      <Input type="text" id="lastName" placeholder="Last name" label="Last name" />
                    </div>

                    <div className="col-12">
                      <Input type="email" id="email" placeholder="you@example.com" label="Email" />
                    </div>
                    <div className="col-12">
                      <Input type="phone" id="phone" placeholder="(951) 000-00-00" label="Phone" />
                    </div>

                    <div className="col-12">
                      <Input type="text" id="address" placeholder="1234 Main St" label="Address" />
                    </div>

                    <div className="col-12">
                      <Input type="text" id="address2" placeholder="Apartment or suite" label="Address 2 (Optional)" />
                    </div>

                    <div className="col-md-5">
                      <Select
                        required
                        id="country"
                        label="Country"
                        options={[{ title: 'United States', value: 'usa' }]}
                      />
                    </div>

                    <div className="col-md-4">
                      <Select
                        required
                        id="state"
                        label="State"
                        options={[{ title: 'California', value: 'california' }]}
                      />
                    </div>

                    <div className="col-md-3">
                      <Input type="text" id="zip" placeholder="Zip Code" label="Zip Code" />
                    </div>
                  </div>

                  <hr className="mt-7 mb-6" />
                </form>
              </div>

              {/* ========== order summary section ========== */}
              <div className="col-lg-4">
                <h3 className="mb-4">Order Summary</h3>

                <div className="shopping-cart mb-7">
                  {orderProducts.map((item) => (
                    <ProductCard2 {...item} key={item.id} />
                  ))}
                </div>

                <hr className="my-4" />
                <h3 className="mb-2">Order</h3>

                <div className="table-responsive">
                  <table className="table table-order">
                    <tbody>
                      <tr>
                        <td className="ps-0">
                          <strong className="text-dark">Grand Total</strong>
                        </td>

                        <td>
                          <p>${total}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button type="submit" className="btn btn-primary rounded w-100 mt-4">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== service section ========== */}
        <ShopService />
      </main>

      {/* ========== footer section ========== */}
      <Footer8 />
    </Fragment>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('HERE IS PARAMS', context.query);
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const queryBuilder = (arr: string[], model: string) => {
    let url = BACKEND_API_URL + `${model}?`;
    arr.forEach((item, i) => {
      url += `populate=image&filters[id][$in][${i}]=${item}&`;
    });
    return url.slice(0, -1);
  };

  let arr: string[] = [];
  if (Array.isArray(context.query.price_id)) {
    arr = context.query.price_id;
  } else if (context.query.price_id) {
    arr.push(context.query.price_id);
  }

  const urlPrices = queryBuilder(arr, 'prices');

  let arrPack: string[] = [];
  if (Array.isArray(context.query.pack_id)) {
    arrPack = context.query.pack_id;
  } else if (context.query.pack_id) {
    arrPack.push(context.query.pack_id);
  }
  const urlPacks = queryBuilder(arrPack, 'package-sets');
  console.log(urlPacks);

  //Prices fetching starts here
  const price_res = await fetch(urlPrices);
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  // Getting panorama data

  // Packages
  const package_res = await fetch(`http://localhost:1337/api/package-sets?populate=*`);
  const pack: IPackageSet = await package_res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      price,
      company,
      social,
      pack
    }
  };
}

export default Checkout;
