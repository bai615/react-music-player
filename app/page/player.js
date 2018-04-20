import React from 'react'
import Progress from '../components/progress'

class Player extends React.Component {

    constructor() {
        super();
        this.state = {
            progress: '-',// 初始化进度条数据
            duration: null // 音频总时间
        }

        this.progressChangeHandler = this.progressChangeHandler.bind(this);
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.state.duration = e.jPlayer.status.duration;
            this.setState({
                // progress:Math.round(e.jPlayer.status.currentTime)
                progress: e.jPlayer.status.currentPercentAbsolute
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

    render() {
        return (
            <div>
                <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler}
                    barColor="#ff0000"
                ></Progress>
            </div>
        );
    }
}

export default Player;