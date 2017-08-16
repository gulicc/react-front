/**
 * Created by Galaxy065 on 2017/5/24.
 */
import React from "react";
import { InfoContent } from "../common/infoArea";
import { FormItem } from "../common/formArea";
import {Input, Check, Need, TextArea} from "../common/defaultInput";
import { FormButton } from "../common/defaultButton";
import { Select } from 'antd';

import TagsAction from "../../../store/tagsAction";

export class TagDetail extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div style={{padding: "15px 0", backgroundColor: "#ffffff"}}>
                <InfoContent title="标签名称：" value={this.props.data.tag_name} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="标签说明：" value={this.props.data.tag_detail} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="适用范围：" value={this.props.data.tagtyp_name} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="被标记数：" value={this.props.data.tag_counter} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="创建人：" value={this.props.data.platform_personname} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
            </div>
        )
    }
}

export class TagModify extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tagid: this.props.data.tag_id,
            tagname: this.props.data.tag_name,
            tagdetail: this.props.data.tag_detail,
            tagtype: this.props.data.tagtyp_id,
            typeData: []
        }
    }

    componentDidMount = () => {
        TagsAction.queryTagTypes((data)=>{
            this.setState({
                typeData: data
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeType = (value) => {
        this.setState({
            tagtype: value
        })
    }

    changeOrg = (value) => {
        this.setState({
            mborg: value
        })
    }

    _submit = () => {
        TagsAction.updateTag(this.state,()=>{
            this.props.closeSlide();
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <div>
                <div style={{padding: "30px", backgroundColor: "#ffffff"}}>
                    <FormItem title="标签名称" titleWidth="110">
                        <Input name="tagname" value={this.state.tagname}  handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="适用范围" titleWidth="110" marginTop="26">
                        <Select defaultValue={this.props.data.tagtyp_name} getPopupContainer={() => document.getElementById('slide')} style={{ width: 236 }} onChange={this.changeType}>
                            {
                                this.state.typeData.map((tag,i)=>{
                                    return(
                                        <Option key={i} value={tag.id}>{tag.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem title="标签说明" titleWidth="110" marginTop="26">
                        <TextArea name="tagdetail" value={this.state.tagdetail}  handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="保存" handle={this._submit} style={{backgroundColor: "#ff530c"}}/>
                </div>
            </div>
        )
    }
}