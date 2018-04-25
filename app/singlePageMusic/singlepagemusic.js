import React from "react";
import Header from '../components/header'
import {MUSIC_LIST} from "../config/musiclist";
import MusicList from '../page/musiclist'
import Player from "./player";
import PubSub from "pubsub-js";

class App extends React.Component {
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

        // 订阅音乐删除
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.state.musicList = this.state.musicList.filter(item => {
                return item !== musicItem;
            });
            this.setState({
                musicList: this.state.musicList
            });
        });

        // 订阅音乐播放
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });
    }

    componentWillUnmount() {
        // 解绑删除音乐订阅
        PubSub.unsubscribe('DELETE_MUSIC');
        // 解绑播放音乐订阅
        PubSub.unsubscribe('PLAY_MUSIC');
        // 解绑音乐播放结束监听
        $('#player').unbind($.jPlayer.event.ended);
    }

    render() {
        const childrenWithProps = React.Children.map(
            this.props.children, child =>
                React.cloneElement(child,
                    {
                        musicList: this.state.musicList, // 播放列表
                        currentMusicItem: this.state.currentMusicItem // 当前播放
                    }
                ));
        return (
            <div>
                {childrenWithProps}
            </div>
        )
    }
}

class SinglePageMusic extends React.Component {
    render() {

        return (
            <div>
                <Header/>
                <App>
                    <Player/>
                    <MusicList/>
                </App>
            </div>
        )
    };
}

export default SinglePageMusic;