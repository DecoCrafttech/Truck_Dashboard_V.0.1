import { handleValidation } from 'Actions/Common_actions/Common_action';
import axiosInstance from 'Services/axiosInstance';
import { updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    updateBlogEditData,
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog,

    getBlogRequest,
    getBlogResponse,
    getBlogFailure,

    updateAddBlogRequest,
    updateAddBlogResponse,
    updateAddBlogFailure,

    blogDeletionRequest,
    blogDeletionResponse,
    blogDeletionFailure,

} from 'Slices/Pages_slice/Blog_slice';

//                                                            blog input onchange                                                              //
export const handleBlogInputOnChange = (inputData) => dispatch => {
    dispatch(updateBlogEditData(inputData))
}


//                                                            create blog modal                                                                //
export const handleCreateBlogModal = (type) => dispatch => {
    dispatch(updateBlogModalType(type))
}


//                                                             edit blog modal                                                                 //
export const handleEditBlog = (edit_date) => dispatch => {
    dispatch(updateEditBlog(edit_date))
}


//                                                             delete blog modal                                                               //
export const handleDeleteBlog = (deletion_blog_heading, delete_id) => dispatch => {
    dispatch(updateDeleteBlog({ deletion_blog_heading, delete_id }))
}


//                                                             get blogs                                                                       //
export const handleGetBlog = params => async (dispatch) => {
    try {
        dispatch(getBlogRequest())
        const { data } = await axiosInstance.post("/dashboard_blog_post", params)

        if (data.error_code === 0) {
            dispatch(getBlogResponse(data?.data))
        } else {
            dispatch(getBlogFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (Err) {
        dispatch(updateToast({ message: Err?.message, type: "error" }))
        dispatch(getBlogFailure())
    }
}


//                                                             adding blog                                                                     //
export const handleAddBlog = params => async (dispatch) => {
    if (params?.language && params?.category && params?.heading1 && params?.heading2 && params?.blog_content && params?.blog_image_send_api) {
        try {
            const fd = new FormData()
            fd.append("language", params?.language)
            fd.append("category", params?.category)
            fd.append("heading1", params?.heading1)
            fd.append("heading2", params?.heading2)
            fd.append("blog_content", params?.blog_content)
            fd.append("image_name", params?.blog_image_send_api)

            dispatch(updateAddBlogRequest())
            const { data } = await axiosInstance.post("/blog_post_entry", fd)

            if (data.error_code === 0) {
                dispatch(updateAddBlogResponse())
            } else {
                dispatch(updateAddBlogFailure())
                dispatch(updateToast({ message: data?.message, type: "error" }))
            }
        } catch (Err) {
            dispatch(updateToast({ message: Err?.message, type: "error" }))
            dispatch(updateAddBlogFailure())
        }
    } else {
        dispatch(handleValidation)
    }
}


//                                                             delete blogs                                                                       //
export const handleDeleteBlogApi = blog_id => async (dispatch) => {
    try {
        dispatch(blogDeletionRequest())
        const { data } = await axiosInstance.post("/delete_blog_post", { blog_id: blog_id })

        if (data.error_code === 0) {
            dispatch(blogDeletionResponse(data?.data))
        } else {
            console.log(data.message)
            dispatch(blogDeletionFailure())
            dispatch(updateToast({ message: data?.message, type: "error" }))

        }
    } catch (Err) {
        dispatch(updateToast({ message: Err?.message, type: "error" }))
        dispatch(blogDeletionFailure())
    }
}