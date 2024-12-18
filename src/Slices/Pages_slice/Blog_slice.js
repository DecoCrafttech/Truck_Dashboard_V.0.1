import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        blog_glow: false,
        blog_modal_type: null,
        blog_edit_data: {},
        get_blog_recall: false,

        blog_delete_id: null,
        blog_datas: [],
        blog_modal_spinner: false
    },
    reducers: {
        updateBlogModalType(state, action) {
            return {
                ...state,
                blog_modal_type: action.payload,
                blog_edit_data: {}
            }
        },
        updateEditBlog(state, action) {
            return {
                ...state,
                blog_edit_data: action.payload,
            }
        },
        updateDeleteBlog(state, action) {
            return {
                ...state,
                blog_delete_id: action.payload?.deletion_blog_data?.blog_id,
                blog_deletion_heading: action.payload?.deletion_blog_data?.heading1,
                blog_edit_data: action.payload?.deletion_blog_data
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


        //                                                             get blog data                                                       //
        getBlogRequest(state, action) {
            return {
                ...state,
                blog_glow: true
            }
        },
        getBlogResponse(state, action) {
            return {
                ...state,
                blog_datas: action.payload?.blog_data,
                blog_glow: false,
                get_blog_recall: false
            }
        },
        getBlogFailure(state, action) {
            return {
                ...state,
                blog_glow: false,
                get_blog_recall: false
            }
        },

        //                                                             blog adding                                                         //
        updateAddBlogRequest(state, action) {
            return {
                ...state,
                blog_modal_spinner: true
            }
        },
        updateAddBlogResponse(state, action) {
            return {
                ...state,
                blog_modal_spinner: false,
                blog_edit_data: {},
                get_blog_recall: true
            }
        },
        updateAddBlogFailure(state, action) {
            return {
                ...state,
                blog_modal_spinner: false
            }
        },

        //                                                             blog adding                                                         //
        blogDeletionRequest(state, action) {
            return {
                ...state,
                blog_modal_spinner: true
            }
        },
        blogDeletionResponse(state, action) {
            return {
                ...state,
                blog_modal_spinner: false,
                blog_delete_id: null,
                get_blog_recall: true
            }
        },
        blogDeletionFailure(state, action) {
            return {
                ...state,
                blog_modal_spinner: false
            }
        }
    }
}))

const { actions, reducer } = servicesSlice;

export const {
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
} = actions;

export default reducer;