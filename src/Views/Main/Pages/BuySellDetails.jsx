import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleBuyAndSellInputOnChange, handleCreateModal, handleFilterModal, handleGetBuyandSell } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import BuyandSellCard from 'Components/Card/BuyandSellCard'
import { useDispatch } from 'Components/CustomHooks'
import GoogleLocationInput from 'Components/Input/GoogleLocationInput'
import Input from 'Components/Input/Input'
import InputOnly from 'Components/Input/inputOnly'
import ReactDropdownSelect from 'Components/Input/ReactDropdownSelect'
import SelectBox from 'Components/Input/SelectBox'
import Textbox from 'Components/Input/textbox'
import ModalComponent from 'Components/Modal/Modal'
import Pagination from 'Components/Pagination/Pagination'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { clearSearch, updateApplyFilterClickedTrue, updateEntriesCount, updateModalShow, updateSearchClickedTrue, updateSearchValue, updateToast } from 'Slices/Common_Slice/Common_slice'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const BuySellDetails = () => {
    const { commonState, servicesState } = useSelector((state) => state);
    const dispatch = useDispatch();
    const JsonJsx = JsonData()?.jsxJson;

    const params = {
        owner_name: "",
        kms_driven: "",
        brand: "",
        model: "",
        vehicle_number: "",
        contact_no: "",
        truck_name: "",
        company_name: "",
        price: "",
        location: "",
        tonnage: "",
        page_no: commonState?.currentPage || 1,
        search_val: commonState?.search_clicked ? commonState?.search_value || "" : "",
        data_limit: commonState?.pageSize || 10
    }

    useEffect(()=>{
        dispatch(handleResetAlMenus)
    },[])

    useEffect(() => {
        if (commonState?.search_clicked) {
            dispatch(handleGetBuyandSell(params))
        }
        else if (commonState?.apply_filter_clicked) {
            const newParams = { ...params }
            newParams.model = servicesState?.buyAndsell_filter_card?.model || ''
            newParams.brand = servicesState?.buyAndsell_filter_card?.brand || ''
            newParams.location = servicesState?.buyAndsell_filter_card?.location ? [servicesState?.buyAndsell_filter_card?.to_location] : [] || []
            newParams.kms_driven = servicesState?.buyAndsell_filter_card?.kms_driven || ''
            newParams.price = servicesState?.buyAndsell_filter_card?.price || ''
            newParams.tonnage = servicesState?.buyAndsell_filter_card?.tonnage || ''
            newParams.truck_body_type = servicesState?.buyAndsell_filter_card?.truck_body_type || ''
            newParams.no_of_tyres = servicesState?.buyAndsell_filter_card?.no_of_tyres || ''

            dispatch(handleGetBuyandSell(newParams))
        }
        else {
            dispatch(handleGetBuyandSell(params))
        }
    }, [commonState?.pageSize, commonState?.currentPage, commonState?.search_clicked, commonState?.apply_filter_clicked, commonState?.apply_filter])




    const DeleteSelectFile = (id) => {
        const result = servicesState?.new_edit_buyAndsell_card?.blog_image_show_ui.filter((data) => data.id !== id);

        const overallFile = result.map((data) => data.filename);
        var newImages = [];
        for (let i = 0; i < servicesState?.new_edit_buyAndsell_card?.blog_image_send_api.length; i++) {
            if (overallFile.includes(servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i].name)) {
                newImages[newImages.length] = servicesState?.new_edit_buyAndsell_card?.blog_image_send_api[i];
            }
        }

        dispatch(handleBuyAndSellInputOnChange({ blog_image_show_ui: result, blog_image_send_api: newImages }));
    };



    function modalHeaderFun() {
        switch (servicesState?.modal_type) {
            case "Edit":
                return <h6 className='mb-0'>Edit Buy And Sell</h6>;

            case "Delete":
                return <h6 className='mb-0'>Delete Buy And Sell</h6>;

            case "Create":
                return <h6 className='mb-0'>Create Buy And Sell</h6>;

            case "Filter":
                return <h6 className='mb-0'>Filter Buy And Sell</h6>;

            default:
                break;
        }
    }

    function dynamicInput() {
        let funBy = null
        if (["Edit", "Create"].includes(servicesState?.modal_type)) {
            funBy = JsonJsx?.buyAndSellAddEdit
        } else {
            funBy = JsonJsx?.buyAndSellFilterInputs
        }

        return funBy?.map((ipVal, iPInd) => {
            switch (ipVal?.category) {
                case "select":
                    return <div className='col-6 p-1 mt-2' key={iPInd}>
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
                    return <div className='col-6 p-1 mt-2' key={iPInd}>
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
                    return <div className='col-12 p-1 mt-2' key={iPInd}>
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
        switch (servicesState?.modal_type) {
            case "Edit":
            case "Create":
            case "Filter":
                return servicesState?.modal_type === "Create" ?
                    servicesState?.is_mobile_num_verified ?
                        dynamicInput()
                        :
                        JsonJsx?.loadVerifyInputs?.map((ipVal, iPInd) => {
                            return <div className="col-12 p-1 mt-2 p-4" key={iPInd}>
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
                    :
                    dynamicInput()

            case "Delete":
                return <h6 className='mb-0'>Delete Blog</h6>;

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (servicesState?.modal_type) {
            case "Edit":
                return <div className='col-12 p-2 px-3'>
                    <ButtonComponent
                        className="btn-danger w-100 py-2"
                        buttonName="Edit Truck"
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
                            buttonName="Delete Truck"
                        />
                    </div>
                </div>

            case "Create":
                return servicesState?.is_mobile_num_verified ?
                    <div className='col-12 p-2 px-3'>
                        <ButtonComponent
                            className="btn-danger w-100 py-2"
                            buttonName="Post Truck"
                        />
                    </div>
                    :
                    <div className='col-12 p-2 px-3'>
                        <ButtonComponent
                            className="btn-danger w-100 py-2"
                            buttonName="Verify Mobile Number"
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
                            clickFunction={()=>dispatch(updateApplyFilterClickedTrue())}
                        />
                    </div>
                </div>

            default:
                break;
        }
    }

    function handleSearchEnter(event) {
        if (event.code === "Enter") {
            if (commonState?.search_value) {
                dispatch(updateSearchClickedTrue())
            } else {
                dispatch(updateToast({ type: "error", message: "search field should not be empty" }))
            }
        }
    }

    function handleSearchClicked() {
        if (commonState?.search_value) {
            dispatch(updateSearchClickedTrue())
        } else {
            dispatch(updateToast({ type: "error", message: "search field should not be empty" }))
        }
    }

    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap align-items-center">
                    <div className="col-5">
                        <p className='m-0 ps-1'>{`showing ${
                            commonState?.currentPage * commonState?.pageSize <= commonState?.totalCount ?
                                commonState?.currentPage * commonState?.pageSize
                                :
                                (commonState?.currentPage - 1) * commonState?.pageSize + servicesState?.alltrucks_details?.length
                        } of ${commonState?.totalCount}`}
                        </p>
                    </div>
                    <div className="col-7 d-inline-flex justify-content-end align-items-center">
                        <div className="position-relative w-100">
                            <InputOnly
                                type="text"
                                InputGroupClassName="m-0"
                                className="search-input-padding py-2 mb-0"
                                placeholder="Search for anything..."
                                change={(e) => dispatch(updateSearchValue(e.target.value))}
                                keyDown={handleSearchEnter}
                                value={commonState?.search_value}
                            />

                            <span className="input-group-start-icon">{Icons.searchIcon}</span>
                            {commonState?.search_value ? <span className="input-group-end-icon-two cursor-pointer" onClick={() => handleSearchClicked()}>{Icons.searchIcon}</span> : null}
                            <span className={`${!commonState?.search_clicked ? "pe-none" : 'cursor-pointer'} input-group-end-icon-one`} onClick={() => dispatch(clearSearch())}>{Icons.searchCancelIcon}</span>
                        </div>
                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
                                clickFunction={() => dispatch(handleFilterModal)}
                            />
                        </div>
                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="btn-danger py-2 w-100"
                                buttonName={
                                    <span>
                                        <span className='me-2'>
                                            {Icons.reactPlusIcon}
                                        </span>
                                        <span>
                                            Add Buy & Sell
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal)}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='h-100 overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.buyAndsell_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.allbuyAndsell_details.map((buyAndSellData, buyAndSellInd) => (
                                <Fragment key={buyAndSellInd}>
                                    <BuyandSellCard placeholder={servicesState?.buyAndsell_glow} buy_sell_data={buyAndSellData} />
                                </Fragment>
                            ))
                        }
                    </Card.Body>

                    <Card.Footer className='border-1 bg-transparent d-flex flex-wrap align-items-center px-4'>
                        <div className="col-12 col-md-6">
                            <div className='col-12 d-flex flex-wrap align-items-center'>
                                <p className='m-0'>Showing</p>
                                <div className="select-table-sizer mx-2">
                                    <SelectBox
                                         selectBoxSize="sm"
                                         selectOptions={commonState?.showing_entries}
                                         className="col"
                                         disableSelectBox={false}
                                         change={(e) => dispatch(updateEntriesCount(e.target.value))}
                                         value={commonState?.pageSize}
                                         componentFrom="Entries"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-inline-flex justify-content-end">
                            <Pagination totalCount={commonState?.totalCount} currentPage={commonState?.currentPage} pageSize={commonState?.pageSize} />
                        </div>
                    </Card.Footer>
                </Card>
            </div>

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
                modalClassname={
                    servicesState?.modal_type === "Create" ?
                        servicesState?.is_mobile_num_verified ? "buyAndSell_model_height" : "md"
                        :
                        ["Edit", "Create"].includes(servicesState?.modal_type) ? "buyAndSell_model_height" : ''}
                modalHeader={modalHeaderFun()}
                modalBodyClassname="py-2"
                modalBody={<div className='d-flex flex-wrap p-3 pt-0'>{modalBodyFun()}</div>}
                showModalFooter={true}
                modalFooterClassname="border-0"
                modalFooter={modalFooterFun()}
            />
        </Fragment>
    )
}

export default BuySellDetails