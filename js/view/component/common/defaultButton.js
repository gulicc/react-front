/**
 * Created by Galaxy065 on 2017/5/12.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/defaultButton.css";
import Icon from "./defaultIcon";
import { ConfirmWindow } from "./alertWindow";

export class AddButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div className={this.props.large ? Style.addLarge : Style.add}>
                {
                    this.props.path ? (
                        <Link to={this.props.path} className="flex flex-row flex-center align-center" style={this.props.style}>
                            <i></i>
                            <span>{this.props.name}</span>
                        </Link>
                    ) : (
                        <a onTouchTap={this.handle} className="flex flex-row flex-center align-center" style={this.props.style}>
                            <i></i>
                            <span>{this.props.name}</span>
                        </a>
                    )
                }
            </div>
        )
    }
}

export class DeleteButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div onTouchTap={this.handle} className={Style.delete} style={this.props.style}></div>
        )
    }
}

export class CancelButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <a className={Style.cancel} style={this.props.style} onTouchTap={this.handle}>取消</a>
        )
    }
}

export class CloseButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <a className={Style.close} style={this.props.style} onTouchTap={this.handle}></a>
        )
    }
}

export class CloseInfoButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <a className={Style.closeInfo} style={this.props.style} onTouchTap={this.handle}></a>
        )
    }
}

export class EditButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div onTouchTap={this.handle} className={"flex flex-row flex-start align-center " + Style.editOrWatchButton} style={this.props.style}>
                <Icon name="iconEdit" style={{marginRight: 16}}/>
                <span>编辑模式</span>
            </div>
        )
    }
}

export class WatchButton extends React.Component{
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div onTouchTap={this.handle} className={"flex flex-row flex-start align-center " + Style.editOrWatchButton} style={this.props.style}>
                <Icon name="iconWatch" style={{marginRight: 16}}/>
                <span>浏览模式</span>
            </div>
        )
    }
}

export class FormButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmStatus: false
        }
    }

    handle = () => {
        if(this.props.confirm){
            this.setState({
                confirmStatus: true
            })
        }else{
            this.props.handle();
        }
    }

    saveHandle = () => {
        this.props.confirm.saveHandle();
        this.close();
    }

    close = () => {
        this.setState({
            confirmStatus: false
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.confirmStatus ? <ConfirmWindow content={this.props.confirm.content} saveHandle={this.saveHandle} cancelHandle={this.close}/> : ""
                }
                <div onClick={this.handle} className={Style.formButton} style={this.props.style}>
                    <p>{this.props.buttonName}</p>
                </div>
            </div>
        )
    }
}

export class TransRight extends React.Component {
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div onTouchTap={this.handle} style={this.props.style}>
                <Icon name="transRight" />
            </div>
        )
    }
}

export class TransLeft extends React.Component {
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return (
            <div onTouchTap={this.handle} style={this.props.style}>
                <Icon name="transLeft" />
            </div>
        )
    }
}