import { handleUpdateModalShow } from "Actions/Common_actions/Common_action";
import { handleAddBlog, handleBlogInputOnChange, handleDeleteBlogApi } from "Actions/Pages_actions/BlogAction";
import { handleCrmBeforeSaleEntry, handleCrmModalEntry } from "Actions/Pages_actions/CrmActions";
import { handleUpdateFeedbackComplaints } from "Actions/Pages_actions/FeedbackAction";
import { handleBuyAndSellInputOnChange, handleDeleteBuyAndSell, handleDeleteDriver, handleDeleteImage, handleDeleteLoad, handleDeleteTruck, handlePostOrEditBuyAndSell, handlePostOrEditDriver, handlePostOrEditLoad, handlePostOrEditTruck, handlePostVerification } from "Actions/Pages_actions/ServicesActions";
import ButtonComponent from "Components/Button/Button";
import BlogCard from "Components/Card/BlogCard";
import BuyandSellCard from "Components/Card/BuyandSellCard";
import CrmCard from "Components/Card/CrmCard";
import DriverCard from "Components/Card/DriverCard";
import LoadCard from "Components/Card/LoadCard";
import TruckCard from "Components/Card/TruckCard";
import { useCommonState, useDispatch } from "Components/CustomHooks";
import GoogleLocationInput from "Components/Input/GoogleLocationInput";
import Input from "Components/Input/Input";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import SelectBox from "Components/Input/SelectBox";
import Textbox from "Components/Input/textbox";
import ModalComponent from "Components/Modal/Modal";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Fragment } from "react";
import ReactQuill from "react-quill";
import { updateApplyFilterClickedTrue, updateModalShow } from "Slices/Common_Slice/Common_slice";
import { resetOverallChartFilter } from "Slices/Pages_slice/Analytice_slice";
import { ResetbuyAndsellFilterData, ResetLoadFilterData, ResetTruckFilterData } from "Slices/Pages_slice/Services_slice";
import Icons from "Utils/Icons";
import JsonData from "Utils/JsonData";

export function OverallModel() {
    const { commonState, servicesState, blogState, feedbackState, crmState } = useCommonState();
    const dispatch = useDispatch();
    const { jsxJson, jsonOnly } = JsonData();

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'list',
    ];

    function DeleteSelectFile(id) {
        if (servicesState?.modal_from === "BuyAndSell") {
            const result = servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui.filter((data) => data.id !== id);

            const overallFile = result.map((data) => data.filename);
            var newImages = [];
            for (let i = 0; i < servicesState?.new_edit_buyAndsell_card?.blog_image_send_api.length; i++) {
                if (overallFile.includes(servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i].name)) {
                    newImages[newImages.length] = servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i];
                }
            }

            dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: result, blog_image_send_api: newImages }));
        } else {
            const result = blogState?.blog_edit_data?.blog_image_show_ui.filter((data) => data.id !== id);

            const overallFile = result.map((data) => data.filename);
            var newImages = [];
            for (let i = 0; i < blogState?.blog_edit_data?.blog_image_send_api.length; i++) {
                if (overallFile.includes(blogState?.blog_edit_data?.blog_image_send_api[i].name)) {
                    newImages[newImages.length] = blogState?.blog_edit_data?.blog_image_send_api[i];
                }
            }

            dispatch(handleBlogInputOnChange({ blog_image_show_ui: result, blog_image_send_api: newImages }));
        }
    }

    function modalHeaderFun() {
        switch (servicesState?.modal_from) {
            case "Load":
            case "Truck":
            case "Driver":
            case "BuyAndSell":
            case "Blog":
                switch (servicesState?.modal_type) {
                    case "Edit":
                        return <h6 className='mb-0'>Edit {servicesState?.modal_from === "BuyAndSell" ? "Buy and sell" : servicesState?.modal_from}</h6>;

                    case "Delete":
                        return <h6 className='mb-0'>Delete {servicesState?.modal_from === "BuyAndSell" ? "Buy and sell" : servicesState?.modal_from}</h6>;

                    case "Create":
                        return <h6 className='mb-0'>Create {servicesState?.modal_from === "BuyAndSell" ? "Buy and sell" : servicesState?.modal_from}</h6>;

                    case "Filter":
                        return <h6 className='mb-0'>Filter {servicesState?.modal_from === "BuyAndSell" ? "Buy and sell" : servicesState?.modal_from}</h6>;

                    default:
                        break;
                }
                break;

            case "Feedback":
                return <h6 className='mb-0'>Feedback</h6>;

            case "Overall":
                return <h6 className='mb-0'>Analytics Overall Fliter</h6>;

            case "CRM":
                switch (servicesState?.modal_type) {
                    case "Create":
                        return <h6 className='mb-0'>CRM</h6>;

                    case "Edit":
                        return <h6 className='mb-0'>CRM Status Entry</h6>;

                    case "Before_Sale_Entry":
                        return <h6 className='mb-0'>CRM Before Sale</h6>;

                    default:
                        break;
                }

            default:
                break;
        }
    }

    function dynamicInput() {
        let funBy = null

        if (servicesState?.modal_from === "Load") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = jsxJson?.loadAddEditInputs
            } else {
                let restrictDate = jsxJson?.loadFilterInputs?.filter((v) => v?.name !== "From Date" && v?.name !== "To Date")

                if (window.location.pathname === "/dashboard/analytics" || window.location.pathname === "/dashboard/analytics/") {
                    funBy = jsxJson?.loadFilterInputs
                } else {
                    funBy = restrictDate
                }
            }
        }

        if (servicesState?.modal_from === "Truck") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = jsxJson?.truckAddEditInputs
            } else {
                let restrictDate = jsxJson?.truckFilterInputs?.filter((v) => v.name !== "From Date" && v.name !== "To Date")
                if (window.location.pathname === "/dashboard/analytics" || window.location.pathname === "/dashboard/analytics/") {
                    funBy = jsxJson?.truckFilterInputs
                } else {
                    funBy = restrictDate
                }
            }
        }

        if (servicesState?.modal_from === "Driver") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = jsxJson?.driverAddEditInputs
            } else {
                let restrictDate = jsxJson?.driverFilterInputs?.filter((v) => v.name !== "From Date" && v.name !== "To Date")
                if (window.location.pathname === "/dashboard/analytics" || window.location.pathname === "/dashboard/analytics/") {
                    funBy = jsxJson?.driverFilterInputs
                } else {
                    funBy = restrictDate
                }
            }
        }

        if (servicesState?.modal_from === "BuyAndSell") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = jsxJson?.buyAndSellAddEdit
            } else {
                let restrictDate = jsxJson?.buyAndSellFilterInputs?.filter((v) => v.name !== "From Date" && v.name !== "To Date" && v.name !== "State list")
                if (window.location.pathname === "/dashboard/analytics" || window.location.pathname === "/dashboard/analytics/") {
                    funBy = jsxJson?.buyAndSellFilterInputs
                } else {
                    funBy = restrictDate
                }
            }
        }

        if (servicesState?.modal_from === "Blog") {
            funBy = jsxJson?.blogInputs
        }

        if (servicesState?.modal_from === "Feedback") {
            if (["", "not solved"].includes(servicesState?.modal_type)) {
                const removeSolvedDate = jsxJson?.feebbackUpdateOrWatchStatus?.filter((v) => v?.name !== "solved_date")
                funBy = removeSolvedDate
            } else {
                funBy = jsxJson?.feebbackUpdateOrWatchStatus
            }
        }

        if (servicesState?.modal_from === "Overall") {
            funBy = jsxJson?.analyticsOverallLineChartFilter
        }

        if (servicesState?.modal_from === "CRM") {
            if (servicesState?.modal_type === "Edit") {
                funBy = jsxJson?.crmStatusModal
            } else {
                funBy = jsxJson?.crmStatusBeforeSaleEntryModal
            }
        }

        return funBy?.map((ipVal, iPInd) => {
            switch (ipVal?.category) {
                case "select":
                    return <div className='col-6 p-1 mt-2'>
                        {
                            servicesState?.modal_type === "Filter" && ipVal?.name === "To" ||
                                ((servicesState?.modal_type === "Create" || servicesState?.modal_type === "Edit") &&
                                    (servicesState?.modal_from === "Truck" || servicesState?.modal_from === "Driver" || servicesState?.modal_from === "BuyAndSell") &&
                                    ipVal?.name === "Vehicle Number") || ipVal?.name === "State list" ||
                                ipVal?.name === "To" && servicesState?.modal_from === "Truck" ?
                                <Fragment>
                                    <ReactDropdownSelect
                                        multi={!((servicesState?.modal_type === "Create" || servicesState?.modal_type === "Edit") && (servicesState?.modal_from === "Truck" || servicesState?.modal_from === "Driver" || servicesState?.modal_from === "BuyAndSell") && ipVal?.name === "Vehicle Number") ? true : false}
                                        name={ipVal?.name}
                                        isMandatory={ipVal?.isMandatory}
                                        options={ipVal?.options}
                                        labelField="label"
                                        valueField="label"
                                        create={((servicesState?.modal_type === "Create" || servicesState?.modal_type === "Edit") && (servicesState?.modal_from === "Truck" || servicesState?.modal_from === "Driver" || servicesState?.modal_from === "BuyAndSell") && ipVal?.name === "Vehicle Number") ? true : false}
                                        value={ipVal?.value}
                                        change={ipVal?.change}
                                        className='rounded filter-select-dropdown'
                                        disabled={ipVal?.disabled}
                                    />
                                    <div className='text-danger pt-2 ps-1 fs-15'>
                                        {ipVal?.Err}
                                    </div>
                                </Fragment>
                                :
                                <Fragment>
                                    <SelectBox
                                        selectOptions={ipVal?.options}
                                        value={ipVal?.value}
                                        change={ipVal?.change}
                                        label={ipVal?.name}
                                        labelClassName="text-secondary mb-0 fs-14"
                                        mandatory={ipVal?.isMandatory}
                                        disableSelectBox={ipVal?.disabled}
                                    />
                                    <div className='text-danger pt-2 ps-1 fs-15'>
                                        {ipVal?.Err}
                                    </div>
                                </Fragment>
                        }
                    </div>

                case "googleLocation":
                    return <div className='col-6 p-1 mt-2'>
                        <GoogleLocationInput
                            name={ipVal?.name}
                            value={ipVal?.value}
                            change={ipVal?.change}
                            selcted={ipVal?.placedSelectedClick}
                            label={ipVal?.name}
                            labelClassName="text-secondary mb-0 fs-14"
                            mandatory={ipVal?.isMandatory}
                            disabled={ipVal?.disabled}
                        />
                        <div className='text-danger pt-2 ps-1 fs-15'>
                            {ipVal?.Err}
                        </div>
                    </div>

                case "input":
                    return ipVal?.type === "file" ?
                        <Fragment>
                            <div className={`cursor-pointer col-12 ${ipVal?.value?.length >= 3 ? 'pe-none' : ''}`} onClick={() => document.getElementById('file_upload').click()} key={iPInd}>
                                <Input
                                    type={ipVal?.type}
                                    change={ipVal?.change}
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                    className="d-none"
                                    htmlFor="file_upload"
                                    multiple={true}
                                    inputError={ipVal?.Err}
                                    disabled={ipVal?.disabled}
                                />

                                <div className='border py-2 rounded-2 col-12 text-center'>
                                    <span className='me-2'>{Icons.fileUploadIcon}</span>
                                    <span className='text-secondary fs-15'>{ipVal?.value?.length >= 3 ? "Only 3 images can be selectable" : "Click here to choose image"}</span>
                                </div>
                            </div>

                            <div className="mt-4 w-100">
                                {ipVal?.value?.map((data, index) => {
                                    const {
                                        id,
                                        filename,
                                        fileimage,
                                        datetime,
                                        filesize,
                                    } = data;
                                    return (
                                        typeof data === "string" ?
                                            <div className="file-atc-box w-100" key={id}>
                                                <div className="file-image">
                                                    <img src={data} alt="" />
                                                </div>
                                                <div className="file-detail row">
                                                    <div className="col-9">
                                                        <h6>{data?.split("/")[data?.split("/")?.length - 1]}</h6>
                                                    </div>
                                                    <div className="file-actions col-3">
                                                        <ButtonComponent
                                                            type="button"
                                                            className="file-action-btn w-100 text-end"
                                                            clickFunction={() => dispatch(handleDeleteImage({ user_id: servicesState?.new_edit_buyAndsell_card?.user_id, buy_sell_id: servicesState?.new_edit_buyAndsell_card?.buy_sell_id, image: data }))}
                                                            buttonName={
                                                                servicesState?.deletion_image_cdn_path === data ?
                                                                    <SpinnerComponent />
                                                                    :
                                                                    "Delete"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="file-atc-box w-100" key={id}>
                                                {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                                                    <div className="file-image">
                                                        {" "}
                                                        <img src={fileimage} alt="" />
                                                    </div>
                                                ) : (
                                                    <div className="file-image">
                                                        <i className="far fa-file-alt"></i>
                                                    </div>
                                                )}
                                                <div className="file-detail row">
                                                    <h6>{filename}</h6>
                                                    <div className="col-9">
                                                        <p>
                                                            <span>Size : {filesize}</span>,
                                                            <span className="ps-1 ml-2">
                                                                Modified Time : {datetime}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="file-actions col-3">
                                                        <ButtonComponent
                                                            type="button"
                                                            className="file-action-btn w-100 text-end"
                                                            clickFunction={() => DeleteSelectFile(id)}
                                                            buttonName="Delete"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                    );
                                })}
                            </div>
                        </Fragment>
                        :
                        <div className={servicesState?.modal_from === "Overall" ? "col-12 p-1 mt-2" : "col-6 p-1 mt-2"} key={iPInd}>
                            <Input
                                type={ipVal?.type}
                                value={ipVal?.value}
                                change={ipVal?.change}
                                keyDown={ipVal?.keyDown}
                                label={ipVal?.name}
                                labelClassName="text-secondary mb-0 fs-14"
                                mandatory={ipVal?.isMandatory}
                                inputError={ipVal?.Err}
                                disabled={ipVal?.disabled}
                                max={ipVal?.name === "To Date" || ipVal?.name === "From Date" ? new Date().toISOString().split('T')[0] : null}
                                min={ipVal?.name === "Next call date" ? new Date().toISOString().split('T')[0] : null}
                            />
                        </div>

                case "textbox":
                    return <div className='col-12 p-1 mt-2'>
                        {
                            servicesState?.modal_from === "Blog" ?
                                ipVal && (
                                    <ReactQuill
                                        value={ipVal.value}
                                        onChange={ipVal.change}
                                        modules={modules}
                                        formats={formats}
                                    />
                                )
                                :
                                <Textbox
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    cols={10}
                                    rows={5}
                                    className=""
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                    inputError={ipVal?.Err}
                                    disabled={ipVal?.disabled}
                                />
                        }
                        <div className='text-danger pt-2 ps-1 fs-15'>
                            {ipVal?.Err}
                        </div>
                    </div >

                default:
                    break;
            }
        })
    }

    function modalBodyFun() {
        switch (servicesState?.modal_from) {
            case "Load":
            case "Truck":
            case "Driver":
            case "BuyAndSell":
            case "Blog":
            case "Overall":
                switch (servicesState?.modal_type) {
                    case "Create":
                    case "Filter":
                    case "Edit":
                        return servicesState?.modal_type === "Create" && servicesState?.modal_from !== "Blog" ?
                            servicesState?.is_mobile_num_verified ?
                                dynamicInput()
                                :
                                jsxJson?.verifyMobileNumber?.map((ipVal, iPInd) => {
                                    return <div className="col-12 p-1 mt-2 p-4">
                                        <Input
                                            type={ipVal?.type}
                                            value={ipVal?.value}
                                            change={ipVal?.change}
                                            keyDown={ipVal?.keyDown}
                                            label={ipVal?.name}
                                            labelClassName="text-secondary mb-0 fs-14"
                                            mandatory={ipVal?.isMandatory}
                                            inputError={ipVal?.Err}
                                        />
                                    </div>
                                })
                            :
                            dynamicInput()

                    case "Delete":
                        switch (servicesState?.modal_from) {
                            case "Load":
                                return <div className='mb-0 py-1 w-100'>
                                    <p className="text-center text-danger w-100 mt-3">
                                        Are you sure do you want to delete the load
                                    </p>
                                    <LoadCard load={servicesState?.new_edit_load_card} is_delete_card={true} />
                                </div>

                            case "Truck":
                                return <div className='mb-0 py-1 w-100'>
                                    <p className="text-center text-danger w-100 mt-3">
                                        Are you sure do you want to delete the truck
                                    </p>
                                    <TruckCard truck_data={servicesState?.new_edit_truck_card} is_delete_card={true} />
                                </div>

                            case "Driver":
                                return <div className='mb-0 py-1 w-100'>
                                    <p className="text-center text-danger w-100 mt-3">
                                        Are you sure do you want to delete the driver
                                    </p>
                                    <DriverCard driver_data={servicesState?.new_edit_driver_card} is_delete_card={true} />
                                </div>

                            case "BuyAndSell":
                                return <div className='mb-0 py-1 w-100'>
                                    <p className="text-center text-danger w-100 mt-3">
                                        Are you sure do you want to delete the buy and sell
                                    </p>
                                    <BuyandSellCard buy_sell_data={servicesState?.new_edit_buyAndsell_card} is_delete_card={true} />
                                </div>

                            case "Blog":
                                return <div className='mb-0 py-1 w-100 h-100'>
                                    <p className="text-center text-danger w-100 mt-3">
                                        Are you sure do you want to delete the blog
                                    </p>
                                    <BlogCard blogData={blogState?.blog_edit_data} is_delete_card={true} />
                                </div>

                            default:
                                break;
                        }

                    default:
                        break;
                }
            case "Feedback":
                return dynamicInput()


            case "CRM":
                switch (servicesState?.modal_type) {
                    case "Create":
                        return <div className="w-100 h-100 d-flex flex-wrap placeholder-glow h-100 overflow-hidden">
                            <CrmCard placeholder={crmState?.crm_modal_glow} crmData={crmState?.crm_view_data} />
                        </div>

                    case "Edit":
                        return dynamicInput()

                    case "Before_Sale_Entry":
                        return dynamicInput()

                    default:
                        break;
                }

            default:
                break;
        }
    }

    function dynamicFilterFun() {
        switch (servicesState?.modal_from) {
            case "Load":
                dispatch(ResetLoadFilterData())
                break;

            case "Truck":
                dispatch(ResetTruckFilterData())
                break;

            case "Driver":
                dispatch(ResetTruckFilterData())
                break;

            case "BuyAndSell":
                dispatch(ResetbuyAndsellFilterData())
                break;

            case "Overall":
                dispatch(resetOverallChartFilter())
                break;

            default:
                break;
        }
    }

    function dynamicPostFun() {
        switch (servicesState?.modal_from) {
            case "Load":
                dispatch(handlePostOrEditLoad({ commonState, servicesState, jsonOnly }))
                break;

            case "Truck":
                dispatch(handlePostOrEditTruck({ commonState, servicesState, jsonOnly }))
                break;

            case "Driver":
                dispatch(handlePostOrEditDriver({ commonState, servicesState, jsonOnly }))
                break;

            case "BuyAndSell":
                dispatch(handlePostOrEditBuyAndSell({ commonState, servicesState, jsonOnly }))
                break;

            default:
                break;
        }
    }

    function dynamicEditFun() {
        switch (servicesState?.modal_from) {
            case "Load":
                dispatch(handlePostOrEditLoad({ commonState, servicesState, jsonOnly }))
                break;

            case "Truck":
                dispatch(handlePostOrEditTruck({ commonState, servicesState, jsonOnly }))
                break;

            case "Driver":
                dispatch(handlePostOrEditDriver({ commonState, servicesState, jsonOnly }))
                break;

            case "BuyAndSell":
                dispatch(handlePostOrEditBuyAndSell({ commonState, servicesState, jsonOnly }))
                break;

            default:
                break;
        }
    }

    function dynamicDeleteFun() {
        switch (servicesState?.modal_from) {
            case "Load":
                dispatch(handleDeleteLoad(servicesState))
                break;

            case "Truck":
                dispatch(handleDeleteTruck(servicesState))
                break;

            case "Driver":
                dispatch(handleDeleteDriver(servicesState))
                break;

            case "BuyAndSell":
                dispatch(handleDeleteBuyAndSell(servicesState))
                break;

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (servicesState?.modal_from) {
            case "Load":
            case "Truck":
            case "Driver":
            case "BuyAndSell":
            case "Overall":
                switch (servicesState?.modal_type) {
                    case "Edit":
                        return <div className='col-12 p-2 px-3'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName={
                                    servicesState?.spinner_glow ?
                                        <SpinnerComponent />
                                        :
                                        `Edit ${servicesState?.modal_from} Details`
                                }
                                clickFunction={dynamicEditFun}
                                btnDisable={servicesState?.spinner_glow}
                            />
                        </div>

                    case "Delete":
                        return <div className='col-12 d-flex flex-wrap px-2'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="No"
                                    clickFunction={() => dispatch(updateModalShow())}
                                    btnDisable={servicesState?.spinner_glow}
                                />
                            </div>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName={
                                        servicesState?.spinner_glow ?
                                            <SpinnerComponent />
                                            :
                                            "Yes"
                                    }
                                    clickFunction={dynamicDeleteFun}
                                    btnDisable={servicesState?.spinner_glow}
                                />
                            </div>
                        </div>

                    case "Create":
                        return servicesState?.is_mobile_num_verified ?
                            <div className='col-12 p-2 px-3'>
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName={
                                        servicesState?.spinner_glow ?
                                            <SpinnerComponent />
                                            :
                                            `Post ${servicesState?.modal_from}`
                                    }
                                    clickFunction={dynamicPostFun}
                                    btnDisable={servicesState?.spinner_glow}
                                />
                            </div>
                            :
                            <div className='col-12 p-2 px-3'>
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName={
                                        servicesState?.spinner_glow ?
                                            <SpinnerComponent />
                                            :
                                            "Verify Mobile Number"
                                    }
                                    clickFunction={() => dispatch(handlePostVerification(servicesState))}
                                    btnDisable={servicesState?.spinner_glow}
                                />
                            </div>

                    case "Filter":
                        return <div className='col-12 d-flex flex-wrap px-3'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="Clear Filter"
                                    clickFunction={dynamicFilterFun}
                                />
                            </div>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName="Apply Filter"
                                    clickFunction={() => dispatch(updateApplyFilterClickedTrue())}
                                />
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            case "Blog":
                switch (servicesState?.modal_type) {
                    case "Edit":
                        return <div className='col-12 p-2'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName={
                                    blogState?.blog_modal_spinner ?
                                        <SpinnerComponent />
                                        :
                                        "Edit Blog"
                                }
                                clickFunction={() => dispatch(handleAddBlog(blogState?.blog_edit_data))}
                                btnDisable={blogState?.blog_modal_spinner}
                            />
                        </div>

                    case "Delete":
                        return <div className='col-12 d-flex flex-wrap'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-outline-secondary w-100 py-2"
                                    buttonName="Close"
                                    clickFunction={() => dispatch(updateModalShow())}
                                />
                            </div>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-outline-danger w-100 py-2"
                                    buttonName={
                                        blogState?.blog_modal_spinner ?
                                            <SpinnerComponent />
                                            :
                                            "Delete Blog"
                                    }
                                    clickFunction={() => dispatch(handleDeleteBlogApi(blogState?.blog_delete_id))}
                                    btnDisable={blogState?.blog_modal_spinner}
                                />
                            </div>
                        </div>

                    case "Create":
                        return <div className='col-12 p-2'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName={
                                    blogState?.blog_modal_spinner ?
                                        <SpinnerComponent />
                                        :
                                        "Post Blog"
                                }
                                clickFunction={() => dispatch(handleAddBlog(blogState?.blog_edit_data))}
                                btnDisable={blogState?.blog_modal_spinner}
                            />
                        </div>

                    default:
                        break;
                }

            case "Feedback":
                switch (servicesState?.modal_type) {
                    case "not solved":
                    case "":
                        return <div className='col-12 p-2'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName={
                                    feedbackState?.feedback_modal_spinner ?
                                        <SpinnerComponent />
                                        :
                                        "Update Feedback"
                                }
                                clickFunction={() => dispatch(handleUpdateFeedbackComplaints(feedbackState?.feedback_modal_data))}
                                btnDisable={feedbackState?.feedback_modal_spinner}
                            />
                        </div>

                    case "solved":
                        return <div className='col-12 p-2'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName="Close"
                                clickFunction={() => dispatch(handleUpdateModalShow)}
                            />
                        </div>

                    default:
                        break;
                }

            case "CRM":
                switch (servicesState?.modal_type) {
                    case "Create":
                        return <div className='col-12 p-2'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName="Close"
                                clickFunction={() => dispatch(handleUpdateModalShow)}
                            />
                        </div>

                    case "Edit":
                        return <div className="col-12 p-1 pb-0">
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName={
                                    crmState?.crm_status_entry_spinner ?
                                        <SpinnerComponent />
                                        :
                                        "Save Status"
                                }
                                clickFunction={() => dispatch(handleCrmModalEntry({ data: crmState?.crm_status_entry, endpoint: crmState?.slected_button === "before_sale" ? "/crm_before_sale_status_entry " : "/update_crm_history" }))}
                                btnDisable={crmState?.crm_status_entry_spinner}
                            />
                        </div>

                    case "Before_Sale_Entry":
                        return <div className="col-12 d-flex flex-wrap p-1 pb-0">
                            <div className="col-6 p-1">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="Close"
                                    clickFunction={() => dispatch(handleUpdateModalShow)}
                                    btnDisable={crmState?.crm_status_entry_spinner}
                                />
                            </div>
                            <div className="col-6 p-1">
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName={
                                        crmState?.crm_status_entry_spinner ?
                                            <SpinnerComponent />
                                            :
                                            "Add"
                                    }
                                    clickFunction={() => dispatch(handleCrmBeforeSaleEntry(crmState?.crm_before_sale_entry))}
                                    btnDisable={crmState?.crm_status_entry_spinner}
                                />
                            </div>
                        </div>

                    default:
                        break;
                }

            default:
                break;
        }
    }

    return (
        <ModalComponent
            show={commonState?.modalShow}
            modalSize={
                servicesState?.modal_type === "Create" || servicesState?.modal_from === "Feedback" || servicesState?.modal_from === "Blog" || servicesState?.modal_from === "Overall" || (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Create") || (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Before_Sale_Entry") ?
                    servicesState?.is_mobile_num_verified || servicesState?.modal_from === "Feedback" || servicesState?.modal_from === "Blog" && servicesState?.modal_from !== "Overall" || (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Create") || (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Before_Sale_Entry") ? "lg" : "md"
                    :
                    ["Edit", "Filter"].includes(servicesState?.modal_type) ? "lg" : "md"
            }
            modalCentered={true}
            modalCloseButton={true}
            showModalHeader={true}
            modalHeaderClassname="border-0"
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2"
            modalBody={<div className='d-flex flex-wrap p-3 py-0'>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={
                servicesState?.modal_type === "Create" ||
                    (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Create") ||
                    (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Edit") ||
                    (servicesState?.modal_from === "Blog" && servicesState?.modal_type === "Delete") ?

                    servicesState?.is_mobile_num_verified ||
                        (servicesState?.modal_from === "CRM" && servicesState?.modal_type === "Create") ||
                        (servicesState?.modal_from === "Blog" && servicesState?.modal_type === "Delete") ?
                        "buyAndSell_model_height" : "md"
                    :
                    ["Edit", "Create"].includes(servicesState?.modal_type) ? "buyAndSell_model_height" : ''
            }
        />
    )
}