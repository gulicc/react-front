/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import Style from "./css/infoArea.css";

export class InfoTitle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <h4 className={Style.title} style={{marginTop: this.props.marginTop, width: this.props.width}}>{this.props.title}</h4>
        )
    }
}

export class InfoContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titleStyle: {}
        }
    }

    componentDidMount = () => {
        let titleStyle = this.props.titleStyle ? this.props.titleStyle : {};
        titleStyle.width = this.props.width;
        this.setState({
            titleStyle: titleStyle
        })
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-start " + Style.content} style={{width: this.props.contentWidth, marginTop: this.props.marginTop}}>
                <p style={this.state.titleStyle}>{this.props.title}</p>
                {
                    this.props.value ? (
                        this.props.link ? (<a>{this.props.value}</a>) : (<p className="flex1" style={this.props.valueStyle}>{this.props.value}</p>)
                    ) : (
                        <div className="flex1 flex flex-row flex-start">
                            {this.props.children}
                        </div>
                    )
                }
            </div>
        )
    }
}

export class InfoDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={Style.detail + " " + this.props.className} style={this.props.style}>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

export class InfoQuestion extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center">
                <p>4.5分</p>
                <a className={Style.question}>问卷详情</a>
            </div>
        )
    }
}

export class InfoRate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [false,false,false,false,false],
            rate: this.props.rate
        }
    }

    componentDidMount = () => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++){
            if(i<this.state.rate){
                data[i] = true;
            }else{
                data[i] = false;
            }
        }
        this.setState({
            data: data
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++){
            if(i<nextProps.rate){
                data[i] = true;
            }else{
                data[i] = false;
            }
        }
        this.setState({
            data: data
        })
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center">
                <div className="flex flex-row flex-start">
                    {
                        this.state.data.map((star,i) => {
                            return(
                                this.props.isEdit ? (
                                    <a key={i} className={Style.star} style={{backgroundImage: star ? "url(/images/icon_star_edit_choose.png)" : "url(/images/icon_star_edit.png)"}}></a>
                                ) : (
                                    <a key={i} className={Style.star} style={{backgroundImage: star ? "url(/images/icon_star_choose.png)" : "url(/images/icon_star.png)"}}></a>
                                )
                            )
                        })
                    }
                </div>
                <p style={{fontWeight: "bold", marginLeft: 26}}>{this.props.rate === "-" ? this.props.rate : this.props.rate + "级"}</p>
            </div>
        )
    }
}

export class InfoTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <table className={Style.table} style={this.props.tableStyle}>
                <thead>
                    <tr>
                        {
                            this.props.children.map((child,i) => {
                                return (
                                    <th key={i} style={{width: child.props.width, padding: child.props.padding}}>{child.props.title}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.dataSource.map((childs,i) => {
                        return(
                            <tr>
                                {
                                    React.Children.map(this.props.children, child => {
                                        if (child.type === InfoColumn)
                                            return React.cloneElement(child, {
                                                data: this.props.dataSource[i]
                                            })
                                        else
                                            return child
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}

export class InfoColumn extends React.Component {
    constructor(props){
        super(props)
    }

    handle = (e) => {
        this.props.handle(e,this.props.data[this.props.index]);
    }

    render() {
        return(
            <td style={{padding: this.props.padding}}>
                {
                    this.props.handle ? (
                        <a onClick={this.handle}>{this.props.data[this.props.index]}</a>
                    ) : (
                        <p>{this.props.data[this.props.index]}</p>
                    )
                }
            </td>
        )
    }
}