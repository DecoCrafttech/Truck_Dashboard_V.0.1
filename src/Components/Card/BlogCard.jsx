import { handleDeleteBlog, handleEditBlog } from 'Actions/Pages_actions/BlogAction'
import ButtonComponent from 'Components/Button/Button'
import { useDispatch } from 'Components/CustomHooks'
import React from 'react'
import { Card } from 'react-bootstrap'

const BlogCard = () => {
    const dispatch = useDispatch()

    return (
        <Card className='border-0 rounded-3'>
            <Card.Img className='p-3 rounded-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s" />

            <Card.Body className='pb-1'>
                <h6>Title</h6>
                <p className='mb-0 text-secondary'>Description Description Description DescriptionDescriptionDescription</p>
            </Card.Body>

            <Card.Footer className='border-0 bg-transparent d-flex flex-wrap'>
                <div className="col-6 p-1">
                    <ButtonComponent
                        className="btn-outline-danger w-100"
                        buttonName="Delete"
                        title="Delete"
                        clickFunction={() => dispatch(handleDeleteBlog())}
                    />
                </div>
                <div className="col-6 p-1">
                    <ButtonComponent
                        className="btn-primary w-100"
                        buttonName="Edit"
                        title="Edit"
                        clickFunction={() => dispatch(handleEditBlog())}
                    />
                </div>
            </Card.Footer>
        </Card>
    )
}

export default BlogCard