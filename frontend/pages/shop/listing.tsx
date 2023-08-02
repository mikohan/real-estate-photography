import { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next';
import { Fragment, useState } from 'react';

// -------- custom component -------- //
import NextLink from 'components/reuseable/links/NextLink';
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
import { tableHeading } from 'data/cart-page';
import CartListItemCustom from 'components/reuseable/CartListItemCustom';
import { urls } from 'utils/urls';
import { IPackageSet, IPackageSetDatum } from 'interfaces/IPackageSet';
import Link from 'next/link';
import { IGrandTotal } from 'interfaces/IListing';

const breadcrumb = [
  { id: 1, title: 'Home', url: urls.home() },
  { id: 2, title: 'Shop', url: urls.shop() }
];

type Props = {
  price?: IPrice;
  company: ICompany;
  social: ISocial;
  packages: IPackageSet;
};

const ShopTwo: NextPage<Props> = (props) => {
  // filter options

  const grandTotalInit: IGrandTotal[] = [];
  const [grandTotal, setGrandTotal] = useState<IGrandTotal[]>(grandTotalInit);
  const totArr = grandTotal.map((item: IGrandTotal) => item.price);
  const idArr = grandTotal.map((item: IGrandTotal) => item.id);
  let totSum = 0;
  if (totArr.length) {
    totSum = totArr.reduce((acc: number, cur: number) => acc + cur);
  }

  const company: PurpleAttributes = props.company.data.attributes;
  const social: ISocialDatum[] = props.social.data;
  const prices: IPriceDatum[] = props.price!.data;
  const packages: IPackageSetDatum[] = props.packages.data;
  // button color
  //   let btnColor = 'btn-primary';
  let btnColor = 'btn-soft-leaf';
  let btnText = 'Proceed to Checkout';
  let displayButton = 'd-inline';
  if (totSum === 0) {
    btnColor = 'btn-outline-secondary';
    btnText = 'Add services';
    displayButton = 'd-none';
  }

  return (
    <Fragment>
      <PageProgress />

      {/* ========== header section ========== */}
      <header className="wrapper bg-light">
        {/* <Navbar4Custom cart navClassName="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light" /> */}
        <Navbar4Custom showLogo={false} social={social} company={company} />
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
              <div className="col-lg-8 order-xs-2 order-sm-1">
                <div>
                  <span>
                    Your order <mark>${totSum}</mark>
                  </span>
                  <span className={displayButton}>
                    <Link
                      href={{
                        pathname: urls.checkout(),
                        query: {
                          price_id: idArr
                        }
                      }}
                      className={`more hover link-green`}
                      style={{ float: 'right' }}
                    >
                      {btnText}
                    </Link>
                  </span>
                </div>
                {/* ========== product list section ========== */}
                <div className="table-responsive">
                  <table className="table text-center shopping-cart">
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
              <div className="col-lg-4 order-xs-1 order-sm-2">
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

                <Link
                  className={displayButton}
                  href={{
                    pathname: urls.checkout(),
                    query: {
                      price_id: idArr
                    }
                  }}
                >
                  <button className={`btn ${btnColor}  rounded w-100 mt-4`}>{btnText}</button>
                </Link>
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

export async function getStaticProps<GetStaticProps>(context: GetStaticPropsContext) {
  const id = context.params && context.params.id;
  //Prices fetching starts here
  const price_res = await fetch('http://localhost:1337/api/prices?populate=*');
  const price: IPrice = await price_res.json();

  //Company fetching starts here
  const comp_res = await fetch('http://localhost:1337/api/company?populate=companyMainPhoto');
  const company: ICompany = await comp_res.json();

  const social_res = await fetch('http://localhost:1337/api/social-medias');
  const social: ISocial = await social_res.json();
  //http://localhost:1337/api/package-sets?populate=*
  const package_res = await fetch('http://localhost:1337/api/package-sets?populate=*');
  const packages: IPackageSet = await package_res.json();

  return {
    props: {
      price,
      company,
      social,
      packages
    }
  };
}

export default ShopTwo;
