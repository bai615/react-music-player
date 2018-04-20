import React from 'react'
import Header from './components/header'
import Player from "./page/player";
import { MUSIC_LIST } from './config/musiclist'

class Root extends React.Component {

    constructor() {
        super();
        console.log(MUSIC_LIST);
        this.state = {
            currentMusicItem: MUSIC_LIST[0] // 当前播放
        }

    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://demo.bbs.com/gequ.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <Player
                    currentMusicItem={this.state.currentMusicItem}
                ></Player>
            </div>
        );
    }
}

export default Root;