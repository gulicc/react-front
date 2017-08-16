/**
 * Created by Galaxy065 on 2017/6/27.
 */
import React from "react";
import Style from "./css/searchTypes.css";
import { DatePicker } from "antd";

export default class SearchTimeRange extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start_time: "",
            end_time: ""
        }
    }

    getStartTime = (value,dateString) => {
        this.setState({
            start_time: value
        });
        this.props.handle("start_time",dateString);
    }

    getEndTime = (value,dateString) => {
        this.setState({
            end_time: value
        });
        this.props.handle("end_time",dateString);
    }

    reset = () => {
        this.setState({
            start_time: "",
            end_time: ""
        })
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.select} style={{marginTop: this.props.marginTop}}>
                <p className={Style.title} style={this.props.titleStyle}>{this.props.title}</p>
                <div className="flex flex-row flex-start align-center">
                    <DatePicker
                        value={this.state.start_time}
                        format="YYYY-MM-DD"
                        allowClear={true}
                        onChange={this.getStartTime}
                        style={{width: 124}}
                    />
                    <p style={{margin: "0 8px", color: "#dadbde"}}>-</p>
                    <DatePicker
                        value={this.state.end_time}
                        format="YYYY-MM-DD"
                        allowClear={true}
                        onChange={this.getEndTime}
                        style={{width: 124}}
                    />
                </div>
            </div>
        )
    }
}