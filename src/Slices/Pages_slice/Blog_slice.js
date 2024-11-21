import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice(({
    name: "service_slice",
    initialState: {
        blog_glow: false,
        blog_modal_type: null,
        blog_edit_id: null,
        blog_edit_data: {},

        blog_delete_id: null,
        blog_datas: []
    },
    reducers: {
        //                                                             load api's                                                         //
        //get load api
        updateBlogEditData(state, action) {
            switch (action.payload?.type) {
                case "language":
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                case "category":
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                case "heading":
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                case "sub_heading":
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                case "blog_content":
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                case "blog_image":
                    console.log(action.payload?.value)
                    return {
                        ...state,
                        blog_edit_data: action.payload?.value
                    }

                default:
                    break;
            }
        },



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
        }
    }
}))

const { actions, reducer } = servicesSlice;

export const {
    updateBlogEditData,
    updateBlogModalType,
    updateEditBlog,
    updateDeleteBlog
} = actions;

export default reducer;