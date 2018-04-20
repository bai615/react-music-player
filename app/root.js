import React from 'react'
import Header from './components/header'
import Player from "./page/player";
import {MUSIC_LIST} from './config/musiclist'
import MusicList from './page/musiclist'
import {Route, Router, Switch} from 'react-router'


class App extends React.Component {
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
                // $(this).jPlayer('setMedia', {
                //     mp3: 'http://demo.bbs.com/gequ.mp3'
                // }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    render() {
        return (
            <div>
                <Header/>
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}

class Root extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={App}></Route>
                    <Route path='/list' component={MusicList}></Route>
                </Switch>
            </Router>
        );
    }
}

export default Root;