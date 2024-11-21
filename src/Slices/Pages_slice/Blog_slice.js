import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        blog_glow: false,
        blog_modal_type: null,
        blog_edit_id: null,
        blog_edit_data: [],

        blog_delete_id: null,
        blog_datas: []
    },
    reducers: {
        //                                                             load api's                                                         //
        //get load api




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
                blog_modal_type:"Edit"
            }
        },
        updateDeleteBlog(state, action) {
            return {
                ...state,
                blog_delete_id: action.payload,
                blog_modal_type:"Delete"
            }
        }
    }
}))

const { actions, reducer } = servicesSlice;

export const {
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog
} = actions;

export default reducer;