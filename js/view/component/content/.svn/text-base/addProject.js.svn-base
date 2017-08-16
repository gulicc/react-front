/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import { History } from "react-router-dom";
import { FormArea, FormItem, FormSubmit, FormUpload, FormRate, FormQuestion, FormFile } from "../common/formArea";
import { Input, TextArea, RadioTip, CheckTip, Need } from "../common/defaultInput";
import Tag from "../common/tag";
import { AutoCompleteOrg, AutoCompleteEnterprise, AutoCompleteStaff } from "../common/autoComplete";
import { DatePicker } from "antd";

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import ProjectAction from "../../../store/projectAction";

export default class AddProject extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //防止重复提交
            submitStatus: true,
            //基本信息
            pname: "",
            phase: "",
            industrys: [],
            tags: [],
            org_id: "",
            org_name: "",
            pnote: "",
            //项目来源
            psource: "",
            recmndins: "",
            recmndinsid: "",
            recmnd: "",
            interrecmnd: "",
            interrecmndid: "",
            leader: "",
            leaderid: "",
            //融资方案
            finilimt: "",
            offvalue: "",
            finvalue: "",
            //拜访记录
            title: "",
            stime: "",
            etime: "",
            type: "",
            way: "",
            directorName: Utils.getLoginData().platform_personname,
            director: Utils.getLoginData().platform_id,
            obj_investors: [],
            obj_projects: [],
            obj_staffs: [],
            site: "",
            files: [],
            record: "",
            remark: "",
            //初步评定
            project_score: 0,
            project_evalphase: "初评",
            project_evallevel: 0,
            treat_id: "",
            //相关附件
            fileData: []
        }
    }

    componentDidMount = () => {
        this.handle("org_id",this.props.org_id);
        this.handle("org_name",this.props.org_name);
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    getActive = (date,dateString) => {
        this.handle("stime",dateString);
    }

    changeEnterprise = (obj) => {
        this.handle("org_id",obj.id);
    }

    changeSource = (name,data) => {
        this.setState({
            [name]: data,
            recmndins: "",
            recmndinsid: "",
            recmnd: "",
            interrecmnd: "",
            interrecmndid: "",
        })
    }

    changeOrg= (obj) => {
        this.handle("recmndins",obj.name);
        this.handle("recmndinsid",obj.id);
    }

    changeInterrecmnd = (obj) => {
        this.handle("interrecmnd",obj.name);
        this.handle("interrecmndid",obj.id);
    }

    changeLeader = (obj) => {
        this.handle("leader",obj.name);
        this.handle("leaderid",obj.id);
    }

    changeDirector = (obj) => {
        this.handle("director",obj.id);
    }

    rate = (value,callback) => {
        this.setState({
            project_evallevel: value
        },() => {
            callback
        })
    }

    getFiles = (name,fileId) => {
        let files = this.state.files;
        files.push(fileId);
        this.handle(name,files);
    }

    _submit = (e) => {
        e.preventDefault();
        if(this.state.submitStatus){
            this.setState({
                submitStatus: false
            })
        }else{
            return false
        }
        let fileData = [];
        let files = this.refs.files.state.files;
        if(files[files.length - 1].fileStatus === "loading"){
            layer.open({
                content: '请等待附件上传完成或删除该附件',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            this.setState({
                submitStatus: true
            });
            return false;
        }
        for(let i=0;i<files.length;i++){
            if(files[i].id){
                fileData.push({
                    id: files[i].id,
                    desc: files[i].desc
                });
            }
        }
        this.setState({
            fileData: fileData
        },()=>{
            ProjectAction.newProject(this.state,(data)=>{
                this.props.complete();
            },()=>{
                this.setState({
                    submitStatus: true
                })
            });
        })
    }

    render() {
        return(
            <form onSubmit={this._submit.bind(this)}>
                <FormArea title="基本信息"  paddingBottom="30">
                    <FormItem title="项目名称" titleWidth="136" marginTop="24">
                        <Input name="pname" value={this.state.pname} handle={this.handle} style={{width: 236}} need={true} />
                    </FormItem>
                    <FormItem title="轮次:" titleWidth="50" marginTop="26">
                        <RadioTip name="phase" getData="queryInvestRounds" handle={this.handle} need={true} />
                    </FormItem>
                    <FormItem title="领域:" titleWidth="50" marginTop="16">
                        <CheckTip name="industrys" getData="queryIndustries" handle={this.handle} />
                    </FormItem>
                    <FormItem title="企业名称" titleWidth="136" marginTop="26">
                        <AutoCompleteEnterprise value={this.state.org_name} handle={this.changeEnterprise} />
                        <Need />
                    </FormItem>
                    <FormItem title="标签" titleWidth="136" marginTop="26">
                        <Tag name="tags" type={[1]} handle={this.handle} />
                    </FormItem>
                    <FormItem title="备注" titleWidth="136" marginTop="26">
                        <TextArea name="pnote" value={this.state.pnote} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                </FormArea>
                <FormArea title="项目来源" marginTop="10"  paddingBottom="24">
                    <FormItem title="渠道:" titleWidth="50" marginTop="26">
                        <RadioTip name="psource" getData="listProjectSources" handle={this.changeSource} />
                    </FormItem>
                    {
                        (()=>{
                            switch (parseInt(this.state.psource)){
                                case 1:
                                    return (
                                        <FormItem title="内部推荐人" titleWidth="136" marginTop="26">
                                            <AutoCompleteStaff handle={this.changeInterrecmnd} />
                                        </FormItem>
                                    )
                                    break;
                                case 2:
                                    return (
                                        <FormItem title="外部推荐机构" titleWidth="136" marginTop="26">
                                            <AutoCompleteOrg handle={this.changeOrg} />
                                        </FormItem>
                                    )
                                    break;
                                case 3:
                                    return (
                                        <FormItem title="外部推荐人" titleWidth="136" marginTop="26">
                                            <Input name="recmnd" value={this.state.recmnd} handle={this.handle} style={{width: 236}} />
                                        </FormItem>
                                    )
                                    break;
                            }
                        })()
                    }
                    <FormItem title="项目经理" titleWidth="136" marginTop="26">
                        <AutoCompleteStaff handle={this.changeLeader} />
                    </FormItem>
                </FormArea>
                <FormArea title="融资方案" marginTop="10"  paddingBottom="29">
                    <div className="flex flex-row flex-between" style={{marginTop: 24, paddingRight: 64}}>
                        <FormItem title="拟融资金额" titleWidth="100">
                            <Input name="finilimt" value={this.state.finilimt} handle={this.handle} filter={Filter.checkNum} style={{width: 110}} tip="万元"/>
                        </FormItem>
                        <FormItem title="拟投后估值" titleWidth="100">
                            <Input name="finvalue" value={this.state.finvalue} handle={this.handle} filter={Filter.checkNum} style={{width: 110}} tip="万元"/>
                        </FormItem>
                        <FormItem title="可谈空间预计" titleWidth="112">
                            <Input name="offvalue" value={this.state.offvalue} handle={this.handle} filter={Filter.checkPercent} style={{width: 110}} tip={<div><span>%</span><span style={{marginLeft: 16}}>Off</span></div>}/>
                        </FormItem>
                    </div>
                </FormArea>
                <FormArea title="拜访记录" marginTop="10"  paddingBottom="28">
                    <FormItem title="活动时间" titleWidth="106" marginTop="24">
                        <DatePicker
                            showTime={{format: "HH:mm"}}
                            format="YYYY-MM-DD HH:mm"
                            allowClear={false}
                            onChange={this.getActive}
                            style={{width: 236}}
                        />
                    </FormItem>
                    <FormItem title="活动方式" titleWidth="91" marginTop="26">
                        <RadioTip name="way" getData="listActivityWays" handle={this.handle} />
                    </FormItem>
                    <FormItem title="活动负责人" titleWidth="106" marginTop="26">
                        <AutoCompleteStaff value={this.state.directorName} handle={this.changeDirector} />
                    </FormItem>
                    <FormItem title="地点" titleWidth="106" marginTop="26">
                        <Input name="site" value={this.state.site} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="会议纪要" titleWidth="106" marginTop="26">
                        <TextArea name="record" value={this.state.record} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="备注" titleWidth="106" marginTop="26">
                        <TextArea name="remark" value={this.state.remark} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="会议附件" titleWidth="106" marginTop="26">
                        <FormUpload name="files" handle={this.getFiles} />
                    </FormItem>
                </FormArea>
                <FormArea title="初步评定" marginTop="10"  paddingBottom="22">
                    <FormItem title="问卷得分" titleWidth="106" marginTop="15">
                        <FormQuestion score={this.state.project_score} handle={this.handle}/>
                    </FormItem>
                    <FormItem title="录入人建议" titleWidth="91" marginTop="26">
                        <RadioTip name="treat_id" getData="queryTreats" handle={this.handle} />
                    </FormItem>
                    <FormItem title="评级(初评)" titleWidth="106" marginTop="26">
                        <FormRate isEdit={false} rate={this.state.project_evallevel} handle={this.rate} />
                    </FormItem>
                </FormArea>
                <FormArea title="相关附件" marginTop="10"  paddingBottom="26">
                    <FormFile marginTop="16" ref="files" />
                </FormArea>
                <FormSubmit value="提交" />
            </form>
        )
    }
}