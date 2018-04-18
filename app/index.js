import React from 'react';
import ReactDOM from 'react-dom';
import styles from './css/index.css';
import './index.less';
import Hello from './components/hello';

class IndexComponent extends React.Component{
    render(){
        return <div><h1>hello world!!!</h1><Hello></Hello></div>
    }
}

console.log('React version:', React.version);

var oBox = document.getElementById("box");
ReactDOM.render(<IndexComponent/>,oBox)