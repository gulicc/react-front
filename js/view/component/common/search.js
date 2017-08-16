/**
 * Created by Galaxy065 on 2017/5/19.
 */
import React from "react";
import Style from "./css/search.css";
import Icon from "../common/defaultIcon";

export default class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: ""
        }
    }

    reset = () => {
        this.setState({
            name: ""
        })
    }

    input = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.handle(this.props.name,this.state.name);
    }

    render() {
        return(
            <form onSubmit={this.submit.bind(this)} className={"flex flex-row flex-start " + Style.search} style={this.props.areaStyle}>
                <input type="text" value={this.state.name} onChange={this.input.bind(this)} placeholder={this.props.placeholder} className="flex1"/>
                <button className={Style.button}>
                    <div className="flex flex-row flex-center align-center">
                        <Icon name="iconSearch" style={{marginRight: 14}}/>
                        <p>搜索</p>
                    </div>
                </button>
            </form>
        )
    }
}