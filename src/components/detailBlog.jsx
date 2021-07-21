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
        let storedBlog = store.getBlogs().find(blog=> {
            return blog.id == id;
        });
        setBlog(storedBlog);
    },[]);

    function deleteHandler(){
        let answer = window.confirm("Save data?");
        if (answer) {
            alert("Deleted")
        }
        else {
            //some code
        }
        history.push("/");
    }

 

    return (
        <div className="container">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            {/* Delete UI -> Modal */}
            <button onClick={deleteHandler}>Delete</button>
        </div>
    );
}

export default DetailBlog
