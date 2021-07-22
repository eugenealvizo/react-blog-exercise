import React, { useEffect, useState, useRef } from 'react';
import App from '../App.css'
import { Link } from 'react-router-dom';
import Store from '../store/'
import Pagination from "react-js-pagination";

const ITEMS_PER_PAGE = 3;


const ListBlogs = (props) => {
    const searchView = useRef();
    const [blogs, setBlogs] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [filteredBlogs, setfilteredBlogs] = useState([]);
    const store = new Store()
    
    //RUN ONLOAD
    useEffect(() => {
        const storedBlogs = store.getBlogs();
        if (setBlogs){
            setBlogs(storedBlogs)
            setfilteredBlogs(storedBlogs)
        }
        setTotalPage(storedBlogs.length);
        updatePaginate(storedBlogs, activePage, ITEMS_PER_PAGE);

      }, [])

 
    function paginate(array, currentPage, postsPerPage){
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return array.slice(indexOfFirstPost, indexOfLastPost);
    };

    function updatePaginate(array, pageNumber, postsPerPage){
        setBlogs(paginate(array, pageNumber, postsPerPage))
    }

    const listItems = blogs.map((blog)=>{
        let location = `/blog/${blog.id}`;
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
        let sortedItem = searchView.current.value ?  [...filteredBlogs]: [...store.getBlogs()];
        console.log(sortedItem);
        if(e.target.value == 1){
            sortedItem.sort((a,b) => (a.title.localeCompare(b.title)));
            console.log(sortedItem)
            updatePaginate([...sortedItem], activePage, ITEMS_PER_PAGE);
        }else {
            //TODO
        }
    }
    // EVENT Handlers
    function handlerSearch(e){
        let filteredItems = [...filteredBlogs];
        setActivePage(1);
    
        if(searchView.current.value.length > 0){
            let sorted = filteredItems.filter(blog=> blog.title.toLowerCase().includes(searchView.current.value.toLowerCase()));
            updatePaginate([...sorted],activePage, ITEMS_PER_PAGE);
            setTotalPage(sorted.length);
        }
        else{
            updatePaginate([...store.getBlogs()], activePage, ITEMS_PER_PAGE);
            setTotalPage(store.getBlogs().length);
        }
    }
    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
        let cloneBlogs = [...filteredBlogs];
        if(searchView.current.value){
            let sorted = cloneBlogs.filter(blog=> blog.title.toLowerCase().includes(searchView.current.value.toLowerCase()));
            updatePaginate([...sorted], pageNumber, ITEMS_PER_PAGE); 
        }else {
            updatePaginate(cloneBlogs, pageNumber, ITEMS_PER_PAGE);
        }
  
    }
    // End Handlers

    return (
        <div className="container">
            {/* Search and Filter */}
            <h1>Blogify</h1>
            {/* TODO STYLING */}
          
            <div class="blog-action-group"> 
                <div className="blog-filter-group">
                    <input type="text" className="input" placeholder="Search for Blog" ref={searchView} onChange={handlerSearch}/>
                    <select className="select" onChange={handlerSort}>
                        <option value="1">Alphabetically (A-Z)</option>
                        {/* TODO RECENCY */}
                        <option value="2">By Most Recent</option> 
                    </select>
                </div>
                <Link className="btn" to="/create">Create</Link>
            </div>

            <div className="blog-list">
                {listItems}
                { listItems.length == 0 && (<h1>No Records Found</h1> )}
            </div>
            {
             listItems.length !==0 &&
            (<Pagination
                activePage={activePage}
                itemsCountPerPage={ITEMS_PER_PAGE}
                totalItemsCount={totalPage}
                pageRangeDisplayed={5}
                hideFirstLastPages={true}
                onChange={handlePageChange}
            />)  }
        </div>
    );

}
export default ListBlogs
