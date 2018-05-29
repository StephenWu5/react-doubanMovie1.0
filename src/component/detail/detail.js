import React, { Component } from 'react';
import './detail.css';
import server from '../../js/server.js';
import Search from '../../subcomponents/Search/Search';


// 导入ant design
import { Spin, Icon } from 'antd';
import 'antd/dist/antd.css';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail:{
                images:{
                    small:''
                }
            },
            targetHtml: '',
            isLoading: true
        }
    }

    get(){
        let movieId = this.props.match.params.movieId;
        server.fetchMovieDetail('get','',movieId).then((result)=>{
             var data = result.data;
             var targetHtml = '';
             data.countries.forEach(function(v){
                 targetHtml = targetHtml + v + ' / ';
             })
             data.genres.forEach(function(v){
                 targetHtml = targetHtml + v + ' / ';
             })
             data.directors.forEach(function(v,i){
                 if(i===0){
                     targetHtml = targetHtml + v.name + '(导演)/ ';
                 }
             })
             data.casts.forEach(function(v,i){
                 if(i === data.casts.length-1){
                     targetHtml = targetHtml + v.name;
                 }else{
                     targetHtml = targetHtml + v.name + ' / ';
                 }
             })
             this.setState({
                 detail: result.data,
                 targetHtml: targetHtml,
                 isLoading: false
             })
        })
    }

    componentWillMount(){
        this.get();
    }

    render(){
        var detail = this.state.detail;
        if(this.state.isLoading){
            return (
                <div>
                    <Spin indicator={antIcon} />
                </div>
            )
        }else{
            return (
                <div>
                    <Search />
                    <div className='detailStyle'>
                        <div className='wrapper'>
                            <h1><span>{detail.title}</span><span>{detail.original_title}</span></h1>
                            <img src={detail.images.small} alt='img'/>
                        <section className='location'>{this.state.targetHtml}</section>
                            <section className='subjectMark'>
                                <span>想看({detail.wish_count})</span>
                                <span>看过</span>
                            </section>
                            <h2>{detail.title}的剧情介绍</h2>
                            <div className='summary'>{detail.summary}</div>
                        </div>
                    </div>
                </div>

            )
        }

    }
}

export default Detail;
