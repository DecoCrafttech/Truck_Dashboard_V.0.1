import { handleCreateModal, handleGetLoads } from 'Actions/Pages_actions/ServicesActions'
import ButtonComponent from 'Components/Button/Button'
import LoadCard from 'Components/Card/LoadCard'
import { useDispatch } from 'Components/CustomHooks'
import GoogleLocationInput from 'Components/Input/GoogleLocationInput'
import Input from 'Components/Input/Input'
import InputOnly from 'Components/Input/inputOnly'
import SelectBox from 'Components/Input/SelectBox'
import ModalComponent from 'Components/Modal/Modal'
import Pagination from 'Components/Pagination/Pagination'
import React, { Fragment, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { updateModalShow } from 'Slices/Common_Slice/Common_slice'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const LoadDetails = () => {
    const { commonState, servicesState } = useSelector((state) => state);
    const dispatch = useDispatch();
    const JsonJsx = JsonData()?.jsxJson;

    useEffect(() => {
        dispatch(handleGetLoads)
    }, [])


    function modalHeaderFun() {
        switch (servicesState?.modal_type) {
            case "Edit":
                return <h6 className='mb-0'>Edit Load</h6>;

            case "Delete":
                return <h6 className='mb-0'>Delete Load</h6>;

            case "Create":
                return <h6 className='mb-0'>Create Load</h6>;

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (servicesState?.modal_type) {
            case "Edit":
            case "Create":
                return JsonJsx?.loadAddEditInputs?.map((ipVal, iPInd) => {
                    switch (ipVal?.category) {
                        case "select":
                            return <div className='col-6 p-1 mt-2'>
                                <SelectBox
                                    selectOptions={ipVal?.options}
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                />
                            </div>

                        case "googleLocation":
                            return <div className='col-6 p-1 mt-2'>
                                <GoogleLocationInput
                                    name={ipVal?.name}
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    mandatory={ipVal?.isMandatory}
                                />
                            </div>

                        case "input":
                            return <div className="col-6 p-1 mt-2">
                                <Input
                                    type={ipVal?.type}
                                    value={ipVal?.value}
                                    change={ipVal?.change}
                                    label={ipVal?.name}
                                    labelClassName="text-secondary mb-0 fs-14"
                                    mandatory={ipVal?.isMandatory}
                                />
                            </div>

                        default:
                            break;
                    }
                })

            case "Delete":
                return <h6 className='mb-0'>Delete Blog</h6>;

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (servicesState?.modal_type) {
            case "Edit":
                return <div className='col-12 p-2'>
                    <ButtonComponent
                        className="btn-danger w-100 py-2"
                        buttonName="Edit Load"
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
                            buttonName="Delete Load"
                        />
                    </div>
                </div>

            case "Create":
                return <div className='col-12 p-2'>
                    <ButtonComponent
                        className="btn-danger w-100 py-2"
                        buttonName="Post Load"
                    />
                </div>

            default:
                break;
        }
    }


    return (
        <Fragment>
            <div className="h-100">
                <div className="w-100 d-inline-flex flex-wrap justify-content-end">
                    <div className="col-6 d-inline-flex justify-content-end align-items-center">
                        <div className="position-relative w-100">
                            <InputOnly
                                type="text"
                                InputGroupClassName="m-0"
                                className="search-input-padding py-2 mb-0"
                                placeholder="Search for anything..."
                                change={(e) => console.log(e.target.value)}
                                keyDown={(e) => console.log(e.code)}
                            />

                            <span className="input-group-start-icon">{Icons.searchIcon}</span>
                            <span className="input-group-end-icon-one">{Icons.searchCancelIcon}</span>
                            <span className="input-group-end-icon-two">{Icons.searchIcon}</span>
                        </div>
                        <div className="col-3 text-end p-1">
                            <ButtonComponent
                                className="bg-white py-2 w-100"
                                buttonName="Filter"
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
                                            Create Blog
                                        </span>
                                    </span>
                                }
                                clickFunction={() => dispatch(handleCreateModal())}
                            />
                        </div>
                    </div>
                </div>

                <Card className='w-100 main-content-card-height mt-3 px-0 py-1 rounded border-0'>
                    <Card.Body className='h-100 overflowY w-100 rounded placeholder-glow'>
                        {servicesState?.load_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <LoadCard placeholder={servicesState?.load_glow} key={placeholderInd} />
                            ))
                            :
                            servicesState?.allLoads_details.map((loads, loadInd) => (
                                <LoadCard placeholder={servicesState?.load_glow} load={loads} key={loadInd} />
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
                                    />
                                </div>
                                <p className='m-0'>of 50</p>
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
                modalSize={["Edit", "Create"].includes(servicesState?.modal_type) ? "lg" : "md"}
                modalCentered={true}
                modalCloseButton={true}
                showModalHeader={true}
                modalHeaderClassname="border-0"
                modalHeader={modalHeaderFun()}
                modalBodyClassname="py-2"
                modalBody={<div className='d-flex flex-wrap p-3'>{modalBodyFun()}</div>}
                showModalFooter={true}
                modalFooterClassname="border-0"
                modalFooter={modalFooterFun()}
            />
        </Fragment>
    )
}

export default LoadDetails