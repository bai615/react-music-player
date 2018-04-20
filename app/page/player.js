import React from 'react'
import Progress from '../components/progress'
import './player.less'

class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            volume: 0, // 初始化音量数据
            progress: 0,// 初始化进度条数据
            duration: null, // 音频总时间
        }

        this.progressChangeHandler = this.progressChangeHandler.bind(this);
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.state.duration = e.jPlayer.status.duration;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
            });
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    progressChangeHandler(progress) {
        // console.log('total :', this.state.duration);
        // console.log('from root widget', progress);
        $('#player').jPlayer('play', this.state.duration * progress);
    }

    changeVolumeHandler(progress){
        $('#player').jPlayer('volume', progress);
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption">我的私人音乐坊 &gt;</h1>
                <div className="mt20 row">
                    <div className="controller-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-2:00</div>
                            <div className="volume-controller">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    {/* 音量控制部分 */}
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor="#aaa"
                                    ></Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            {/* 播放进度部分 */}
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.progressChangeHandler}
                                barColor="#ff0000"
                            ></Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev"></i>
                                <i className="icon ml20 play"></i>
                                <i className="icon next ml20"></i>
                            </div>
                            <div className="-col-auto">
                                <i className="icon repeat-cycle"></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;