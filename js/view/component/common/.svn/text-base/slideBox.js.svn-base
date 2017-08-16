/**
 * Created by Galaxy065 on 2017/5/9.
 */
import React from "react";
import Style from "./css/slideBox.css";
import Header from "../common/header";

export class SlideBox extends React.Component {
    constructor(props){
        super(props)
    }

    stop = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        return(
            <div className={Style.slider} style={{width: this.props.isOpen ? innerWidth - 255 : 0}} id="slide" onClick={this.stop.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}

export class SlideInfo extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                <Header title={this.props.title} user={false} />
                <div className="main-container" id="slideContainer">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}