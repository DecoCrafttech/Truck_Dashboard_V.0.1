import { handleAddBlog, handleDeleteBlogApi } from "Actions/Pages_actions/BlogAction";
import { handleBuyAndSellInputOnChange, handlePostLoadsVerification } from "Actions/Pages_actions/ServicesActions";
import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "Components/CustomHooks";
import GoogleLocationInput from "Components/Input/GoogleLocationInput";
import Input from "Components/Input/Input";
import ReactDropdownSelect from "Components/Input/ReactDropdownSelect";
import SelectBox from "Components/Input/SelectBox";
import Textbox from "Components/Input/textbox";
import ModalComponent from "Components/Modal/Modal";
import SpinnerComponent from "Components/Spinner/Spinner";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { updateApplyFilterClickedTrue, updateModalShow } from "Slices/Common_Slice/Common_slice";
import Icons from "Utils/Icons";
import JsonData from "Utils/JsonData";



export function OverallModel() {
    const { commonState, servicesState, blogState } = useSelector((state) => state);
    const dispatch = useDispatch();
    const JsonJsx = JsonData()?.jsxJson;

    function DeleteSelectFile(id) {
        const result = servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui.filter((data) => data.id !== id);

        const overallFile = result.map((data) => data.filename);
        var newImages = [];
        for (let i = 0; i < servicesState?.new_edit_buyAndsell_card?.blog_image_send_api.length; i++) {
            if (overallFile.includes(servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i].name)) {
                newImages[newImages.length] = servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i];
            }
        }

        dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: result, blog_image_send_api: newImages }));
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

            default:
                break;
        }
    }

    function dynamicMobileVerification() {
        let funByNum = null

        if (servicesState?.modal_from === "Load") {
            funByNum = JsonJsx?.loadVerifyInputs
        }

        if (servicesState?.modal_from === "Truck") {
            funByNum = JsonJsx?.loadVerifyInputs
        }

        if (servicesState?.modal_from === "Driver") {
            funByNum = JsonJsx?.loadVerifyInputs
        }

        if (servicesState?.modal_from === "BuyAndSell") {
            funByNum = JsonJsx?.loadVerifyInputs
        }

        return funByNum?.map((ipVal, iPInd) => {
            return <div className="col-12 p-1 mt-2 p-4">
                <Input
                    type={ipVal?.type}
                    value={ipVal?.value}
                    change={ipVal?.change}
                    label={ipVal?.name}
                    labelClassName="text-secondary mb-0 fs-14"
                    mandatory={ipVal?.isMandatory}
                    inputError={ipVal?.Err}
                />
            </div>
        })
    }

    function dynamicInput() {
        let funBy = null

        if (servicesState?.modal_from === "Load") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = JsonJsx?.loadAddEditInputs
            } else {
                funBy = JsonJsx?.loadFilterInputs
            }
        }

        if (servicesState?.modal_from === "Truck") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = JsonJsx?.truckAddEditInputs
            } else {
                funBy = JsonJsx?.truckFilterInputs
            }
        }

        if (servicesState?.modal_from === "Driver") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = JsonJsx?.driverAddEditInputs
            } else {
                funBy = JsonJsx?.driverFilterInputs
            }
        }

        if (servicesState?.modal_from === "BuyAndSell") {
            if (["Edit", "Create"].includes(servicesState?.modal_type)) {
                funBy = JsonJsx?.buyAndSellAddEdit
            } else {
                funBy = JsonJsx?.buyAndSellFilterInputs
            }
        }

        if (servicesState?.modal_from === "Blog") {
            funBy = JsonJsx?.blogInputs
        }

        return funBy?.map((ipVal, iPInd) => {
            switch (ipVal?.category) {
                case "select":
                    return <div className='col-6 p-1 mt-2'>
                        {
                            servicesState?.modal_type === "Filter" && ipVal?.name === "To" ?
                                <ReactDropdownSelect
                                    multi={true}
                                    name={ipVal?.name}
                                    isMandatory={ipVal?.isMandatory}
                                    options={ipVal?.options}
                                    labelField="label"
                                    valueField="label"
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    className='rounded filter-select-dropdown'
                                />
                                :
                                <SelectBox
                                    selectOptions={ipVal?.options}
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                />
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
                        />
                    </div>

                case "input":
                    return ipVal?.type === "file" ?
                        <Fragment>
                            <div className='cursor-pointer col-12' onClick={() => document.getElementById('file_upload').click()} key={iPInd}>
                                <Input
                                    type={ipVal?.type}
                                    change={ipVal?.change}
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                    className="d-none"
                                    htmlFor="file_upload"
                                    multiple={true}
                                />
                                <div className='border py-2 rounded-2 col-12 text-center'>
                                    <span className='me-2'>{Icons.fileUploadIcon}</span>
                                    <span className='text-secondary fs-15'>Click here to choose image</span>
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
                                                    <button
                                                        type="button"
                                                        className="file-action-btn"
                                                        onClick={() => DeleteSelectFile(id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Fragment>
                        :
                        <div className="col-6 p-1 mt-2" key={iPInd}>
                            <Input
                                type={ipVal?.type}
                                value={ipVal?.value}
                                change={ipVal?.change}
                                label={ipVal?.name}
                                labelClassName="text-secondary mb-0 fs-14"
                                mandatory={ipVal?.isMandatory}
                            />
                        </div>

                case "textbox":
                    return <div className='col-12 p-1 mt-2'>
                        <Textbox
                            value={ipVal?.value}
                            change={ipVal?.change}
                            cols={10}
                            rows={5}
                            className=""
                            label={ipVal?.name}
                            labelClassName="text-secondary mb-0 fs-14"
                            mandatory={ipVal?.isMandatory}
                        />
                    </div>

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
                switch (servicesState?.modal_type) {
                    case "Create":
                    case "Filter":
                    case "Edit":
                        return servicesState?.modal_type === "Create" && servicesState?.modal_from !== "Blog" ?
                            servicesState?.is_mobile_num_verified ?
                                dynamicInput()
                                :
                                dynamicMobileVerification()
                            :
                            dynamicInput()

                    case "Delete":
                        return <h6 className='mb-0'>Delete Blog</h6>;

                    default:
                        break;
                }
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
                // case "Blog":
                switch (servicesState?.modal_type) {
                    case "Edit":
                        return <div className='col-12 p-2 px-3'>
                            <ButtonComponent
                                className="btn-danger w-100 py-2"
                                buttonName="Edit Load"
                            />
                        </div>

                    case "Delete":
                        return <div className='col-12 d-flex flex-wrap px-2'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="Close"
                                    clickFunction={() => dispatch(updateModalShow())}
                                />
                            </div>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName="Delete Load"
                                />
                            </div>
                        </div>

                    case "Create":
                        return servicesState?.is_mobile_num_verified ?
                            <div className='col-12 p-2 px-3'>
                                <ButtonComponent
                                    className="btn-danger w-100 py-2"
                                    buttonName="Post Load"
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
                                    clickFunction={() => dispatch(handlePostLoadsVerification(servicesState?.phone_number))}
                                    btnDisable={servicesState?.spinner_glow}
                                />
                            </div>


                    case "Filter":
                        return <div className='col-12 d-flex flex-wrap px-3'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="Cancel"
                                    clickFunction={() => dispatch(updateModalShow())}
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
                                buttonName="Edit Blog"
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

            default:
                break;
        }
    }

    return (
        <ModalComponent
            show={commonState?.modalShow}
            modalSize={
                servicesState?.modal_type === "Create" ?
                    servicesState?.is_mobile_num_verified ? "lg" : "md"
                    :
                    ["Edit", "Filter"].includes(servicesState?.modal_type) ? "lg" : "md"
            }
            modalCentered={true}
            modalCloseButton={true}
            showModalHeader={true}
            modalHeaderClassname="border-0"
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2"
            modalBody={<div className='d-flex flex-wrap p-3 pt-0'>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={
                servicesState?.modal_type === "Create" ?
                    servicesState?.is_mobile_num_verified ? "buyAndSell_model_height" : "md"
                    :
                    ["Edit", "Create"].includes(servicesState?.modal_type) ? "buyAndSell_model_height" : ''
            }
        />
    )
}