import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import App from '../App.css'
import Modal from "./modal";
import Store from '../store/'

const DetailBlog = ()=> {
    const { id } = useParams();
    const [ blog, setBlog] = useState({});
    const [ showModal, setShowModal] = useState(false);
    const history = useHistory();
    const store = new Store();

    useEffect(()=>{
        let storedBlog = store.getCurrentBlog(id);
        if(!storedBlog) {
            history.replace('/404');
        }
        setBlog(storedBlog);
    },[]);

    function deleteHandler(){
        setShowModal(true);
    }
    function editHandler(e){ 
        e.preventDefault();
        history.push(`/edit-blog/${id}`);
    }

    function handlerModalCancel(){
        setShowModal(false);
    }
    function handlerModalConfirm(){
        let updatedList = store.removeBlog(blog);
        store.setBlogs(updatedList);
        setShowModal(false);
        history.push("/");
    }

    return (
        <React.Fragment>
            <div className="container form">
                <h1>{blog.title}</h1>
                <p>{blog.content}</p>
                <div className="form__controls-group">
                    <button className="btn" onClick={deleteHandler}>Delete</button>
                    <button className="btn" onClick={editHandler}>Edit</button>
                </div>
            </div>
            { showModal &&  <Modal content={`Are you sure you want to delete it ${blog.title}?`} clickCancel={handlerModalCancel} clickConfirm={handlerModalConfirm}/> }
           
        </React.Fragment>
    );
}

export default DetailBlog
