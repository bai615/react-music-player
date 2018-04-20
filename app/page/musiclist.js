import React from 'react'
import MusicListItem from '../components/musiclistitem'

class MusicList extends React.Component {
    render() {
        // 节点内容
        let listEle = null;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus={item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={item}
                >
                    {item.title}
                </MusicListItem>
            );
        });

        return (
            <ul>
                { listEle }
            </ul>
        );
    }
}

export default MusicList;