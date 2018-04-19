import React from 'react'

class Progress extends React.Component {
    render() {
        return (
            <div className="component-progress row">
                { this.props.progress }s
            </div>
        );
    }
}

export default Progress;