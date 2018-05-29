import React, { Component } from 'react';
import {Link } from "react-router-dom";
import './movieList.css';


//一个极小的子组件
function Showmore(props){
    const isShow = props.isShow;
    if(isShow){
        return  <span><Link to={"/more/"+ props.url}>更多></Link></span>;
    }else{
        return '';
    }
}

class MovieList extends Component {
  // 相当于vue的data
  constructor(props){
      super(props);
      this.state = {
          isShow: false
      }
  }

  location(){
      if(window.location.pathname === '/'){
          this.setState({
              isShow: true
          })
      }
  }

  componentWillMount(){

      this.location();
  }

  render() {
    var movieList2 =  this.props.movieList.map(function(item,index){
       return <li key={index}>
                  <Link to={"/detail/"+item.id}>
                      <div className='wp'>
                          <img src={item.images.small} alt='豆瓣电影'/>
                      </div>
                      <div className="info">
                          {item.title}
                      </div>
                  </Link>
              </li>
    });
    var title = this.props.title;

    return (
          <div className='contentStyle'>
                <div className='titleStyle'><span>{title}</span><Showmore isShow={this.state.isShow} url={this.props.url}/></div>
                <div className='movieList'>
                    <ul>
                        {
                           movieList2
                        }
                    </ul>
                </div>
          </div>
    );
  }
}

export default MovieList;
