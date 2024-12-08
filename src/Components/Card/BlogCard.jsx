import { handleDeleteBlog, handleEditBlog } from 'Actions/Pages_actions/BlogAction'
import ButtonComponent from 'Components/Button/Button'
import { useDispatch } from 'Components/CustomHooks'
import Img from 'Components/Img/Img'
import React from 'react'
import { Card } from 'react-bootstrap'

const BlogCard = ({
    placeholder,
    blogData,
    is_delete_card

}) => {


    const dispatch = useDispatch()
    return (
        <Card className='border-0 rounded-3 h-100'>
            {
                placeholder ?
                    <div className='p-3 pb-0'>
                        <Img className='w-100 rounded-3 placeholder placeholder-blog-image' src={blogData?.blog_image_name} />
                    </div>
                    :
                    <Card.Img className='p-3 rounded-5' src={blogData?.blog_image_name} />
            }

            <Card.Body className='pb-1'>
                <h6 className={placeholder ? 'placeholder w-75 py-3 rounded-2' : ''}>{blogData?.heading1}</h6>
                <p className={placeholder ? 'placeholder w-100 py-4 pb-5 rounded-2' : 'mb-0 text-secondary'}>{blogData?.blog_content}</p>
            </Card.Body>

            {
                !is_delete_card ?
                    <Card.Footer className='border-0 bg-transparent d-flex flex-wrap'>
                        <div className="col-6 p-1">
                            <ButtonComponent
                                className={placeholder ? "placeholder w-100 pe-none" : "btn-outline-danger w-100"}
                                buttonName="Delete"
                                title="Delete"
                                clickFunction={() => dispatch(handleDeleteBlog(blogData?.heading1, blogData?.blog_id))}
                            />
                        </div>
                        <div className="col-6 p-1">
                            <ButtonComponent
                                className={placeholder ? "placeholder w-100 pe-none" : "btn-primary w-100"}
                                buttonName="Edit"
                                title="Edit"
                                clickFunction={() => dispatch(handleEditBlog(blogData))}
                            />
                        </div>
                    </Card.Footer>
                    :
                    null
            }
        </Card>
    )
}

export default BlogCard