import React from 'react';
import ButtonComponent from 'Components/Button/Button';
import Icons from 'Utils/Icons';

import { useSelector } from 'react-redux';
import { useCustomNavigate } from '../CustomHooks';
import HeaderCard from 'Components/Card/HeaderCard';

const Header = ({
  offcanvasOn,
  offcanvasOnButton
}) => {
  const { currentMenuName } = useSelector((state) => state.commonState);
  const navigate = useCustomNavigate();


  const headerContentFunc = () => {
    return <>
      <div className="col-12 d-flex flex-wrap align-items-center justify-content-between ">
        <div className="col">
          {currentMenuName}
        </div>

        <div className="col d-inline-flex flex-wrap justify-content-end">

          <div className='d-inline-block'>
            <ButtonComponent
              type="button"
              className="px-3 me-xl-2"
              clickFunction={() => navigate("/home")}
              buttonName={
                <span>
                  {Icons.homeIcon}
                  <span className='ms-2'>Home</span>
                </span>
              }
            />
          </div>

          {
            offcanvasOn ?
              <div className={`d-inline-block header-icon-tag-width ${offcanvasOn !== '' ? `d-${offcanvasOn}-none` : 'd-none'}`}>
                <ButtonComponent
                  type="button"
                  className="btn-transparent"
                  clickFunction={offcanvasOnButton}
                  buttonName={Icons.menuIcon}
                />
              </div>
              :
              null
          }
        </div>
      </div>
    </>
  }

  return (

    <HeaderCard
      cardClassName='w-100 border-0 header-card '
      cardTitleClassName="row justify-content-end mb-0"
      cardBodyClassName='py-3 header-body'
      cardContent={headerContentFunc()}
    />

  )
}

export default Header