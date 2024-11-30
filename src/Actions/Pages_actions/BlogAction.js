import { handleValidation } from 'Actions/Common_actions/Common_action';
import axiosInstance from 'Services/axiosInstance';
import { updateToast } from 'Slices/Common_Slice/Common_slice';
import {
    updateBlogEditData,
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog,
    updateAddBlogRequest,
    updateAddBlogResponse,
    updateAddBlogFailure

} from 'Slices/Pages_slice/Blog_slice';

//                                                            blog input onchange                                                              //
export const handleBlogInputOnChange = (inputData) => dispatch => {
    dispatch(updateBlogEditData(inputData))
}

//                                                            create blog modal                                                              //
export const handleCreateBlogModal = (type) => dispatch => {
    dispatch(updateBlogModalType(type))
}

//                                                             edit blog modal                                                              //
export const handleEditBlog = (edit_id, edit_date) => dispatch => {
    dispatch(updateEditBlog({ edit_id, edit_date }))
}

//                                                             delete blog modal                                                            //
export const handleDeleteBlog = (delete_id) => dispatch => {
    dispatch(updateDeleteBlog(delete_id))
}

export const handleAddBlog = params => async (dispatch) => {
    if (params?.langugae && params?.blogCategory && params?.heading && params?.sub_heading && params?.blog_content && params?.blog_image_send_api) {
        try {
            dispatch(updateAddBlogRequest())
            const { data } = await axiosInstance.post("/blog_post_entry", params)

            if (data.error_code === 0) {
                dispatch(updateAddBlogResponse())
            } else {
                dispatch(updateAddBlogFailure())
            }
        } catch (Err) {
            dispatch(updateToast({ message: Err?.message, type: "error" }))
            dispatch(updateAddBlogFailure())
        }
    } else {
        dispatch(handleValidation)
        // dispatch(updateToast({ message: "some fileds are empty", type: "error" }))
    }
}