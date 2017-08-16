/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import { History } from "react-router-dom";
import { FormArea, FormItem, FormSubmit } from "../common/formArea";
import {Input, TextArea, CheckTip} from "../common/defaultInput";
import { Team, Stock, Compete, Fin } from "./common/common";
import Upload from "antd/lib/upload";
import { Select, DatePicker } from 'antd';

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import CompanyAction from "../../../store/companyAction";

export default class AddEnterprise extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //防止重复提交
            submitStatus: true,
            imageUrl: '',
            name: "",
            abbrname: "",
            logo: "",
            fields: "",
            regist_time: "",
            regist_capital: "",
            legal_person: "",
            staff_size: "",
            address: "",
            web: "",
            ipo_status: "",
            intro: "",
            primary_business: "",
            business_model: "",
            business_intro: "",
            team: [],
            stock_struct: [],
            competitors: [],
            financial_data: []
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    getTime = (value, dateString) => {
        this.handle("regist_time",dateString);
    }

    changeSize = (value) => {
        this.handle("staff_size",value);
    }

    changeIpo = (value) => {
        this.handle("ipo_status",value);
    }

    uploadImage = (info) => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            this.setState({
                logo: info.file.response.data.id
            })
        }
    }

    _submit = (e) => {
        e.preventDefault();
        Utils.checkPower("添加企业");
        if(this.state.submitStatus){
            this.setState({
                submitStatus: false
            })
        }else{
            return false
        }
        let team = [];
        let teamData = this.refs.team.state.team;
        for(let i=0;i<teamData.length;i++){
            if(teamData[i].name){
                team.push({
                    name: teamData[i].name,
                    title: teamData[i].title,
                    duty: teamData[i].duty,
                    intro: teamData[i].intro,
                    photo: teamData[i].photo
                })
            }
        }
        let stock_struct = [];
        let stockData = this.refs.stock.state.stock_struct;
        for(let i=0;i<stockData.length;i++){
            if(stockData[i].name && stockData[i].scale){
                stock_struct.push({
                    name: stockData[i].name,
                    scale: stockData[i].scale
                })
            }
        }
        let competitors = [];
        let competitorsData = this.refs.compete.state.competitors;
        for(let i=0;i<competitorsData.length;i++){
            if(competitorsData[i].name && competitorsData[i].address){
                competitors.push({
                    name: competitorsData[i].name,
                    address: competitorsData[i].address,
                    primary_business: competitorsData[i].primary_business,
                    compete_description: competitorsData[i].compete_description
                })
            }
        }
        let financial_data = [];
        let finData = this.refs.fin.state.financial_data;
        for(let i=0;i<finData.length;i++){
            if(finData[i].start_time && finData[i].revenue){
                financial_data.push({
                    start_time: finData[i].start_time,
                    end_time: finData[i].start_time,
                    revenue: finData[i].revenue,
                    revenue_source: finData[i].revenue_source,
                    net_margin: finData[i].net_margin,
                    margin_source: finData[i].margin_source
                })
            }
        }
        this.setState({
            team: team,
            stock_struct: stock_struct,
            competitors: competitors,
            financial_data: financial_data
        },()=>{
            CompanyAction.createCompany(this.state,(data)=>{
                this.props.complete();
            },()=>{
                this.setState({
                    submitStatus: true
                })
            });
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <form onSubmit={this._submit.bind(this)}>
                <FormArea title="基本信息"  paddingBottom="24">
                    <FormItem title="企业全称" titleWidth="136" marginTop="24">
                        <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="企业简称" titleWidth="136" marginTop="26">
                        <Input name="abbrname" value={this.state.abbrname} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="企业LOGO" titleWidth="136" marginTop="26">
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
                    <FormItem title="行业领域" titleWidth="75" marginTop="26">
                        <CheckTip name="fields" getData="queryIndustries" handle={this.handle} />
                    </FormItem>
                    <div className="flex flex-row flex-between" style={{marginTop: 26,paddingRight: 56}}>
                        <FormItem title="成立时间" titleWidth="136">
                            <DatePicker
                                format="YYYY-MM-DD"
                                allowClear={false}
                                onChange={this.getTime}
                                style={{width: 236}}
                            />
                        </FormItem>
                        <FormItem title="注册资本" titleWidth="88">
                            <Input name="regist_capital" value={this.state.regist_capital} handle={this.handle} filter={Filter.checkNum} style={{width: 236}} />
                            <p style={{marginLeft: 10, width: 40}}>万元</p>
                        </FormItem>
                    </div>
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 106}}>
                        <FormItem title="法定代表人" titleWidth="136">
                            <Input name="legal_person" value={this.state.legal_person} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="企业规模" titleWidth="88">
                            <Select style={{ width: 236 }} onChange={this.changeSize}>
                                {
                                    Utils.staffSize.map((data,i)=>{
                                        return(
                                            <Option key={i} value={data.id}>{data.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                    </div>
                    <div className="flex flex-row flex-start" style={{marginTop: 26, paddingRight: 106}}>
                        <FormItem title="注册地址" titleWidth="136" className="flex1">
                            <Input name="address" value={this.state.address} handle={this.handle} areaClassName="flex1" className="flex1" />
                        </FormItem>
                    </div>
                    <FormItem title="公司网站" titleWidth="136" marginTop="26">
                        <Input name="web" value={this.state.web} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="上市情况" titleWidth="136" marginTop="26">
                        <Select style={{ width: 236 }} onChange={this.changeIpo}>
                            {
                                Utils.ipoSize.map((data,i)=>{
                                    return(
                                        <Option key={i} value={data.id}>{data.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem title="公司简介" titleWidth="136" marginTop="26">
                        <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                </FormArea>
                <FormArea title="团队信息" marginTop="10"  paddingBottom="20">
                    <Team ref="team" />
                </FormArea>
                <FormArea title="股权结构" marginTop="10"  paddingBottom="24">
                    <Stock ref="stock" />
                </FormArea>
                <FormArea title="竞争对手" marginTop="10"  paddingBottom="24">
                    <Compete ref="compete" />
                </FormArea>
                <FormArea title="产品与服务" marginTop="10"  paddingBottom="21">
                    <FormItem title="主营业务" titleWidth="136" marginTop="24">
                        <Input name="primary_business" value={this.state.primary_business} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="商业模式" titleWidth="136" marginTop="26">
                        <Input name="business_model" value={this.state.business_model} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="业务介绍" titleWidth="136" marginTop="26">
                        <TextArea name="business_intro" value={this.state.business_intro} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                </FormArea>
                <FormArea title="财务数据" marginTop="10"  paddingBottom="40">
                    <Fin ref="fin" />
                </FormArea>
                <FormSubmit value="提交" />
            </form>
        )
    }
}