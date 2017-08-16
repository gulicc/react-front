/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import Style from "./css/tag.css";
import Shadow from "./shadow";
import { AddTag } from "./alertWindow";

import TagsAction from "../../../store/tagsAction";

export default class Tag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            init: this.props.init ? this.props.init : [],
            data: [],
            checkData: [],
            shadowStatus: false
        };
    }

    componentDidMount = () => {
        if(this.state.init.length) {
            TagsAction.listTags({type: this.props.type, page_cap: 0}, (count, data) => {
                let checkData = [];
                for(let i=0;i<this.state.init.length;i++){
                    for(let j=0;j<data.length;j++){
                        if(parseInt(this.state.init[i]) === parseInt(data[j].tag_id)){
                            checkData.push(data[j]);
                            break;
                        }
                    }
                }
                this.setState({
                    checkData: checkData
                })
            })
        }
    }

    submit = (checkData) => {
        let idData = [];
        this.setState({
            checkData: this.state.checkData.concat(checkData)
        },()=>{
            for(let i=0;i<this.state.checkData.length;i++){
                idData.push(this.state.checkData[i].tag_id);
            }
            this.props.handle(this.props.name,idData);
        });
        this.close();
    }

    deleteTag = (id) => {
        let checkData = this.state.checkData;
        let idData = [];
        for(let i=0;i<checkData.length;i++){
            if(parseInt(checkData[i].tag_id) === id){
                checkData.splice(i,1);
                break;
            }
        }
        this.setState({
            checkData: checkData
        },()=>{
            for(let i=0;i<this.state.checkData.length;i++){
                idData.push(this.state.checkData[i].tag_id);
            }
            this.props.handle(this.props.name,idData);
        })
    }

    add = () => {
        this.setState({
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    render() {
        return(
            <div className={Style.tag}>
                <div className={Style.list}>
                    {
                        this.state.checkData.map((datas,i) => {
                            return(
                                <TagItem key={i} id={datas.tag_id} tip={datas.tag_name} handle={this.deleteTag} />
                            )
                        })
                    }
                    <Add handle={this.add}/>
                </div>
                {
                    this.state.shadowStatus ? (
                        <AddTag type={this.props.type} checkData={this.state.checkData} closeHandle={this.close} submitHandle={this.submit} addNew={this.addNew} />
                    ) : ("")
                }
            </div>
        )
    }
}

class TagItem extends React.Component {
    constructor(props){
        super(props)
    }

    delete = () => {
        this.props.handle(this.props.id)
    }

    render() {
        return(
            <div className={"flex flex-column flex-center " + Style.item}>
                <div className={"flex flex-row flex-start align-center " + Style.tagItem}>
                    <span>{this.props.tip}</span>
                    <a onTouchTap={this.delete}></a>
                </div>
            </div>
        )
    }
}

class Add extends React.Component {
    constructor(props){
        super(props);
    }

    add = () => {
        this.props.handle();
    }

    render() {
        return(
            <div className={"flex flex-column flex-center " + Style.item}>
                <a className={Style.add} onTouchTap={this.add}></a>
            </div>
        )
    }
}