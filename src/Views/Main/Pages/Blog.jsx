import { handleCreateBlogModal } from 'Actions/Pages_actions/BlogAction'
import ButtonComponent from 'Components/Button/Button'
import BlogCard from 'Components/Card/BlogCard'
import { useDispatch } from 'Components/CustomHooks'
import Input from 'Components/Input/Input'
import SelectBox from 'Components/Input/SelectBox'
import Textbox from 'Components/Input/textbox'
import ModalComponent from 'Components/Modal/Modal'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateModalShow } from 'Slices/Common_Slice/Common_slice'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const Blog = () => {
    const { commonState, blogState } = useSelector((state) => state)
    const dispatch = useDispatch()
    const JsonJsx = JsonData()?.jsxJson;

    function modalHeaderFun() {
        switch (blogState?.blog_modal_type) {
            case "Edit":
                return <h6 className='mb-0'>Edit Blog</h6>;

            case "Delete":
                return <h6 className='mb-0'>Delete Blog</h6>;

            case "Create":
                return <h6 className='mb-0'>Create Blog</h6>;

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (blogState?.blog_modal_type) {
            case "Edit":
            case "Create":
                return JsonJsx?.blogInputs?.map((ipVal, iPInd) => {
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

                        case "input":
                            return <div className={`${iPInd === JsonJsx?.blogInputs?.length - 1 ? "col-12" : "col-6"} p-1 mt-2`}>
                                {
                                    ipVal?.type === "file" ?
                                        <div className='cursor-pointer' onClick={() => document.getElementById('file_upload').click()}>
                                            <Input
                                                type={ipVal?.type}
                                                change={ipVal?.change}
                                                label={ipVal?.name}
                                                labelClassName="text-secondary mb-0 fs-14"
                                                mandatory={ipVal?.isMandatory}
                                                className="d-none"
                                                htmlFor="file_upload"
                                            />
                                            <div className='border py-2 rounded-2 col-12 text-center'>
                                                <span className='me-2'>{Icons.fileUploadIcon}</span>
                                                <span className='text-secondary fs-15'>Click here to choose image</span>
                                            </div>
                                        </div>
                                        :
                                        <Input
                                            type={ipVal?.type}
                                            value={ipVal?.value}
                                            change={ipVal?.change}
                                            label={ipVal?.name}
                                            labelClassName="text-secondary mb-0 fs-14"
                                            mandatory={ipVal?.isMandatory}
                                        />

                                }

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


            case "Delete":
                return <h6 className='mb-0'>Delete Blog</h6>;

            default:
                break;
        }
    }

    function modalFooterFun() {
        switch (blogState?.blog_modal_type) {
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
                            buttonName="Delete Blog"
                        />
                    </div>
                </div>

            case "Create":
                return <div className='col-12 p-2'>
                    <ButtonComponent
                        className="btn-danger w-100 py-2"
                        buttonName="Post Blog"
                    />
                </div>

            default:
                break;
        }
    }
    
    return (
        <Fragment>
            <div className="d-flex flex-wrap h-100">
                <div className="w-100 d-inline-flex justify-content-end">
                    <div className="col-2 text-end">
                        <ButtonComponent
                            className="btn-danger py-2"
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
                            clickFunction={() => dispatch(handleCreateBlogModal("Create"))}
                        />
                    </div>
                </div>

                <div className="w-100 d-inline-flex flex-wrap overflow-scroll h-100 mt-3 pb-5">
                    {[...Array(10)].map((v) => (
                        <div className="col-3 p-1">
                            <BlogCard />
                        </div>
                    ))
                    }
                </div>
            </div>


            <ModalComponent
                show={commonState?.modalShow}
                modalSize={["Edit", "Create"].includes(blogState?.blog_modal_type) ? "lg" : "md"}
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

export default Blog