import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// 导入ant design
import { Spin, Icon } from 'antd';
import 'antd/dist/antd.css';



const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
