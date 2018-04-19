import React from 'react'
import './progress.less'

class Progress extends React.Component {
    render() {
        return (
            <div className="component-progress row">
                <div className="progress" style={{width: `${this.props.progress}%`}}></div>
            </div>
        );
    }
}

export default Progress;