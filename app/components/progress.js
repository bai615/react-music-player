import React from 'react'
import './progress.less'

class Progress extends React.Component {
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
        console.log(progress);
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