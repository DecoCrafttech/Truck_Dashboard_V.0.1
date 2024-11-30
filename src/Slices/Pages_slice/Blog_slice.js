import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        blog_glow: false,
        blog_modal_type: null,
        blog_edit_id: null,
        blog_edit_data: {},

        blog_delete_id: null,
        blog_datas: [],

        blog_modal_spinner:false
    },
    reducers: {
        updateBlogModalType(state, action) {
            return {
                ...state,
                blog_modal_type: action.payload
            }
        },
        updateEditBlog(state, action) {
            return {
                ...state,
                blog_edit_id: action.payload?.edit_id,
                blog_edit_data: action.payload?.edit_data,
                blog_modal_type: "Edit"
            }
        },
        updateDeleteBlog(state, action) {
            return {
                ...state,
                blog_delete_id: action.payload,
                blog_modal_type: "Delete"
            }
        },


        //                                                             blog onchange                                                        //
        //get load api
        updateBlogEditData(state, action) {
            return {
                ...state,
                blog_edit_data: {
                    ...state.blog_edit_data,
                    ...action.payload
                }
            }
        },


        //                                                             blog adding                                                         //
        updateAddBlogRequest(state, action) {
            return {
                ...state,
                blog_modal_spinner:true
            }
        },
        updateAddBlogResponse(state, action) {
            return {
                ...state,
                blog_modal_spinner:false
            }
        },
        updateAddBlogFailure(state, action) {
            return {
                ...state,
                blog_modal_spinner:false
            }
        },
    }
}))

const { actions, reducer } = servicesSlice;

export const {
    updateBlogEditData,
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog,
    updateAddBlogRequest,
    updateAddBlogResponse,
    updateAddBlogFailure
} = actions;

export default reducer;