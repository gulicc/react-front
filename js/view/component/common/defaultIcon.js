/**
 * Created by Galaxy065 on 2017/5/15.
 */
import React from "react";
import Style from "./css/defaultIcon.css";

export default class Icon extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            className: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            className: this.props.name
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            className: nextProps.name
        })
    }

    render() {
        return (
            <span className={Style[this.state.className]} style={this.props.style}></span>
        )
    }
}