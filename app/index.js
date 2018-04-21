import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/header'
import {MUSIC_LIST} from "./config/musiclist";
import MusicList from './page/musiclist'
import Player from "./page/player";

// https://reacttraining.com/react-router/web/example/basic
// https://github.com/ReactTraining/react-router
// http://www.ruanyifeng.com/blog/2016/05/react_router.html

class RootComponent extends React.Component{
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    render(){
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

                    <hr />

                    <Route exact path="/" component={PlayMusicComponent} />
                    <Route path="/list" component={MusicListComponent} />

                </div>
            </Router>
            </div>
        );
    }
}

class PlayMusicComponent extends React.Component{
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }
    render(){
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

class MusicListComponent extends React.Component{
    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            musicList: MUSIC_LIST, // 播放列表
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }
    }
    render(){
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

var oBox = document.getElementById("box");
ReactDOM.render(<RootComponent/>, oBox);
