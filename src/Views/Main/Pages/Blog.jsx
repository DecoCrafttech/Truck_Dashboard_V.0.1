import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleAddBlog, handleBlogInputOnChange, handleCreateBlogModal, handleDeleteBlogApi, handleGetBlog } from 'Actions/Pages_actions/BlogAction'
import ButtonComponent from 'Components/Button/Button'
import BlogCard from 'Components/Card/BlogCard'
import { useDispatch } from 'Components/CustomHooks'
import Input from 'Components/Input/Input'
import SelectBox from 'Components/Input/SelectBox'
import Textbox from 'Components/Input/textbox'
import ModalComponent from 'Components/Modal/Modal'
import Pagination from 'Components/Pagination/Pagination'
import SpinnerComponent from 'Components/Spinner/Spinner'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateEntriesCount, updateModalShow } from 'Slices/Common_Slice/Common_slice'
import Icons from 'Utils/Icons'
import JsonData from 'Utils/JsonData'

const Blog = () => {
    const { commonState, blogState } = useSelector((state) => state)
    const dispatch = useDispatch()
    const JsonJsx = JsonData()?.jsxJson;
    const params = {
        page_no: commonState?.currentPage,
        data_limit: commonState?.pageSize
    }

    useEffect(() => {
        dispatch(handleResetAlMenus)
    }, [])

    useEffect(() => {
        dispatch(handleGetBlog(params))
    }, [commonState?.pageSize, commonState?.currentPage, blogState?.get_blog_recall])

    const DeleteSelectFile = (id) => {
        const result = blogState?.blog_edit_data?.blog_image_show_ui.filter((data) => data.id !== id);

        const overallFile = result.map((data) => data.filename);
        var newImages = [];
        for (let i = 0; i < blogState?.blog_edit_data?.blog_image_send_api.length; i++) {
            if (overallFile.includes(blogState?.blog_edit_data?.blog_image_send_api[i].name)) {
                newImages[newImages.length] = blogState?.blog_edit_data?.blog_image_send_api[i];
            }
        }

        dispatch(handleBlogInputOnChange({ blog_image_show_ui: result, blog_image_send_api: newImages }));
    };

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

                                {ipVal.error ? <p className='fs-14 text-danger mt-2 ps-1 mb-0'>{ipVal.error}</p> : null}
                            </div>

                        case "input":
                            return <div className={`${iPInd === JsonJsx?.blogInputs?.length - 1 ? "col-12" : "col-6"} p-1 mt-2`}>
                                {
                                    ipVal?.type === "file" ?
                                        <Fragment>
                                            {ipVal?.value?.length ?
                                                null
                                                :
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

                                                    {ipVal.error ? <p className='fs-14 text-danger mt-2 ps-1 mb-0'>{ipVal.error}</p> : null}
                                                </div>
                                            }

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
                                        <Fragment>
                                            <Input
                                                type={ipVal?.type}
                                                value={ipVal?.value}
                                                change={ipVal?.change}
                                                label={ipVal?.name}
                                                labelClassName="text-secondary mb-0 fs-14"
                                                mandatory={ipVal?.isMandatory}
                                            />

                                            {ipVal.error ? <p className='fs-14 text-danger mt-2 ps-1 mb-0'>{ipVal.error}</p> : null}
                                        </Fragment>

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

                                {ipVal.error ? <p className='fs-14 text-danger mt-2 ps-1 mb-0'>{ipVal.error}</p> : null}
                            </div>

                        default:
                            break;
                    }
                })


            case "Delete":
                return <p className='mb-0 text-center py-5 w-100'>
                    Do you want to delete
                    <strong className='fs-16 ps-1'>
                        {blogState?.blog_deletion_heading}
                    </strong>
                </p>;

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
    }

    return (
        <Fragment>
            <div className="d-flex flex-wrap h-100 placeholder-glow">
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
                            clickFunction={() => dispatch(handleCreateBlogModal("Blog", "Create"))}
                        />
                    </div>
                </div>

                <div className="w-100 blog-main-content-height">
                    <div className="w-100 d-inline-flex flex-wrap align-items-stretch overflowY mt-3 pb-5">
                        {blogState?.blog_glow ?
                            [...Array(6)].map((value, placeholderInd) => (
                                <div className="col-3 p-1">
                                    <BlogCard placeholder={blogState?.blog_glow} key={placeholderInd} />
                                </div>
                            ))
                            :
                            blogState?.blog_datas?.length ?
                                blogState?.blog_datas?.map((blogData, blogInd) => (
                                    <div className="col-3 p-1" key={blogInd}>
                                        <BlogCard placeholder={blogState?.blog_glow} blogData={blogData} />
                                    </div>
                                ))
                                :
                                <div className='w-100 blog-main-content-height d-inline-flex align-items-center justify-content-center'>
                                    <div className="col-6 text-center">
                                        <h6>No Data Found</h6>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {blogState?.blog_datas?.length ?
                    <div className='w-100 d-flex flex-wrap align-items-center px-4'>
                        <div className="col-12 col-md-6">
                            <div className='col-12 d-flex flex-wrap align-items-center'>
                                <p className='m-0'>Entries</p>
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
                    </div>
                    :
                    null
                }
            </div>


            {/* <ModalComponent
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
            /> */}
        </Fragment>
    )
}

export default Blog