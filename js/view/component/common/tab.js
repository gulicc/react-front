/**
 * Created by Galaxy065 on 2017/5/15.
 */
import React from "react";
import Style from "./css/tab.css"

export default class Tab extends React.Component {
    constructor(props){
        super(props)
    }

    changeTab = (value) => {
        let tabData = this.props.tabData;
        for(let i=0;i<tabData.length;i++){
            tabData[i].active = false;
        }
        tabData[value].active = true;
        this.props.handle(value,tabData);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-center " + Style.tab} style={this.props.areaStyle}>
                {
                    this.props.tabData.map((tabs,i) => {
                        return(
                            <a className={tabs.active ? Style.active : ""} style={{width: tabs.width}} onTouchTap={() => {this.changeTab(i)}} key={i}>{tabs.name}</a>
                        )
                    })
                }
                {this.props.children}
            </div>
        )
    }
}