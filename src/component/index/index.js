import React, { Component } from 'react';
import '../../App/App.css';
import server from '../../js/server.js';

//导入子组件
import MovieList from '../../subcomponents/MovieList/MovieList.js';
import Search from '../../subcomponents/Search/Search.js';

// 导入ant design
import { Spin, Icon } from 'antd';
import 'antd/dist/antd.css';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class App extends Component {
  // 相当于vue的data
  constructor(props){
      super(props);
      this.state = {
          playingTitle: '1',
          playingMovieList : [{images:{
              small:''
          }}],

          willplayTitle: '1',
          willplayMovieList : [{images:{
              small:''
          }}],

          isLoading:true

      };
      this.get = this.get.bind(this);
  }

  get(){
      server.fetchPalyingMovieList('get',{
          start: 0,
          count: 9
      }).then((result) =>{
          this.setState({
              playingMovieList : result.data.subjects,
              playingTitle : result.data.title
          });
      })

      server.fetchWillMovieList('get',{
          start: 0,
          count: 9
      }).then((result) =>{
          this.setState({
              willplayMovieList : result.data.subjects,
              willplayTitle : result.data.title,

          })

          setTimeout(function(){
              this.setState({
                  isLoading: false
              })
          }.bind(this),1000);
      })
  }

  //这个生命周期 组件渲染之后调用，只调用一次。
  componentWillMount(){
      this.get();
  }

  render() {
    if(this.state.isLoading){
        return (
            <div>
             <Spin indicator={antIcon} />
            </div>
        );
    }else{
        return (
            <div>
                <Search />
                <MovieList movieList={this.state.playingMovieList} title={this.state.playingTitle} url={'fetchPalyingMovieList'}/>
                <MovieList movieList={this.state.willplayMovieList} title={this.state.willplayTitle} url={'fetchWillMovieList'}/>
            </div>

        );
    }

  }
}



export default App;
