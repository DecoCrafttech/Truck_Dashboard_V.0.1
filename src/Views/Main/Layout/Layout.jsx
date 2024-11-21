import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import { CustomUseLocationHook, useDispatch } from 'Components/CustomHooks';
import { handleCurrentMenuInd, handleUpdateCanvasShow } from 'Actions/Common_actions/Common_action';
import Header from 'Components/Panel_compnent/Header';
import Sidebar from 'Components/Panel_compnent/Sidebar';
import store from 'StoreIndex';
import JsonData from 'Utils/JsonData';
import Images from 'Utils/Image';

const Layout = () => {
    const state = store.getState() 
    const dispatch = useDispatch();
    const location = CustomUseLocationHook();
    const handleCanvasOpenOrClose = () => dispatch(handleUpdateCanvasShow)
    const menuOptions = JsonData()?.jsonOnly?.sidebarMenus; 
    
    useEffect(() => {
        if (state?.commonState?.innerWidth >= 1200 && state?.commonState?.canvasShow) {
            dispatch(handleUpdateCanvasShow)
        }
        
        dispatch(handleCurrentMenuInd(menuOptions, location[location.length - 1]))
    }, [state?.commonState?.innerWidth]) 

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

            <div className="col overflow-hidden">
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