import { updateModalShow } from 'Slices/Common_Slice/Common_slice';
import {
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog


} from 'Slices/Pages_slice/Blog_slice';


//                                                            create blog modal                                                              //
export const handleCreateBlogModal = (type) => dispatch => {
    dispatch(updateBlogModalType(type))
    dispatch(updateModalShow())
}

//                                                             edit blog modal                                                              //
export const handleEditBlog = (edit_id, edit_date) => dispatch => {
    dispatch(updateEditBlog({ edit_id, edit_date }))
    dispatch(updateModalShow())
}


//                                                             delete blog modal                                                            //
export const handleDeleteBlog = (delete_id) => dispatch => {
    dispatch(updateDeleteBlog(delete_id))
    dispatch(updateModalShow())
}