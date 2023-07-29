import { NextPage } from 'next';
import { Fragment, useState } from 'react';
// -------- custom component -------- //
import Filter from 'components/common/Filter';
import Select from 'components/reuseable/Select';
import ShopService from 'components/common/ShopService';
import Breadcrumb from 'components/reuseable/Breadcrumb';
import PageProgress from 'components/common/PageProgress';
import Navbar4Custom from 'components/blocks/navbar/Navbar4Custom';
import { ProductCardCustom } from 'components/reuseable/product-cards';
import { IPrice, IPriceDatum } from 'interfaces/IPrice';
import { ICompany, PurpleAttributes } from 'interfaces/ICompany';
import { ISocial, ISocialDatum } from 'interfaces/ISocial';
import currency from 'utils/currency';
// -------- data -------- //
import products from 'data/product-list';
import Footer5Custom from 'components/blocks/footer/Footer5Custom';
import { breadcrumb, cartList, orderSummeryRow, tableHeading } from 'data/cart-page';
import CartListItemCustom from 'components/reuseable/CartListItemCustom';

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
};

export type IGrandTotal = {
  id: number;
  price: number;
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

  const grandTotalInit: IGrandTotal[] = [];
  const [grandTotal, setGrandTotal] = useState<IGrandTotal[]>(grandTotalInit);
  const totArr = grandTotal.map((item: IGrandTotal) => item.price);
  let totSum = 0;
  if (totArr.length) {
    totSum = totArr.reduce((acc: number, cur: number) => acc + cur);
  }

  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  const prices: IPriceDatum[] = props.price!.data;
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
            <Breadcrumb data={breadcrumb} className="mb-0" />
          </div>
        </section>

        <div className="wrapper bg-light">
          <div className="container pt-12 pt-md-14 pb-14 pb-md-16">
            <div className="row gx-md-8 gx-xl-12 gy-12">
              <div className="col-lg-8">
                {/* ========== product list section ========== */}
                <div className="table-responsive">
                  <table className="table text-center shopping-cart">
                    <thead>
                      <tr>
                        {tableHeading.map(({ id, title }) => {
                          const firstChild = id === 1;

                          return (
                            <th className={firstChild ? 'ps-0 w-25' : ''} key={id}>
                              <div className={`h4 mb-0 ${firstChild ? 'text-start' : ''}`}>{title}</div>
                            </th>
                          );
                        })}

                        <th />
                      </tr>
                    </thead>

                    <tbody>
                      {prices.map((item) => (
                        <CartListItemCustom
                          key={item.id}
                          price={item}
                          setGrandTotal={setGrandTotal}
                          grandTotal={grandTotal}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ========== order summary section ========== */}
              <div className="col-lg-4">
                <h3 className="mb-4">Order Summary</h3>
                <div className="table-responsive">
                  <table className="table table-order">
                    <tbody>
                      <tr>
                        <td className="ps-0">
                          <strong className="text-dark">Total Order</strong>
                        </td>
                        <td className="pe-0 text-end">${totSum}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button className="btn btn-primary rounded w-100 mt-4">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>

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
  const price_res = await fetch('http://localhost:1337/api/prices?populate=*');
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();

  return {
    props: {
      price,
      company,
      social
    }
  };
}

export default ShopTwo;
