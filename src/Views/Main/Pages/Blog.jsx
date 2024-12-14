import { handleResetAlMenus } from 'Actions/Common_actions/Common_action'
import { handleCreateBlogModal, handleGetBlog } from 'Actions/Pages_actions/BlogAction'
import ButtonComponent from 'Components/Button/Button'
import BlogCard from 'Components/Card/BlogCard'
import { useDispatch } from 'Components/CustomHooks'
import SelectBox from 'Components/Input/SelectBox'
import Pagination from 'Components/Pagination/Pagination'
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateEntriesCount } from 'Slices/Common_Slice/Common_slice'
import Icons from 'Utils/Icons' 

const Blog = () => {
    const { commonState, blogState } = useSelector((state) => state)
    const dispatch = useDispatch() 
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
        </Fragment>
    )
}

export default Blog