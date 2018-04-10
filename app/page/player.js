import React from 'react';
import Progress from '../components/progress';
import './player.less'
import {Link} from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null;

class Player extends React.Component {
    constructor(props){
        super(props);
        this.state={
           progress:0,
           volume:0,
           isPlay:true,
           leftTime: ''
        };
    }
    playPrev() {
    	Pubsub.publish('PLAY_PREV');
    }
    playNext() {
    	Pubsub.publish('PLAY_NEXT');
    }
	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				//leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
                progress:e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute/100))
			});
		});
	}
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	}
	formatTime(time) {//时间格式化
		time = Math.floor(time);
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutes}:${seconds}`;
	}
	
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration*progress);
	}
	changeVolumeHanler(progress) {
		$('#player').jPlayer('volume',progress);
	}

	play(){
		if (this.state.isPlay){
			$('#player').jPlayer('pause');
		}
		else{
			$('#player').jPlayer('play');
		}
		this.setState({
			isPlay:!this.state.isPlay
		});
	}
    render() {
        return (
            <div className="player-page" >
                <div className="-col-auto cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
                </div>
                <h1 className="caption"><Link to="/myMusic">我的音乐&gt;</Link></h1>
                <div id="muc">
                <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                </div>
                <div className="mt20 row">

                	<div className="controll-wrapper">
                		
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress 音量控制部分
					                	progress={this.state.volume}
					                	onProgressChange={this.changeVolumeHanler}
					                	barColor="#aaa"
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px', marginTop:'20px'}}>
			                <Progress 进度条部分
                				progress={this.state.progress}
                				onProgressChange={this.progressChangeHandler}
                			>
                			</Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={()=>this.playPrev()}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={()=>this.play()}></i>
                                <i className="icon next ml20" onClick={()=>this.playNext()}></i>	
                			</div>
                			<div className="-col-auto">
                				
                			</div>
                		</div>
                	</div>
                	
                </div>
                
            </div>
        );
    }
}

export default Player;
/*这是因为ES6写法，也就是类(Class)的写法，React默认不会自动绑定类中的方法造成的。
React对ES5的语法是默认有自动绑定，所以不需要加这个。而且，自动绑不绑定也是React决定要不要的
所以在绑定事件的时候要写成onClick={()=>this.play()，而不是直接onClick={this.play}*/
