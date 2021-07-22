import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Store from '../store/'



const EditBlog = () => { 
    const { id } = useParams();

    const [viewtitle, setViewTitle] = useState(null);
    const [viewContent, setViewContent] = useState(null);
    const [blog, setBlog] = useState({});

    const history = useHistory();
    const store = new Store();

    useEffect(()=>{
        let storedBlog = store.getCurrentBlog(id);
        setBlog(storedBlog);
        setViewTitle(storedBlog.title);
        setViewContent(storedBlog.content)
    },[]);

    function publish(e){
        e.preventDefault();
        const blogData = {
            id: id,
            title: viewtitle,
            content: viewContent,
            date: new Date().toLocaleDateString(),
        }
        let updatedList = store.removeBlog(blog);
        updatedList.push(blogData) 
        store.setBlogs(updatedList);
        history.push("/");
    }
    function handlerTitleChange(e){
        setViewTitle(e.target.value);
    }

    function handlerContentChange(e){
        setViewContent(e.target.value);
    }


    return (
        <form className="container form" onSubmit={publish}>
            <h1>Edit Blog</h1>
            <input type="text" className="input" placeholder="Title" required value={viewtitle} onChange={handlerTitleChange}/>
            <textarea placeholder="Content" className="input" required value={viewContent} onChange={handlerContentChange}></textarea> 
            <button className="btn">Update</button> 
            {/* Delete Blog -> Modal via Edit*/}
        </form>
    );
}

export default EditBlog
