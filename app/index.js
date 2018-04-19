import React from 'react';
import { render } from 'react-dom';
import Root from './root';


render(
    <Root/>,
    document.getElementById("box")
)

// class IndexComponent extends React.Component{
//     render(){
//         return <div><h1>hello world!!!</h1><Hello></Hello></div>
//     }
// }
//
// console.log('React version:', React.version);
//
// var oBox = document.getElementById("box");
// ReactDOM.render(<IndexComponent/>,oBox)