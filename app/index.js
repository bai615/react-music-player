import React from "react";
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Header from './components/header'
import {MUSIC_LIST} from "./config/musiclist";
import MusicList from './page/musiclist'
import Player from "./page/player";
import PubSub from "pubsub-js";

import Root from './root'

// https://reacttraining.com/react-router/web/example/basic
// https://github.com/ReactTraining/react-router
// http://www.ruanyifeng.com/blog/2016/05/react_router.html

//*
class AppComponent extends React.Component {
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }

    playMusic(musicItem){
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');

        console.log(musicItem);

        this.setState({
            currentMusicItem: musicItem
        });
    }

    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if(type === 'next'){
            newIndex = (index + 1) % musicListLength;
        }else{
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }

    componentDidMount() {
        // 初始化jPlayer配置
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        // 播放歌曲
        this.playMusic(this.state.currentMusicItem);

        // 监听音乐播放完毕
        $('#player').bind($.jPlayer.event.ended, (e) => {
            console.log('play end');
            // 播放下一曲
            this.playNext();
        });

        // 订阅音乐删除事件
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            console.log('DELETE_MUSIC-ACT');
            console.log(musicItem);
            this.state.musicList = this.state.musicList.filter(item => {
                return item !== musicItem;
            });
            console.log(this.state.musicList);
            this.setState({
               musicList: this.state.musicList
            });
        });

        // 订阅音乐播放事件
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });

        // 订阅播放上一曲事件
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });

        // 订阅播放下一曲事件
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
    }

    componentWillUnmount() {
        // 解绑删除音乐订阅
        PubSub.unsubscribe('DELETE_MUSIC');
        // 解绑播放音乐订阅
        PubSub.unsubscribe('PLAY_MUSIC');
        // 解绑音乐播放结束监听
        $('#player').unbind($.jPlayer.event.ended);
        // 解绑播放上一曲订阅
        PubSub.unsubscribe('PLAY_PREV');
        // 解绑播放下一曲订阅
        PubSub.unsubscribe('PLAY_NEXT');
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home (Player)</Link>
                            </li>
                            <li>
                                <Link to="/list">Music List</Link>
                            </li>

                        </ul>

                        <hr />

                        <Route exact path="/" component={PlayMusicComponent} />
                        <Route path="/list" component={MusicListComponent} />

                    </div>
                </Router>
            </div>
        );
    }
}

class PlayMusicComponent extends React.Component {
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }

    render() {
        return (
            <div>
                <Player
                    currentMusicItem={this.state.currentMusicItem}
                >
                </Player>
            </div>
        );
    }
}

class MusicListComponent extends React.Component {
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }

    render() {
        return (
            <div>
                <MusicList
                    currentMusicItem={this.state.currentMusicItem}
                    musicList={this.state.musicList}
                >
                </MusicList>
            </div>
        );
    };
}

class RootComponent extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home (Player)</Link>
                            </li>
                            <li>
                                <Link to="/list">Music List</Link>
                            </li>

                        </ul>

                        <hr/>

                            <Route exact path="/" component={PlayMusicComponent}/>
                            <Route path="/list" component={MusicListComponent}/>

                    </div>
                </Router>
            </div>
        );
    }
}

var oBox = document.getElementById("box");
ReactDOM.render(<AppComponent/>, oBox);


/*
class MyContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.state.count++;
        this.setState({
            count: this.state.count++
        })
        console.log(this.state)
    }

    render() {
        const childrenWithProps = React.Children.map(
            this.props.children, child =>
                React.cloneElement(child,
                    {
                        parentState: this.state.count,
                        handleClick: this.handleClick
                    }
                ));
        return (
            <div style={{border: "1px solid blue"}}>
                <span>父容器:</span>
                {childrenWithProps}
            </div>
        )
    }
}

class MySub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
    }

    render() {
        return (
            <div style={{margin: "15px", border: "1px solid red"}}>
                子元素:{this.props.subInfo}
                <br/>
                父组件属性count值: {this.props.parentState}
                <br/>
                <span onClick={() => this.props.handleClick()}
                      style={{
                          display: "inline-block",
                          padding: "3px 5px",
                          color: "#ffffff",
                          background: "green",
                          borderRadius: "3px",
                          cursor: "pointer"
                      }}
                >click me</span>
            </div>
        )
    }
}

ReactDOM.render(
    (
        <MyContainer>
            <MySub subInfo={"1"}/>
            <MySub subInfo={"2"}/>
        </MyContainer>
    )
    , document.getElementById('box'))

*/

/*
class MyContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.state.count++;
        this.setState({
            count: this.state.count++
        })
        console.log(this.state)
    }

    render() {
        const childrenWithProps = React.Children.map(
            this.props.children, child =>
                React.cloneElement(child,
                    {
                        parentState: this.state.count,
                        handleClick: this.handleClick
                    }
                ));
        return (
            <div style={{border: "1px solid blue"}}>
                <span>父容器:</span>
                {childrenWithProps}
            </div>
        )
    }
}

class MySub extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
    }

    render() {
        return (
            <div style={{margin: "15px", border: "1px solid red"}}>
                子元素-1:
                <br/>
                父组件属性count值-1: {this.props.parentState}
                <br/>
                <span onClick={() => this.props.handleClick()}
                      style={{
                          display: "inline-block",
                          padding: "3px 5px",
                          color: "#ffffff",
                          background: "green",
                          borderRadius: "3px",
                          cursor: "pointer"
                      }}
                >click me</span>
            </div>
        )
    }
}

class MySub2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
    }

    render() {
        return (
            <div style={{margin: "15px", border: "1px solid red"}}>
                子元素-2:
                <br/>
                父组件属性count值-2: {this.props.parentState}
                <br/>
                <span onClick={() => this.props.handleClick()}
                      style={{
                          display: "inline-block",
                          padding: "3px 5px",
                          color: "#ffffff",
                          background: "green",
                          borderRadius: "3px",
                          cursor: "pointer"
                      }}
                >click me</span>
            </div>
        )
    }
}

ReactDOM.render(
    (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home (Player)</Link>
                    </li>
                    <li>
                        <Link to="/list">Music List</Link>
                    </li>

                </ul>

                <hr />

                <MyContainer>
                    <Route exact={true} path="/" component={MySub}/>
                    <Route path="/list" component={MySub2}/>
                </MyContainer>
            </div>
        </Router>
    )
    , document.getElementById('box'))
*/

/*
// 单个页面音乐播放器
import SinglePageMusic from "./singlePageMusic/singlepagemusic";

var oBox = document.getElementById("box");
ReactDOM.render(<SinglePageMusic/>, oBox);
//*/