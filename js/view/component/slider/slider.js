/**
 * Created by Zhoushuo on 2017/4/28.
 */
import React from "react";
import { Route, Link } from "react-router-dom";
import SliderJson from "./data/sliderInit";
import FreeScrollBar from 'react-free-scrollbar';

import Utils from "../../../store/utils";

const SliderDefine = ({ label, to, activeOnlyWhenExact, style }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <div className={ match ? style.active : style.static }>
            <Link to={to}>{label}</Link>
        </div>
    )}/>
);

const SliderLine = ({ to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <div>
            {
                match ? <div className="rk-slider-line"></div> : ""
            }
        </div>
    )}/>
);

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderJson: []
        }
    }

    componentWillMount() {
        this.setState({
            sliderJson: SliderJson.slider()
        });
    }

    switchSlider = (value) => {
        this.props.handle(value);
    };

    render() {
        return(
            <div className={ this.props.isOpen ? "rk-slider" : "rk-slider-close" }>
                {
                    this.props.isOpen ? <IsOpen handle={this.switchSlider} data={this.state.sliderJson} /> : <IsClose handle={this.switchSlider} data={this.state.sliderJson} />
                }
            </div>
        )
    }
}

class IsOpen extends React.Component {
    constructor(props) {
        super(props)
    }

    switchSlider = () => {
        this.props.handle(false);
    };

    render(){
        return(
            <FreeScrollBar autohide={true}>
                <div className="rk-main-slider">
                    <div className="rk-slider-header flex flex-row flex-center align-center">
                        <h1 className="rk-slider-img">星河融快</h1>
                    </div>
                    <div className="rk-slider-list">
                        {
                            this.props.data.map((slider,index) => {
                                return(
                                    slider.mainPower ? (
                                        <div key={index} style={{marginBottom: 2}}>
                                            {
                                                slider.path ? (
                                                    <Link to={slider.path} className="rk-slider-item flex flex-row flex-start align-center">
                                                        <div className="rk-slider-item-icon">
                                                            <div className="rk-slider-item-icon-width">
                                                                <i className={slider.icon}></i>
                                                            </div>
                                                        </div>
                                                        <h2>{slider.title}</h2>
                                                    </Link>
                                                ) : (
                                                    <div className="rk-slider-item flex flex-row flex-start align-center">
                                                        <div className="rk-slider-item-icon">
                                                            <div className="rk-slider-item-icon-width">
                                                                <i className={slider.icon}></i>
                                                            </div>
                                                        </div>
                                                        <h2>{slider.title}</h2>
                                                    </div>
                                                )
                                            }
                                            {
                                                slider.children && slider.children.length ? (
                                                    <div className="rk-slider-child-list">
                                                        {
                                                            slider.children.map((child,i) => {
                                                                return (
                                                                    child.isPower ? (
                                                                        <SliderDefine key={i}
                                                                                      activeOnlyWhenExact={child.activeOnlyWhenExact}
                                                                                      to={child.path}
                                                                                      label={child.label}
                                                                                      style={{
                                                                                          active: "rk-slider-child-active",
                                                                                          static: "rk-slider-child"
                                                                                      }}
                                                                        />
                                                                    ) : ("")
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                ) : ("")
                                            }
                                        </div>
                                    ) : ("")
                                )
                            })
                        }
                    </div>
                </div>
            </FreeScrollBar>
        )
    }
}

class IsClose extends React.Component {
    constructor(props) {
        super(props)
    }

    switchSlider = () => {
        this.props.handle(true);
    };

    render(){
        return(
            <div>
                <div className="rk-slider-close-header flex flex-row flex-center align-center">
                    <a className="rk-slider-img" onClick={this.switchSlider}></a>
                </div>
                <div className="rk-slider-close-list">
                    {
                        this.props.data.map((slider,index) => {
                            return(
                                slider.mainPower ? (
                                    <div key={index}>
                                        {
                                            slider.path ? (
                                                <Link to={slider.path} className="rk-slider-close-item flex flex-row flex-center align-center">
                                                    <SliderLine activeOnlyWhenExact={true}
                                                                to={slider.path}
                                                    />
                                                    <i className={slider.icon}></i>
                                                </Link>
                                            ) : (
                                                <div className="rk-slider-close-item flex flex-row flex-center align-center">
                                                    {
                                                        slider.children.map((child, i) => {
                                                            return <SliderLine key={i}
                                                                               activeOnlyWhenExact={child.activeOnlyWhenExact}
                                                                               to={child.path}
                                                            />
                                                        })
                                                    }
                                                    <i className={slider.icon}></i>
                                                    <div className="rk-slider-close-hover-list">
                                                        <h2>{slider.title}</h2>
                                                        <div className="rk-slider-child-list">
                                                            {
                                                                slider.children.map((child, i) => {
                                                                    return (
                                                                        child.isPower ? (
                                                                            <SliderDefine key={i}
                                                                                          activeOnlyWhenExact={child.activeOnlyWhenExact}
                                                                                          to={child.path}
                                                                                          label={child.label}
                                                                                          style={{
                                                                                              active: "rk-slider-child-close-active",
                                                                                              static: "rk-slider-child-close"
                                                                                          }}
                                                                            />
                                                                        ) : ("")
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ): ("")
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}