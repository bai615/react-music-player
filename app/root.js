import React from 'react'
import Header from './components/header'
import Player from "./page/player";
import { MUSIC_LIST } from './config/musiclist'
import MusicList from './page/musiclist'

class Root extends React.Component {

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
                <MusicList
                    currentMusicItem={this.state.currentMusicItem}
                    musicList={this.state.musicList}
                ></MusicList>
            </div>
        );
    }
}

export default Root;