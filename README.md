# 豆瓣电影
>  基于React-creat-app

## 运行
1. **项目的文件夹名更改为my-app2**;

1. cnpm i;(前提是安装了cnpm哈)

2. npm run start;
 
1. localhost:3000浏览器观看;

##路由传参的实现步奏
1. 在路由表中
```
<Route exact path="/more/:url" component={More} /> //这里写上url参数
```
1. html的标签中写上
```
return  <span><Link to={"/more/"+ props.url}>更多></Link></span>;
```
1. 在跳转后页面通过this.props.match.params.url来获取该参数
```
console.log(this.props.match.params.url,"1111props");
```
1. 最后两个是同一个组件,这样写是为了防止当电影搜索名称不存在时,路由不能跳转
```
<Router>
    <div>
        <div className='headerStyle'>
              <p><Link to="/">电影</Link></p>
        </div>
        <Route exact path="/" component={Index} />
        <Route exact path="/more/:url" component={More} />
        <Route exact path='/detail/:movieId' component={Detail} />
        <Route exact path='/search/:movieName' component={Search}/>
        <Route exact path='/search/' component={Search}/>
  </div>
</Router>
```

## 子组件传给父组件的方法PubSub.js实现:
- npm i pubsub-js --save

- 子组件中通过 `import PubSub from 'pubsub-js';` 引入
```
//子组件中订阅
click(){
    PubSub.publish('PubSubmessage',this.state.listen);
}
```

- 父组件中通过 import PubSub from 'pubsub-js'; 引入
```
//父组件中监听
componentWillMount(){
    this.get();
    this.state.pubsub_token = PubSub.subscribe('PubSubmessage',(topic,message) => {
        this.get();
   });
}
```

## react 下拉刷新上拉加载更多通用组件
- [参考这里](https://segmentfault.com/a/1190000008730840)

## 最后效果
![这是效果图](https://i.imgur.com/U3nKwxJ.gif)