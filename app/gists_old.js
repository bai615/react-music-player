import React, { Component } from "react";

class GistsApp extends Component{

    state = {
        gists: null
    }

    componentDidMount(){
        fetch('https://api.github.com/gists')
            .then(res => res.json())
            .then(gists => {
                this.setState({ gists })
            })
    }

    render(){
        const { gists } = this.state
        return (
            <Root>
                <Sidebar>
                    {gists ? (
                        gists.map(gist => (
                            <SidebarItem key={gist.id}>
                                {gist.description || '[no description]'}
                            </SidebarItem>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </Sidebar>
                <Main>
                    <h1>Welcome</h1>
                </Main>
            </Root>
        )
    }
}

const Gist = ({ gist }) => {
    return (
        <div>
            <h1>{gist.description}</h1>
            <ul>
                {Object.keys(gist.files).map(key => (
                    <li>
                        <b>{key}</b>
                        <LoadFile url={gist.files[key].raw_url}>
                            {(text) => (
                                <pre>{text}</pre>
                            )}
                        </LoadFile>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Root = (props) => (
    <div style={{
        display: 'flex'
    }} {...props}/>
)

const Sidebar = (props) => (
    <div style={{
        width: '33vw',
        height: '100vh',
        overflow: 'auto',
        background: '#eee'
    }} {...props}/>
)

const SidebarItem = (props) => (
    <div style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        padding: '5px 10px'
    }} {...props}/>
)

const Main = (props) => (
    <div style={{
        flex: 1,
        height: '100vh',
        overflow: 'auto'
    }}>
        <div style={{ padding: '20px' }} {...props}/>
    </div>
)

class LoadFile extends Component{

}

export default GistsApp;