import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useCustomNavigate, useDispatch } from 'Components/CustomHooks';
import { handleCurrentMenuInd, handleLogout, handleUpdateCanvasShow } from 'Actions/Common_actions/Common_action';
import Header from 'Components/Panel_compnent/Header';
import Sidebar from 'Components/Panel_compnent/Sidebar';
import store from 'StoreIndex';
import JsonData from 'Utils/JsonData';
import Images from 'Utils/Image';
import { OverallModel } from 'Views/Common/OverallModal';
import { updateMenuOptions, updateToast } from 'Slices/Common_Slice/Common_slice';
import { useSelector } from 'react-redux';

const Layout = () => {
    const state = store.getState()
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const handleCanvasOpenOrClose = () => dispatch(handleUpdateCanvasShow)
    const { sidebarMenusAdmin, sidebarMenusEmployee, sidebarMenusSeoSpecialist } = JsonData()?.jsonOnly;
    const { commonState } = useSelector((state) => state);

    useEffect(() => {
        if (!state?.commonState?.user_id) {
            navigate("/")
            dispatch(handleLogout)
        }
    }, [state?.commonState?.user_id])

    useEffect(() => {
        const a = window.location.pathname.split('/')
        const b = a[a.length - 1]
        let menus
        switch (state?.commonState?.user_role) {
            case "Super Admin":
                menus = sidebarMenusAdmin
                dispatch(updateMenuOptions(sidebarMenusAdmin))
                break;

            case "admin":
            case "Admin":
                menus = sidebarMenusAdmin
                dispatch(updateMenuOptions(sidebarMenusAdmin))
                break;

            case "Employee":
                menus = sidebarMenusEmployee
                dispatch(updateMenuOptions(sidebarMenusEmployee))
                break;

            case "SEO Specialist":
                menus = sidebarMenusSeoSpecialist
                dispatch(updateMenuOptions(sidebarMenusSeoSpecialist))
                break;

            default:
                break;
        }
        dispatch(handleCurrentMenuInd(menus, b))

        // Restrict roles 
        let currentMenuName = commonState?.currentMenuName
        if (currentMenuName) {
            if (commonState?.user_role === "SEO Specialist" && !["Blog"]?.includes(currentMenuName)) {
                // dispatch(updateToast({ type: "error", message: "Access denied" }))
                navigate("/dashboard/blog")
            }

            if (commonState?.user_role === "Employee" && !["Insurance", "insurance", "Fast Tag"]?.includes(currentMenuName)) {
                // dispatch(updateToast({ type: "error", message: "Access denied" }))
                navigate("/dashboard/services/insurance")
            }
        }
    }, [window.location.pathname, commonState?.currentMenuName])

    useEffect(() => {
        if (state?.commonState?.innerWidth >= 1200 && state?.commonState?.canvasShow) {
            dispatch(handleUpdateCanvasShow)
        }
    }, [state?.commonState?.innerWidth])

    return (
        <Fragment>
            <div className="d-flex flex-wrap">
                <Sidebar
                    responsiveOn={"xl"}
                    offCanvasShow={state?.commonState?.canvasShow}
                    handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                    menuOptions={state?.commonState?.menuOptions}
                    header={true}
                    companyLogo={Images.CompanyLogo}
                    user_role={state?.commonState?.user_role}
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

            <OverallModel />
        </Fragment>
    )
}

export default Layout