import React from 'react'
import Header from './components/header'
import Progress from './components/progress'

class Root extends React.Component {
    constructor(){
        super();
        this.state = {
            progress:'-'
        }
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
            this.setState({
                progress:Math.round(e.jPlayer.status.currentTime)
            });
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <Progress progress={this.state.progress}></Progress>
            </div>
        );
    }
}

export default Root;