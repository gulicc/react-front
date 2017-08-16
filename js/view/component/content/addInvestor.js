/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import { History } from "react-router-dom";
import { FormArea, FormItem, FormSubmit, FormUpload } from "../common/formArea";
import {Input, Check, TabSelect, TextArea, RadioTip, CheckTip, Need} from "../common/defaultInput";
import Tag from "../common/tag";
import { AutoCompleteOrg, AutoCompleteStaff } from "../common/autoComplete";
import { DatePicker, Upload } from "antd";

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import InvestorAction from "../../../store/investorAction";

const Style = {
    input: {
        marginBottom: -1,
        marginLeft: 10,
        width: 90,
        border: "none",
        borderBottom: "1px solid #dadbde",
        outline: "none"
    }
};

export default class AddInvestor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //防止重复提交
            submitStatus: true,
            imageUrl: '',
            name: "",
            name_en: "",
            mobile: "",
            sex: "M",
            invest_types: [],
            is_org: "Y",
            org_id: "",
            org_name: "",
            org_department: "",
            org_job: "",
            internal_power: "",
            preffered_fields: [],
            preffered_rounds: [],
            head_portrait: "",
            wechat: "",
            qq: "",
            email: "",
            birthday: "",
            address: "",
            introduction: "",
            act_time: "",
            act_director: Utils.getLoginData().platform_id,
            act_director_name: Utils.getLoginData().platform_personname,
            act_way: "",
            act_site: "",
            act_content: "",
            act_remark: "",
            act_files: [],
            has: false,
            has_connections: "",
            customer_manager: "",
            remark: "",
            tags: [],
            is_online: "N",
            source_type: 5,
            single_invest_size_min: "",
            single_invest_size_max: ""
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeIsOrg = (value) => {
        this.setState({
            is_org: value,
            org_id: "",
            org_name: "",
            org_department: "",
            org_job: "",
            internal_power: "",
        })
    }

    changeOrg = (obj) => {
        this.handle("org_id",obj.id);
        this.handle("org_name",obj.name);
    }

    getBirth = (date,dateString) => {
        this.handle("birthday",dateString);
    }

    getActive = (date,dateString) => {
        this.handle("act_time",dateString);
    }

    changeDirector = (obj) => {
        this.handle("act_director",obj.id);
    }

    changeManager = (obj) => {
        this.handle("customer_manager",obj.id);
    }

    _input = (e) => {
        this.handle("has_connections",e.target.value);
    }

    getFiles = (name,fileId) => {
        if(fileId === "loading"){
            this.handle(name,fileId);
        }else{
            let files = [];
            files.push(fileId);
            this.handle(name,files);
        }
    }

    uploadImage = (info) => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            this.setState({
                head_portrait: info.file.response.data.id
            })
        }
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
        InvestorAction.createInvestor(this.state,(data)=>{
            this.props.complete();
        },()=>{
            this.setState({
                submitStatus: true
            })
        });
    }

    render() {
        const sourceType = [
            {
                name: "个人关系",
                isChecked: true,
                params: 5
            },
            {
                name: "活动现场",
                params: 6
            }
        ];
        const actWay = [
            {
                id: 1,
                name: "公司"
            },
            {
                id: 2,
                name: "外出"
            },
            {
                id: 3,
                name: "电话"
            },
            {
                id: 4,
                name: "微信"
            }
        ];
        return(
            <form onSubmit={this._submit.bind(this)}>
                <FormArea title="基本信息"  paddingBottom="18">
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                        <FormItem title="姓名" titleWidth="136">
                            <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                        </FormItem>
                        <FormItem title="英文名" titleWidth="134">
                            <Input name="name_en" value={this.state.name_en} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <FormItem title="性别" titleWidth="136" marginTop="26">
                        <Check isChecked={this.state.sex === "M"} handle={() => {this.handle("sex","M")}}>
                            <p style={{marginLeft: 12}}>男</p>
                        </Check>
                        <Check isChecked={this.state.sex === "F"} handle={() => {this.handle("sex","F")}} style={{marginLeft: 40}}>
                            <p style={{marginLeft: 12}}>女</p>
                        </Check>
                    </FormItem>
                    <FormItem title="手机" titleWidth="136" marginTop="26">
                        <Input name="mobile" value={this.state.mobile} handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="投资人类型" titleWidth="136" marginTop="26">
                        <CheckTip name="invest_types" getData="queryInvestorTypes" handle={this.handle} />
                    </FormItem>
                    <FormItem title="投资机构" titleWidth="136" marginTop="26">
                        <AutoCompleteOrg handle={this.changeOrg} disabled={this.state.is_org === "N"} />
                        <Need />
                        <Check isChecked={this.state.is_org === "N"} handle={() => {this.changeIsOrg(this.state.is_org === "Y" ? "N" : "Y")}} style={{marginLeft: 60}}>
                            <p style={{marginLeft: 12}}>个人</p>
                        </Check>
                    </FormItem>
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 30}}>
                        <FormItem title="部门名称" titleWidth="136">
                            <Input name="org_department" value={this.state.org_department} handle={this.handle} style={{width: 236}} disabled={this.state.is_org === "N"} />
                        </FormItem>
                        <FormItem title="职位" titleWidth="58">
                            <Input name="org_job" value={this.state.org_job} handle={this.handle} style={{width: 156}} disabled={this.state.is_org === "N"} />
                        </FormItem>
                        <FormItem title="内部影响力" titleWidth="98">
                            <Check isChecked={this.state.internal_power === "强"} handle={() => {this.handle("internal_power","强")}} disabled={this.state.is_org === "N"}>
                                <p style={{marginLeft: 12}}>强</p>
                            </Check>
                            <Check isChecked={this.state.internal_power === "中"} handle={() => {this.handle("internal_power","中")}} disabled={this.state.is_org === "N"} style={{marginLeft: 40}}>
                                <p style={{marginLeft: 12}}>中</p>
                            </Check>
                            <Check isChecked={this.state.internal_power === "弱"} handle={() => {this.handle("internal_power","弱")}} disabled={this.state.is_org === "N"} style={{marginLeft: 40}}>
                                <p style={{marginLeft: 12}}>弱</p>
                            </Check>
                        </FormItem>
                    </div>
                    <FormItem title="关注领域:" titleWidth="75" marginTop="26">
                        <CheckTip name="preffered_fields" getData="queryIndustries" handle={this.handle} />
                    </FormItem>
                    <FormItem title="关注阶段:" titleWidth="75" marginTop="16">
                        <CheckTip name="preffered_rounds" getData="queryInvestRounds" handle={this.handle} />
                    </FormItem>
                    <FormItem title="单笔投资规模" titleWidth="120" marginTop="16">
                        <Input name="single_invest_size_min" value={this.state.single_invest_size_min} filter={Filter.checkNum} handle={this.handle} style={{width: 110}} />
                        <p style={{margin: "0 8px", color: "#dadbde"}}>-</p>
                        <Input name="single_invest_size_max" value={this.state.single_invest_size_max} filter={Filter.checkNum} handle={this.handle} style={{width: 110}} />
                        <p style={{marginLeft: 10}}>万元</p>
                    </FormItem>
                </FormArea>
                <FormArea title="个人附加信息" marginTop="10"  paddingBottom="24">
                    <FormItem title="头像" titleWidth="136" marginTop="26">
                        <Upload
                            className="avatar-uploader"
                            name="userfile"
                            showUploadList={false}
                            action={Utils.url + "UploadFile.php"}
                            beforeUpload={Utils.beforeUpload}
                            onChange={this.uploadImage}
                        >
                            {
                                this.state.imageUrl ?
                                    <img src={this.state.imageUrl} alt="" className="avatar" /> :
                                    <div className="pic-upload"></div>
                            }
                        </Upload>
                    </FormItem>
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                        <FormItem title="微信号" titleWidth="136">
                            <Input name="wechat" value={this.state.wechat} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="QQ号" titleWidth="134">
                            <Input name="qq" value={this.state.qq} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                        <FormItem title="Email" titleWidth="136">
                            <Input name="email" value={this.state.email} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="生日" titleWidth="134">
                            <DatePicker
                                format="YYYY-MM-DD"
                                allowClear={false}
                                onChange={this.getBirth}
                                style={{width: 236}}
                            />
                        </FormItem>
                    </div>
                    <FormItem title="家庭住址" titleWidth="136" marginTop="26">
                        <Input name="address" value={this.state.address} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="简介" titleWidth="136" marginTop="26">
                        <TextArea name="introduction" value={this.state.introduction} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                </FormArea>
                <FormArea title="互动记录" marginTop="10"  paddingBottom="24">
                    <FormItem title="活动时间" titleWidth="106" marginTop="26">
                        <DatePicker
                            showTime={{format: "HH:mm"}}
                            format="YYYY-MM-DD HH:mm"
                            allowClear={false}
                            onChange={this.getActive}
                            style={{width: 236}}
                        />
                    </FormItem>
                    <FormItem title="活动方式:" titleWidth="91" marginTop="26">
                        <RadioTip name="act_way" data={actWay} handle={this.handle} />
                    </FormItem>
                    <FormItem title="活动负责人" titleWidth="106" marginTop="26">
                        <AutoCompleteStaff value={this.state.act_director_name} handle={this.changeDirector} />
                    </FormItem>
                    <FormItem title="地点" titleWidth="106" marginTop="26">
                        <Input name="act_site" value={this.state.act_site} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="会议纪要" titleWidth="106" marginTop="26">
                        <TextArea name="act_content" value={this.state.act_content} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="备注" titleWidth="106" marginTop="26">
                        <TextArea name="act_remark" value={this.state.act_remark} handle={this.handle}style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="会议附件" titleWidth="106" marginTop="26">
                        <FormUpload name="act_files" handle={this.getFiles} />
                    </FormItem>
                </FormArea>
                <FormArea title="关系" marginTop="10"  paddingBottom="21">
                    <FormItem title="渠道" titleWidth="90" marginTop="16">
                        <p style={{lineHeight: "28px"}}>线下</p>
                    </FormItem>
                    <FormItem title="来源" titleWidth="86" marginTop="26">
                        <TabSelect name="source_type" data={sourceType} handle={this.handle}/>
                    </FormItem>
                    <FormItem title="是否认识公司内人员：" titleWidth="170" marginTop="26">
                        <Check isChecked={this.state.has} handle={() => {this.handle("has",true)}}>
                            <p style={{marginLeft: 10}}>是</p>
                        </Check>
                        {
                            this.state.has ? <input type="text" value={this.state.has ? this.state.has_connections : ""}  onChange={this._input.bind(this)} style={Style.input} /> : ""
                        }
                        <Check isChecked={!this.state.has} handle={() => {this.handle("has",false);this.setState({has_connections: ""});}} style={{marginLeft: 40}}>
                            <p style={{marginLeft: 10}}>否</p>
                        </Check>
                    </FormItem>
                    <FormItem title="客户经理" titleWidth="86" marginTop="26">
                        <AutoCompleteStaff handle={this.changeManager} />
                    </FormItem>
                    <FormItem title="备注" titleWidth="86" marginTop="26">
                        <TextArea name="remark" value={this.state.remark} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="标签" titleWidth="86" marginTop="26">
                        <Tag name="tags" type={[3]} handle={this.handle}/>
                    </FormItem>
                </FormArea>
                <FormSubmit value="提交" />
            </form>
        )
    }
}