import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { handleCurrentMenuInd } from 'Actions/Common_actions/Common_action';
import Icons from 'Utils/Icons';
import Image from 'Utils/Image';
import OffCanvas from 'Components/Offcanvas/OffCanvas';
import { CustomUseLocationHook } from 'Components/CustomHooks';
import Img from 'Components/Img/Img';
import NavLinkComp from 'Components/Router_components/NavLink';
import AccordionSidebar from 'Components/Accordion/AccordionSidebar';



const Sidebar = ({
    menuOptions,
    responsiveOn,
    offCanvasShow,
    handleCanvasOpenOrClose,

    header,
    companyLogo,

    footer,
    footerClickFunction
}) => {
    const { currentNavMenuIndex } = useSelector((state) => state.commonState);
    const dispatch = useDispatch();
    const location = CustomUseLocationHook();

    useEffect(() => {
        dispatch(handleCurrentMenuInd(menuOptions, location[location.length - 1]))
    }, [])

    const handleDynamicTab = () => {
        const a = window.location.pathname.split('/')
        const b = a[a.length - 1]

        dispatch(handleCurrentMenuInd(menuOptions, b))
    }

    const hanldeButton = (v) => {
        return <>
            <div className="col-3 pb-1 text-center">
                {v.icon}
            </div>
            <div className="col text-start">
                <p className='mb-0'>{v.name}</p>
            </div>
        </>
    }

    const headerFun = (width, height, image) => {
        return <Img
            src={image}
            alt='company logo'
            width={width}
            height={height}
        />
    }

    const bodyContent = () => {
        return <nav className='navmenu w-100 pe-3'>
            <ul className='w-100 px-1 '>
                {menuOptions.map((v, i) => (
                    v.type === "link" ?
                        <li className="list-unstyled w-100" key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className='navlink-sidebar'
                                title={hanldeButton(v)}
                                to={v.route}
                                onClick={() => handleDynamicTab()}
                            />
                        </li>
                        :
                        <li className="list-unstyled w-100 " key={i}>
                            <NavLinkComp
                                componentFrom="sidebar menus"
                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none pe-none'
                                title={hanldeButton(v)}
                                to={v.route}
                                onClick={() => handleDynamicTab()}
                            />

                            <ul className='h-100 w-100 px-1 ms-4'>
                                {
                                    v?.options.map((v, i) => (
                                        <li className="list-unstyled w-100 " key={i}>
                                            <NavLinkComp
                                                componentFrom="sidebar menus"
                                                className=' w-100 d-flex flex-wrap align-items-center mb-1 navlink-sidebar rounded px-2 py-2 text-decoration-none'
                                                title={hanldeButton(v)}
                                                to={v.route}
                                                onClick={() => handleDynamicTab()}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                ))}
            </ul>
        </nav >
    }


    return (
        <>
            <div className={`sidebar d-none ${responsiveOn !== '' ? `d-${responsiveOn}-block` : 'd-block'}`}>
                <div className="container-fluid">
                    {/* header */}
                    {
                        header ?
                            <>
                                <div className="sidebar-header position-relative">
                                    <div className="row h-100 align-items-center justify-content-center sidebar-header-underline">
                                        <div className="col text-center">
                                            {headerFun('198px', '30px', companyLogo)}
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }

                    {/* body */}
                    <div className="sidebar-body">
                        {bodyContent()}
                    </div>
                </div>

                <div className="sidebarCircleOne">
                    <Img src={Image.circleImageOne} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleTwo">
                    <Img src={Image.circleImageTwo} width={"90%"} height={"90%"} />
                </div>

                <div className="sidebarCircleThree">
                    <Img src={Image.circleImageThree} width={"90%"} height={"90%"} />
                </div>
            </div>


            <OffCanvas
                offCanvasShow={offCanvasShow}
                offcanvasPlacement="start"
                offcanvasClassname="rounded border-0 sidebar offcanvas-sidebar"
                handleCanvasOpenOrClose={handleCanvasOpenOrClose}
                canvasHeader={headerFun('198px', '33px', companyLogo)}
                offcanvasHeaderClassname="sidebar-header"
                offcanvasHeaderTitleClassname="col-11 text-center"
                offcanvasBodyClassname="sidebar-body-without-footer"
                canvasBody={bodyContent()}
            />
        </>
    )
}

export default Sidebar