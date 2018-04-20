import React from 'react'
import Header from './components/header'
import Player from "./page/player";

class Root extends React.Component {

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
                <Player></Player>
            </div>
        );
    }
}

export default Root;