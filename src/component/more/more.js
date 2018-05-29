import React, { Component } from 'react';
import './more.css';
import MovieList from '../../subcomponents/MovieList/MovieList';
import Search from '../../subcomponents/Search/Search';

import server from '../../js/server';


// 导入ant design
import { Spin, Icon } from 'antd';
import 'antd/dist/antd.css';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class more extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            movieList: [],
            isLoading: true
        }
        this.getMovieList = this.getMovieList.bind(this);
    }

    getMovieList(){

        const methodName = this.props.match.params.url;
        server[methodName]('get',{start:0,count:20}).then((result) => {
            this.setState(
                {
                    title: result.data.title,
                    movieList: result.data.subjects,
                    isLoading: false
                }
            )
        })

    }



    componentWillMount(){
        this.getMovieList();
    }
    render(){
       if(!this.state.isLoading){
           return (
               <div>
                    <Search />
                    <div className='moreStyle'>
                        <MovieList title={this.state.title} movieList={this.state.movieList}/>
                    </div>
               </div>
           )
       }else{
           return (
               <div>
                   <Spin indicator={antIcon} />
               </div>
           )
       }
    }
}

export default more;
