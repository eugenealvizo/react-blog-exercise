import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import App from '../App.css'
import Store from '../store/'

const DetailBlog = ()=> {
    const { id } = useParams();
    const [ blog, setBlog] = useState({});
    const history = useHistory();
    const store = new Store();

    useEffect(()=>{
        let storedBlog = store.getCurrentBlog(id);
        setBlog(storedBlog);
    },[]);

    function deleteHandler(){
        let answer = window.confirm("Save data?");
        // Change Alert To Modal
        if (answer) {
            alert("Deleted")
            let updatedList = store.removeBlog(blog);
            store.setBlogs(updatedList);
            history.push("/");
        }
    }
    function editHandler(e){ 
        e.preventDefault();
        history.push(`/edit-blog/${id}`);
    }
    return (

        <div className="container form">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            {/* Delete UI -> Modal */}
            <div className="form__controls-group">
                <button className="btn" onClick={deleteHandler}>Delete</button>
                <button className="btn" onClick={editHandler}>Edit</button>
            </div>
        </div>
    );
}

export default DetailBlog
