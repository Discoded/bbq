import React from 'react'
import { Card } from '@material-ui/core';
import infograph from '../assets/smoking-times-and-temps-infographic.jpg';

const PostList = () => {
    const divStyle = {
        margin: "2rem"
    }
    return <Card>
        <Card style={divStyle}>
            <img src={infograph}/>
        </Card>
    </Card>
}

export default PostList