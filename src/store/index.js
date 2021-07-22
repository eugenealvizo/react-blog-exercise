
const LOCAL_STORAGE_KEY = "myblog.v1"

export default class Store {
    getBlogs(){
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [];
    }
    setBlogs(blogs){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
    }

    getCurrentBlog(id){
        return this.getBlogs().find(blog=> {
            return blog.id == id;
        });
    }

    removeBlog(param){
       return this.getBlogs().filter(blog=> blog.id != param.id);
    }
}

