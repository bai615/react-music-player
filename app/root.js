import React from 'react'
import Header from './components/header'
import {MUSIC_LIST} from './config/musiclist'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PubSub from "pubsub-js";
import PlayerPage from './page/player';
import listPage from './page/musiclist';

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
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            console.log('DELETE_MUSIC-ACT');
            console.log(musicItem);
            // this.setState({
            //     musicList: this.state.musicList.filter(item => {
            //         console.log('====================================')
            //         console.log(item)
            //         console.log(musicItem)
            //         console.log(item !== musicItem)
            //         console.log('====================================')
            //         return item !== musicItem;
            //     })
            // });
            this.state.musicList = this.state.musicList.filter(item => {
                return item !== musicItem;
            });
            console.log(this.state.musicList);
        });
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {

        });
    }

    componentWillUnmount(){
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_MUSIC');
    }

    render() {
        // return (
        //     <div>
        //         <Header/>
        //         {React.cloneElement(this.props.children, this.state)}
        //     </div>
        // );
        const currentState = this.state;
        const newChildren = React.Children.map(this.props.children, child =>
                React.cloneElement(
                    child,
                    {
                        currentMusicItem: currentState.currentMusicItem,
                        musicList: currentState.musicList,
                    }
                ));

        return (
            <div>
                <Header/>
                {newChildren}
            </div>
        );

    }
}

class Root extends React.Component {

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

                        <hr />

                        <App>
                            <Route path="/" component={PlayerPage}/>
                            <Route path="/list" component={listPage} />
                        </App>

                    </div>
                </Router>
            </div>
        );
    }
}

export default Root;