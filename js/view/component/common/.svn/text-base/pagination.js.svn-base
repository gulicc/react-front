/**
 * Created by Galaxy065 on 2017/5/19.
 */
import React from "react";
import Style from "./css/pagination.css";
import Icon from "../common/defaultIcon";

export default class Pagination extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: 1,
            totalPage: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            totalPage: Math.ceil(this.props.count/this.props.showCount)
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            totalPage: Math.ceil(nextProps.count/nextProps.showCount),
            value: nextProps.page
        })
    }

    input = (e) => {
        if(!(/^\d+$/.test(e.target.value))  && e.target.value !== "") {
            return false;
        }else if(e.target.value > this.state.totalPage){
            this.setState({
                value: this.state.totalPage
            });
        }else{
            this.setState({
                value: e.target.value
            });
        }
    }

    submit = (e) => {
        e.preventDefault();
        this.getPage(this.state.value);
    }

    getPage = (page) => {
        if(page > 0 && page <= this.state.totalPage){
            this.props.handle(page);
        }
    }

    chooseShow = (count) => {
        this.props.chooseShow(count);
    }

    render() {
        const showList = [10,20,30,50];
        return(
            <form onSubmit={this.submit.bind(this)} className="flex flex-row flex-center align-center" style={this.props.style}>
                <p className={Style.count}>共{this.props.count}条</p>
                <a className={Style.first} onClick={() => {this.getPage(1)}}>1</a>
                {
                    this.state.totalPage > 1 ? (
                        <div className="flex flex-row flex-center align-center">
                            <a className={Style.left} onClick={() => {this.getPage(this.props.page - 1)}}></a>
                            <input type="text" value={this.state.value} onChange={this.input.bind(this)} className={Style.number}/>
                            <a className={Style.right} onClick={() => {this.getPage(this.props.page + 1)}}></a>
                            <a className={Style.last} onClick={() => {this.getPage(this.state.totalPage)}}>{this.state.totalPage}</a>
                        </div>
                    ) : ("")
                }
                <div className={"flex flex-row flex-between align-center " + Style.chooseShow}>
                    <p>{this.props.showCount}</p>
                    <span></span>
                    <div className={Style.chooseList}>
                        {
                            showList.map((count,i)=> {
                                return (
                                    <a style={{color: this.props.showCount === count ? "#ff530c" : ""}} onClick={() => {this.chooseShow(count)}}>{count}</a>
                                )
                            })
                        }
                    </div>
                </div>
            </form>
        )
    }
}