import React,{Component} from 'react';
import ReactPullLoad,{ STATS } from 'react-pullload';

var cData = [1,2,3];

 class Loadmore extends Component{
  constructor(){
    super();
    this.state ={
      hasMore: true,
      data: cData,
      action: STATS.init,
      index: 1000 //loading more test time limit
    }
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

  handRefreshing = () =>{
    if(STATS.refreshing === this.state.action){
      return false
    }

    setTimeout(()=>{
      //refreshing complete
      this.setState({
        data: cData,
        hasMore: true,
        action: STATS.refreshed,
        index: 1000
      });
    }, 3000)

    this.setState({
      action: STATS.refreshing
    })
  }

  handLoadMore = () => {
    if(STATS.loading === this.state.action){
      return false
    }

    setTimeout(()=>{
      if(this.state.index === 0){
        this.setState({
          action: STATS.reset,
          hasMore: false
        });
      } else{
        this.setState({
          data: [...this.state.data, cData[0], cData[0]],
          action: STATS.reset,
          index: this.state.index - 1
        });
      }
    }, 3000)

    this.setState({
      action: STATS.loading
    })
  }

  render(){
    const {
      data,
      hasMore
    } = this.state

    const fixHeaderStyle = {
      position: "fixed",
      width: "100%",
      height: "50px",
      color: "#fff",
      lineHeight: "50px",
      backgroundColor: "#e24f37",
      left: 0,
      top: 0,
      textAlign: "center",
      zIndex: 1
    }

    return (
      <div>
        <div style={fixHeaderStyle}>
          fixed header
        </div>
        <ReactPullLoad
          downEnough={150}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          style={{paddingTop: 50}}
          distanceBottom={1000}>
          <ul className="test-ul">
            <button onClick={this.handRefreshing}>refreshing</button>
            <button onClick={this.handLoadMore}>loading more</button>
            {
              data.map( (str, index )=>{
                return <li key={index}><img src={str} alt=""/></li>
              })
            }
          </ul>
        </ReactPullLoad>
      </div>
    )
  }
}

export default Loadmore;
