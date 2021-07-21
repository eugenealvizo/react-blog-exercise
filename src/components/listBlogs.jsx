import React, { useEffect, useState } from 'react';
import App from '../App.css'
import { Link } from 'react-router-dom';
import Store from '../store/'


const ListBlogs = (props) => {
    const [blogs, setBlogs] = useState([]);
    const store = new Store()
    
    //RUN ONLOAD
    useEffect(() => {
        const storedBlogs = store.getBlogs();
        if (setBlogs) setBlogs(storedBlogs)
      }, [])

    //RUNS IF Data change
    useEffect(()=>{
        store.setBlogs(blogs);
    },[blogs])

    const listItems = blogs.map((blog)=>{
        let location = `/view-blog/${blog.id}`;
        return (
            <Link to={location} key={blog.id}>
                <div className="blog__item">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <span>Date Created: {blog.date} by: Admin</span>
                </div>
            </Link>
        )
    });

    function handlerSort(e) {
        e.preventDefault();
        console.log(e.target.value)
        let newBlogs = blogs;
        if(e.target.value == 1){
            newBlogs = blogs.sort((a,b) => (a.title.localeCompare(b.title)));
        }else {
            //TODO
        }
        setBlogs([...newBlogs]);
    }


    return (
        <div className="container">
            {/* Search and Filter */}
            <h1>Blogify</h1>
            <div className="blog-filter-group">
                <input type="text" className="input" placeholder="Search for Blog"/>
                <select className="select" onChange={handlerSort}>
                    <option value="1">Alphabetically (A-Z)</option>
                    <option value="2">By Most Recent</option>
                </select>
            </div>
            <div className="blog-list">
                {listItems}
            </div>
            {/* list item */}
     
            {/* pagination */}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

// const mapDispatchToProps = {
//     selectBlog: selectBlog
// }

export default ListBlogs
