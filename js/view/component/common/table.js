/**
 * Created by Galaxy065 on 2017/5/4.
 */
import React from "react";
import Style from "./css/table.css";

export class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <table className={Style.table} style={{marginTop: this.props.marginTop}}>
                <thead>
                    <tr>
                        {
                            this.props.children.map((child,i) => {
                                return (
                                    <th key={i} style={{width: child.props.width, paddingLeft: child.props.paddingLeft}}>{child.props.title}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.dataSource.map((childs,i) => {
                            return(
                                i % 2 == 0 ? (
                                    <tr>
                                        {
                                            React.Children.map(this.props.children, child => {
                                                if (child.type === Column)
                                                    return React.cloneElement(child, {
                                                        data: this.props.dataSource[i]
                                                    })
                                                else
                                                    return child
                                            })
                                        }
                                    </tr>
                                ) : (
                                    <tr style={{backgroundColor: "#fbfbfb"}}>
                                        {
                                            React.Children.map(this.props.children, child => {
                                                if (child.type === Column)
                                                    return React.cloneElement(child, {
                                                        data: this.props.dataSource[i]
                                                    })
                                                else
                                                    return child
                                            })
                                        }
                                    </tr>
                                )
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export class Column extends React.Component {
    constructor(props){
        super(props)
    }

    handle = (e) => {
        this.props.handle(e,this.props.data[this.props.index]);
    }

    render() {
        return(
            <td style={{paddingLeft: this.props.paddingLeft}}>
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