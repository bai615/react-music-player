import React from 'react'
import Header from './components/header'
import Progress from './components/progress'

class Root extends React.Component {

    constructor(){
        super();
        this.state = {
            progress:'-',// 默认进度条数据
            duration:null // 音频总时间
        }

        this.progressChangeHandler = this.progressChangeHandler.bind(this);
    }
    componentDidMount(){
        $('#player').jPlayer({
            ready:function () {
                $(this).jPlayer('setMedia',{
                    mp3:'http://demo.bbs.com/gequ.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            wmode:'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            this.state.duration = e.jPlayer.status.duration;
            this.setState({
                // progress:Math.round(e.jPlayer.status.currentTime)
                progress:e.jPlayer.status.currentPercentAbsolute
            });
        })
    }
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    progressChangeHandler(progress){
        // console.log('total :', this.state.duration);
        // console.log('from root widget', progress);
        $('#player').jPlayer('play', this.state.duration * progress);
    }
    render() {
        return (
            <div>
                <Header/>
                <Progress
                    progress={this.state.progress}
                    onProgressChange={this.progressChangeHandler}
                    barColor="#ff0000"
                ></Progress>
            </div>
        );
    }
}

export default Root;