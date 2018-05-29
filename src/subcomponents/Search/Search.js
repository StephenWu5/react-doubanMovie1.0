import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Search.css';
import searchImg from '../../img/search.png';
import PubSub from 'pubsub-js';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MovieName: '',
            listen: 'listening'
        }

        // this.startSearch = this.startSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.click = this.click.bind(this);
    }

    handleChange(event) {
      this.setState({MovieName: event.target.value});
    }

    //子组件中订阅
    click(){
        PubSub.publish('PubSubmessage',this.state.listen);
    }

    render(){
        return (
            <p>
                <input type='text' value={this.state.MovieName} placeholder='请输入搜索的内容' onChange={this.handleChange} ></input>
            <Link to={'/search/'+this.state.MovieName}><img src={searchImg}  alt='111' onClick={this.click}/></Link>
            </p>
        )

    }
}

export default Search;
