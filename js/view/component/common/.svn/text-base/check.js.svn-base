/**
 * Created by Galaxy065 on 2017/5/12.
 */
import React from "react";
import Style from "./css/check.css";

export default class Check extends React.Component{
    constructor(props){
        super(props)
    }

    setChecked = () => {
        this.props.handle();
    }

    render() {
        return (
            <div className={"flex flex-row flex-start align-center"}>
                <label className="flex flex-row flex-start align-center" onClick={this.setChecked}>
                    <div className={Style.choose}>
                        {
                            this.props.isChecked ? <div className={Style.check}></div> : ""
                        }
                    </div>
                    {
                        this.props.label ? <p>7天内自动登录</p> : ""
                    }
                </label>
            </div>
            )
    }
}
