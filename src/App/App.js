import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

// 导入路由组件
import Index from '../component/index/index.js';
import More from '../component/more/more.js';
import Detail from '../component/detail/detail.js';
import Search from '../component/search/search.js';
import Loadmore from '../component/loadmore/loadmore.js';



class App extends Component {
  constructor(props){
      super(props);

  }



  componentWillMount(){

  }
  // 相当于vue的data
  render() {


    return (
      <div className="App">
          <Router>
              <div>
                  <div className='headerStyle'>
                        <p><Link to="/">电影</Link></p>
                  </div>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/more/:url" component={More} />
                  <Route exact path='/detail/:movieId' component={Detail} />
                  <Route exact path='/loadmore' component={Loadmore} />
                  <Route exact path='/search/:movieName' component={Search}/>
                  <Route exact path='/search/' component={Search}/>
            </div>
          </Router>

      </div>
    );
  }
}

export default App;
