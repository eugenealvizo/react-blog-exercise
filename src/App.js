import CreateBlog  from './components/createBlog'
import ListBlog from './components/listBlogs'
import DetailBlog from './components/detailBlog'
// import App from './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
     <Router>
      <div className="App">
          <Switch>
            <Route exact path="/">
              <ListBlog/>
            </Route>
            <Route path="/create">
              <CreateBlog/>
            </Route>
            <Route path="/view-blog/:id">
              <DetailBlog/>
            </Route>
          </Switch>
      </div>
    </Router>

  );
}

export default App;
