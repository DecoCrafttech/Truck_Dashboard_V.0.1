import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { handleUpdateCanvasShow } from 'Actions/Common_actions/Common_action';
import Header from 'Components/Panel_compnent/Header';
import Sidebar from 'Components/Panel_compnent/Sidebar';
import store from 'StoreIndex';
import JsonData from 'Utils/JsonData';
import Images from 'Utils/Image';

const Layout = () => {
    const state = store.getState()
    const { configurationFlowState } = useSelector((state) => state)
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const handleCanvasOpenOrClose = () => dispatch(handleUpdateCanvasShow)
    const menuOptions = JsonData()?.jsonOnly?.sidebarMenus; 
    console.log(menuOptions)

    useEffect(() => {
        if (state?.commonState?.innerWidth >= 1200 && state?.commonState?.canvasShow) {
            dispatch(handleUpdateCanvasShow)
        }
    }, [state?.commonState?.innerWidth])
    console.log(menuOptions)

    return (
        <div className="d-flex flex-wrap">
            <Sidebar
                responsiveOn={"xl"}
                offCanvasShow={state?.commonState?.canvasShow}
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                menuOptions={menuOptions}
                header={true}
                companyLogo={Images.CompanyLogo}
            />

            <div className="col ">
                <main className="main w-100 px-md-2 overflow-hidden">
                    <div className="container-fluid h-100">
                        {/* header  */}
                        <header className='d-flex align-items-center'>
                            <Header
                                offcanvasOn={"xl"}
                                offcanvasOnButton={handleCanvasOpenOrClose}
                            />
                        </header>

                        {/* main content  */}
                        <div className="main_rendering_contents_height">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout