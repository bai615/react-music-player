import React from 'react'
import './musiclistitem.less'
import PubSub from 'pubsub-js';

class MusicListItem extends React.Component {

    playMusic(musicItem){
        // console.log('PLAY_MUSIC');
        PubSub.publish('PLAY_MUSIC', musicItem);
    }

    deleteMusic(musicItem, e){
        e.stopPropagation();// 禁止冒泡事件
        // console.log('DELETE_MUSIC');
        PubSub.publish('DELETE_MUSIC', musicItem);
    }

    render() {
        let musicItem = this.props.musicItem;

        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        );
    }
}

export default MusicListItem;