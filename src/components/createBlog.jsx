import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Store from '../store/'
const short = require('short-uuid');


const CreateBlog = () => { 
    const titleInputRef = useRef();
    const contentInputRef = useRef();
    const history = useHistory();
    const store = new Store();

    function publish(e){
        e.preventDefault();
        const enteredTitle = titleInputRef.current.value;
        const enteredContent = contentInputRef.current.value;

        const blogData = {
            id: short.generate(),
            title: enteredTitle,
            content: enteredContent,
            date: new Date().toLocaleDateString(),
        }
        let storedBlogs = store.getBlogs();
        storedBlogs.push(blogData) 
        localStorage.setItem("myblog.v1", JSON.stringify(storedBlogs));
        history.push("/");
    }
    return (
        <form className="container form" onSubmit={publish}>
            <h1>Create Blog</h1>
            <input type="text" className="input" placeholder="Title" required ref={titleInputRef}/>
            <textarea placeholder="Content" className="input" required ref={contentInputRef}></textarea> 
            <button className="btn">Publish</button> {/* update blog*/}
            {/* Delete Blog -> Modal via Edit*/}
        </form>
    );
}

export default CreateBlog
