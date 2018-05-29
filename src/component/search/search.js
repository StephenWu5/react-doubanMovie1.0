import React,{Component} from 'react';
import server from '../../js/server';
import ReactPullLoad,{ STATS } from 'react-pullload';
import MovieList from '../../subcomponents/MovieList/MovieList';
import Search1 from '../../subcomponents/Search/Search';
import './search.css';
import PubSub from 'pubsub-js';


// 导入ant design
import { Spin, Icon } from 'antd';
import 'antd/dist/antd.css';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchTitle: '',
            searchMovieList: [],
            isLoading: true,
            pubsub_token:null,
            hasMore: true,
            action: STATS.init,
            start: 0
        }
    }


    get(){
        server.fetchMovieSearch('get',{
            q: this.props.match.params.movieName,
            start: 0
        }).then((result) => {
            this.setState({
                searchTitle: result.data.title,
                searchMovieList: result.data.subjects,
                isLoading: false,
                action: STATS.reset
            })
        })
    }


    handleAction = (action) => {
        console.info(action, this.state.action,action === this.state.action);
        //new action must do not equel to old action
        if(action === this.state.action){
          return false
        }

        if(action === STATS.refreshing){//刷新
          this.handRefreshing();
        } else if(action === STATS.loading){//加载更多
          this.handLoadMore();
        } else{
          //DO NOT modify below code
          this.setState({
            action: action
          })
        }
      }

      //上拉刷新
      handRefreshing(){
          console.log('上拉了',"1111");
          if(STATS.refreshing === this.state.action){
             return false
           }

          this.get();

          this.setState({
          action: STATS.refreshing
        })
      }
      //下拉加载
      handLoadMore(){
          if(STATS.loading === this.state.action){
             return false
           }
          this.setState({
              start: this.state.start + 20
          })
          server.fetchMovieSearch('get',{
              q: this.props.match.params.movieName,
              start: this.state.start
          }).then((result) => {
              this.setState({
                  searchTitle: result.data.title,
                  searchMovieList: this.state.searchMovieList.concat(result.data.subjects),
                  isLoading: false,
                  action: STATS.reset
              })
          })

          this.setState({
             action: STATS.loading
           })
    }

    //父组件中监听
    componentWillMount(){
        this.get();
        this.state.pubsub_token = PubSub.subscribe('PubSubmessage',(topic,message) => {
            this.get();
       });
    }


    componentWillUnmount(){
      // PubSub.unsubscribe(this.state.pubsub_token);
    }

    render(){
        const {
          hasMore
        } = this.state

        if(this.state.isLoading){
            return(
                <div>
                    <Spin indicator={antIcon} />
                </div>
            )
        }else{
            return(
                <div>
                    <ReactPullLoad
                      downEnough={100}
                      action={this.state.action}
                      handleAction={this.handleAction}
                      hasMore={hasMore}
                      distanceBottom={100}>
                      <Search1/>
                      <div className='searchStyle'>
                          <MovieList movieList={this.state.searchMovieList} title={this.state.searchTitle} url={'fetchWillMovieList'}/>
                      </div>
                    </ReactPullLoad>

                </div>

            )
        }

    }
}

window.addEventListener('hashchange', () => {
    alert('onChange');
})

export default Search;
