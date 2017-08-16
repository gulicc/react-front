/**
 * Created by Galaxy065 on 2017/5/26.
 */
import React from "react";
import { FormItem, FormItemTable } from "../../common/formArea";
import { Input, TextArea } from "../../common/defaultInput";
import { AddButton, DeleteButton } from "../../common/defaultButton";
import { AutoCompleteInvestor } from "../../common/autoComplete";
import { Upload, Select, DatePicker } from "antd";

import Utils from "../../../../store/utils";
import Filter from "../../../../store/filter";
import AreaAction from "../../../../store/areaAction";
import ProjectAction from "../../../../store/projectAction";

export class Team extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            team: [{
                name: "",
                title: "",
                duty: "",
                intro: "",
                photo: "",
                imageUrl: ""
            }]
        }
    }

    componentDidMount = () => {
        if(this.props.init && this.props.init.length){
            let team = [];
            let init = this.props.init;
            for(let i=0;i<init.length;i++){
                team.push({
                    name: init[i].name,
                    title: init[i].title,
                    duty: init[i].duty,
                    intro: init[i].intro,
                    photo: init[i].photo_id,
                    imageUrl: init[i].photo ? init[i].photo.path : ""
                })
            }
            this.handle("team",team);
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let team = this.state.team;
        if( team.length === 0 || team[team.length - 1].name){
            team.push({
                name: "",
                title: "",
                duty: "",
                intro: "",
                photo: "",
                imageUrl: ""
            });
            this.setState({
                team: team
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.team.map((data,i)=>{
                        return(
                            <TeamItem data={this.state.team} itemData={data} index={i} handle={this.handle} key={i} />
                        )
                    })
                }
                <div style={{marginTop: 20}}>
                    <AddButton name="追加团队人员"
                               handle={this.add}
                               style={{
                                   margin: "20px auto 0",
                                   width: 124,
                               }}
                    />
                </div>
            </div>
        )
    }
}

class TeamItem extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.itemData.name,
            title: nextProps.itemData.title,
            duty: nextProps.itemData.duty,
            intro: nextProps.itemData.intro,
            photo: nextProps.itemData.photo,
            imageUrl: nextProps.itemData.imageUrl
        })
    }

    handle = (name,data) => {
        let team = this.props.data;
        team[this.props.index][name] = data;
        this.props.handle("team",team);
    }

    uploadImage = (info) => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, imageUrl => {
                let team = this.props.data;
                team[this.props.index].photo = info.file.response.data.id;
                team[this.props.index].imageUrl = imageUrl;
                this.props.handle("team",team);
            });
        }
    }

    delete = () => {
        let team = this.props.data;
        team.splice(this.props.index,1);
        this.props.handle("team",team);
    }

    render() {
        return(
            <div style={{paddingBottom: 20, borderBottom: "1px solid #f0f1f2"}}>
                <div className="flex flex-row flex-between align-center" style={{marginTop: 24, paddingRight: 38}}>
                    <FormItem title="姓名" titleWidth="136">
                        <Input name="name" value={this.state.name} handle={this.handle} style={{width: 176}} />
                    </FormItem>
                    <FormItem title="头衔" titleWidth="56">
                        <Input name="title" value={this.state.title} handle={this.handle} style={{width: 176}} />
                    </FormItem>
                    <FormItem title="职务" titleWidth="56">
                        <Input name="duty" value={this.state.duty} handle={this.handle} style={{width: 176}} />
                    </FormItem>
                    <DeleteButton handle={this.delete}/>
                </div>
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
                <FormItem title="简介" titleWidth="136" marginTop="26">
                    <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                </FormItem>
            </div>
        )
    }
}

export class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stock_struct: [{
                name: "",
                scale: ""
            }]
        }
    }

    componentDidMount = () => {
        if(this.props.init && this.props.init.length){
            let stock = [];
            let init = this.props.init;
            for(let i=0;i<init.length;i++){
                stock.push({
                    name: init[i].name,
                    scale: init[i].scale
                })
            }
            this.handle("stock_struct",stock);
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let stock = this.state.stock_struct;
        if( stock.length === 0 || (stock[stock.length - 1].name && stock[stock.length - 1].scale)){
            stock.push({
                name: "",
                scale: ""
            });
            this.setState({
                stock_struct: stock
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        const stockTitle = [
            {
                title: "企业名称",
                titleWidth: "130",
                marginRight: 40
            },
            {
                title: "持股比例",
                titleWidth: "130"
            },
        ];
        return(
            <FormItemTable titleData={stockTitle} marginTop="6">
                {
                    this.state.stock_struct.map((stock,i) => {
                        return(
                            <StockItem data={this.state.stock_struct} itemData={stock} index={i} handle={this.handle} key={i}/>
                        )
                    })
                }
                <AddButton name="追加股权" handle={this.add} style={{width: 100}} />
            </FormItemTable>
        )
    }
}

export class StockItem extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.itemData.name,
            scale: nextProps.itemData.scale
        })
    }

    handle = (name,data) => {
        let stock = this.props.data;
        stock[this.props.index][name] = data;
        this.props.handle("stock_struct",stock);
    }

    delete = () => {
        let stock = this.props.data;
        stock.splice(this.props.index,1);
        this.props.handle("stock_struct",stock);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-center"} style={{marginBottom: 20}}>
                <Input name="name" value={this.state.name} handle={this.handle} type="text" style={{width: 130, marginRight: 40}}/>
                <Input name="scale" value={this.state.scale} handle={this.handle} filter={Filter.checkPercent} type="text" style={{width: 130}} tip="%"/>
                <DeleteButton handle={this.delete} style={{marginLeft:80}} />
            </div>
        )
    }
}

export class Compete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            competitors: [{
                name: "",
                address: "",
                primary_business: "",
                compete_description: ""
            }],
            areaData: []
        }
    }

    componentDidMount = () => {
        AreaAction.listLocAllProvinces((data)=>{
            this.setState({
                areaData: data
            })
        });
        if(this.props.init && this.props.init.length){
            let competitors = [];
            let init = this.props.init;
            for(let i=0;i<init.length;i++){
                competitors.push({
                    name: init[i].name,
                    address: init[i].address,
                    primary_business: init[i].primary_business,
                    compete_description: init[i].compete_description
                })
            }
            this.handle("competitors",competitors);
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let competitors = this.state.competitors;
        if( competitors.length === 0 || (competitors[competitors.length - 1].name && competitors[competitors.length - 1].address)){
            competitors.push({
                name: "",
                address: "",
                primary_business: "",
                compete_description: ""
            });
            this.setState({
                competitors: competitors
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        const competeTitle = [
            {
                title: "企业名称",
                titleWidth: "130",
                marginRight: 40
            },
            {
                title: "地区",
                titleWidth: "130",
                marginRight: 40
            },
            {
                title: "主营业务",
                titleWidth: "130",
                marginRight: 40
            },
            {
                title: "竞争业务",
                titleWidth: "130"
            },
        ];
        return(
            <FormItemTable titleData={competeTitle} marginTop="6">
                {
                    this.state.competitors.map((compete,i)=>{
                        return(
                            <CompeteItem data={this.state.competitors} itemData={compete} areaData={this.state.areaData} index={i} handle={this.handle} modify={this.props.modify} key={i}/>
                        )
                    })
                }
                <AddButton name="添加竞争对手" handle={this.add} style={{width: 124}} />
            </FormItemTable>
        )
    }
}

export class CompeteItem extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.itemData.name,
            address: nextProps.itemData.address,
            primary_business: nextProps.itemData.primary_business,
            compete_description: nextProps.itemData.compete_description
        })
    }

    handle = (name,data) => {
        let compete = this.props.data;
        compete[this.props.index][name] = data;
        this.props.handle("competitors",compete);
    }

    changeArea = (value) => {
        let compete = this.props.data;
        compete[this.props.index].address = value;
        this.props.handle("competitors",compete);
    }

    delete = () => {
        let compete = this.props.data;
        compete.splice(this.props.index,1);
        this.props.handle("competitors",compete);
    }

    render() {
        const Option = Select.Option;
        return(
            <div className={"flex flex-row flex-between align-center"} style={{marginBottom: 20, paddingRight: 38}}>
                <div className="flex flex-row flex-start">
                    <Input name="name" value={this.state.name} handle={this.handle} type="text" style={{width: 130, marginRight: 40}}/>
                    <Select value={this.state.address} style={{ width: 130, marginRight: 40}} onChange={this.changeArea} getPopupContainer={() => this.props.modify ? document.getElementById('slide') : document.body}>
                        {
                            this.props.areaData.map((area,i)=>{
                                return(
                                    <Option key={i} value={area.province}>{area.province}</Option>
                                )
                            })
                        }
                    </Select>
                    <Input name="primary_business" value={this.state.primary_business} handle={this.handle} type="text" style={{width: 130, marginRight: 40}}/>
                    <Input name="compete_description" value={this.state.compete_description} handle={this.handle} type="text" style={{width: 130}}/>
                </div>
                <DeleteButton handle={this.delete} />
            </div>
        )
    }
}

export class Fin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            financial_data: [{
                start_time: "",
                revenue: "",
                revenue_source: "",
                net_margin: "",
                margin_source: ""
            }]
        }
    }

    componentDidMount = () => {
        if(this.props.init && this.props.init.length){
            let financial_data = [];
            let init = this.props.init;
            for(let i=0;i<init.length;i++){
                financial_data.push({
                    start_time: init[i].start_time,
                    revenue: init[i].revenue,
                    revenue_source: init[i].revenue_source,
                    net_margin: init[i].net_margin,
                    margin_source: init[i].margin_source
                })
            }
            this.handle("financial_data",financial_data);
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let financial_data = this.state.financial_data;
        if( financial_data.length === 0 || (financial_data[financial_data.length - 1].start_time && financial_data[financial_data.length - 1].revenue)){
            financial_data.push({
                start_time: "",
                revenue: "",
                revenue_source: "",
                net_margin: "",
                margin_source: ""
            });
            this.setState({
                financial_data: financial_data
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        const financeData = [
            {
                title: "时间段",
                titleWidth: "150"
            },
            {
                title: "收入",
                titleWidth: "170"
            },
            {
                title: "收入来源",
                titleWidth: "170"
            },
            {
                title: "净利润",
                titleWidth: "170"
            },
            {
                title: "净利润来源",
                titleWidth: "130"
            },
        ];
        return(
            <FormItemTable titleData={financeData} marginTop="16" marginBottom="6">
                {
                    this.state.financial_data.map((fin,i)=>{
                        return(
                            <FinItem data={this.state.financial_data} itemData={fin} index={i} handle={this.handle} key={i}/>
                        )
                    })
                }
                <AddButton name="添加财务数据" handle={this.add} style={{width: 124}} />
            </FormItemTable>
        )
    }
}

export class FinItem extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            start_time: nextProps.itemData.start_time,
            revenue: nextProps.itemData.revenue,
            revenue_source: nextProps.itemData.revenue_source,
            net_margin: nextProps.itemData.net_margin,
            margin_source: nextProps.itemData.margin_source
        })
    }

    handle = (name,data) => {
        let fin = this.props.data;
        fin[this.props.index][name] = data;
        this.props.handle("financial_data",fin);
    }

    delete = () => {
        let fin = this.props.data;
        fin.splice(this.props.index,1);
        this.props.handle("financial_data",fin);
    }

    render() {
        return(
            <div className={"flex flex-row flex-between align-center"} style={{marginBottom: 20, paddingRight: 38}}>
                <div className="flex flex-row flex-start">
                    <Input name="start_time" value={this.state.start_time} handle={this.handle} style={{width: 70}} areaStyle={{width: 150}} tip="年"/>
                    <Input name="revenue" value={this.state.revenue} handle={this.handle} filter={Filter.checkNum} style={{width: 90}} areaStyle={{width: 170}} tip="万元"/>
                    <TextArea name="revenue_source" value={this.state.revenue_source} handle={this.handle} style={{padding: "4px 10px", width: 130, height: 28}} areaStyle={{width: 170}}/>
                    <Input name="net_margin" value={this.state.net_margin} handle={this.handle} filter={Filter.checkNum} style={{width: 90}} areaStyle={{width: 170}} tip="万元"/>
                    <TextArea name="margin_source" value={this.state.margin_source} handle={this.handle} style={{padding: "4px 10px", width: 130, height: 28}} areaStyle={{width: 170}}/>
                </div>
                <DeleteButton handle={this.delete} />
            </div>
        )
    }
}

export class ProjectInvestor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            investlist: [{
                investor: "",
                investorid: "",
                investorg: "",
                planmoney: "",
                isleader: this.props.isLeader,
                progress: ""
            }],
            statusData: []
        }
    }

    componentDidMount = () => {
        ProjectAction.queryInvProgress((data)=>{
            this.setState({
                statusData: data
            })
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.init !== nextProps.init){
            if(nextProps.init && nextProps.init.length){
                let investlist = [];
                let init = nextProps.init;
                for(let i=0;i<init.length;i++){
                    investlist.push({
                        investor: init[i].invlist_investor,
                        investorid: init[i].invlist_investid,
                        investorg: init[i].invlist_investorg,
                        planmoney: init[i].invlist_planmoney,
                        isleader: init[i].invlist_isleader,
                        progress: init[i].fstatus_id
                    })
                }
                this.handle("investlist",investlist);
            }
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let investlist = this.state.investlist;
        if( investlist.length === 0 || (investlist[investlist.length - 1].investor && investlist[investlist.length - 1].investorid && investlist[investlist.length - 1].planmoney && investlist[investlist.length - 1].progress)){
            investlist.push({
                investor: "",
                investorid: "",
                investorg: "",
                planmoney: "",
                isleader: "N",
                progress: "",
            });
            this.setState({
                investlist: investlist
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        const investorTitle = [
            {
                title: "投资人",
                titleWidth: "130"
            },
            {
                title: "投资机构",
                titleWidth: "150"
            },
            {
                title: "投资金额",
                titleWidth: "150"
            },
            {
                title: "进度状态",
                titleWidth: "160"
            }
        ];
        return(
            <FormItemTable titleData={investorTitle}>
                {
                    this.state.investlist.map((invest,i)=>{
                        return(
                            <ProjectInvestorItem data={this.state.investlist} itemData={invest} statusData={this.state.statusData} index={i} handle={this.handle} key={i} isDelete={this.props.isDelete} />
                        )
                    })
                }
                {
                    this.props.isAdd ? (
                        <AddButton name="追加跟投" handle={this.add} style={{width: 96}} />
                    ) : ("")
                }
            </FormItemTable>
        )
    }
}

class ProjectInvestorItem extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            investor: nextProps.itemData.investor,
            investorid: nextProps.itemData.investorid,
            investorg: nextProps.itemData.investorg,
            planmoney: nextProps.itemData.planmoney,
            progress: nextProps.itemData.progress
        })
    }

    handle = (name,data) => {
        let invest = this.props.data;
        invest[this.props.index][name] = data;
        this.props.handle("investlist",invest);
    }

    changeInvestor = (obj) => {
        console.log(obj);
        this.handle("investor",obj.name);
        this.handle("investorid",obj.extId ? obj.extId : obj.id);
        this.handle("investorg",obj.org);
    }

    changeStatus = (value) => {
        this.handle("progress",value);
    }

    delete = () => {
        let invest = this.props.data;
        invest.splice(this.props.index,1);
        this.props.handle("investlist",invest);
    }

    render() {
        const Option = Select.Option;
        return(
            <div className="flex flex-row flex-start align-center" style={{marginBottom: 14}}>
                <div style={{width: 130}}>
                    <AutoCompleteInvestor value={this.state.investor} handle={this.changeInvestor} width="80"/>
                </div>
                <p style={{width: 150}}>{this.state.investorg}</p>
                <Input name="planmoney" value={this.state.planmoney} handle={this.handle} filter={Filter.checkNum} style={{width: 50}} areaStyle={{width: 150}} tip="万元"/>
                <Select value={this.state.progress} style={{ width: 160 }} getPopupContainer={() => document.getElementById('slide')} onChange={this.changeStatus}>
                    {
                        this.props.statusData.map((status,i)=>{
                            return(
                                <Option key={i} value={status.id}>{status.progname}</Option>
                            )
                        })
                    }
                </Select>
                {
                    this.props.isDelete ? <DeleteButton handle={this.delete} style={{marginLeft: 132}} /> : ""
                }
            </div>
        )
    }
}

export class AgencyTeam extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            team: [{
                name: "",
                job: "",
                intro: ""
            }]
        }
    }

    componentDidMount = () => {
        if(this.props.init && this.props.init.length){
            let team = [];
            let init = this.props.init;
            for(let i=0;i<init.length;i++){
                team.push({
                    name: init[i].name,
                    job: init[i].job,
                    intro: init[i].intro,
                })
            }
            this.handle("team",team);
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    add = () => {
        let team = this.state.team;
        if( team.length === 0 || team[team.length - 1].name){
            team.push({
                name: "",
                job: "",
                intro: ""
            });
            this.setState({
                team: team
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        return(
            <div>
                {
                    this.state.team.map((teams,i)=>{
                        return(
                            <AgencyTeamItem data={this.state.team} itemData={teams} index={i} handle={this.handle} key={i} />
                        )
                    })
                }
                <AddButton name="追加一名人员"
                           style={{
                               margin: "20px auto 0",
                               width: 124
                           }}
                           handle={this.add}
                />
            </div>
        )
    }
}

export class AgencyTeamItem extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.itemData.name,
            job: nextProps.itemData.job,
            intro: nextProps.itemData.intro,
        })
    }

    handle = (name,data) => {
        let team = this.props.data;
        team[this.props.index][name] = data;
        this.props.handle("team",team);
    }

    delete = () => {
        let team = this.props.data;
        team.splice(this.props.index,1);
        this.props.handle("team",team);
    }

    render() {
        return(
            <div style={{paddingBottom: 24, borderBottom: "1px solid #f0f1f2"}}>
                <div className="flex flex-row flex-between align-center" style={{marginTop: 24, paddingRight: 38}}>
                    <FormItem title="姓名" titleWidth="136">
                        <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="职位" titleWidth="88">
                        <Input name="job" value={this.state.job} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <DeleteButton handle={this.delete}/>
                </div>
                <FormItem title="简介" titleWidth="136" marginTop="24">
                    <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                </FormItem>
            </div>
        )
    }
}