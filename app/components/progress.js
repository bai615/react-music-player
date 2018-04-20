import React from 'react'
import './progress.less'

class Progress extends React.Component {
    constructor(){
        super();

        // ES6 类中函数必须手动绑定
        this.changeProgress = this.changeProgress.bind(this);
    }
    changeProgress(e) {
        // console.log(e.clientX);
        // console.log(this.refs.progressBar);
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
        // console.log(progress);
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render() {
        return (
            <div className="component-progress row" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width: `${this.props.progress}%`}}></div>
            </div>
        );
    }
}

export default Progress;