import React from 'react';
import Header from './components/header'
import Progress from './components/progress'
let duration=null;
class Root extends React.Component{   /*es5语法，每个单独成分要加逗号*/
	constructor(props){
		super(props);
		this.state={
			progress:'-'
		};
	}

	componentDidMount(){
		$('#player').jPlayer({
			ready:function(){
				$(this).jPlayer('setMedia',{
					mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied:'mp3',
			wmode:'window'
		});
		
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			duration=e.jPlayer.status.duration;
			this.setState({
				progress:e.jPlayer.status.currentPercentAbsolute
			});
		});
	}
	componentWillUnMount(){
		$('#player').unbind($.jPlayer.event.timeupdate);
	}
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration*progress);
	}
	render(){
		return(
			<div>
				<Header />
				<Progress progress={this.state.progress}
					onProgressChange={this.progressChangeHandler}
					barColor="#ff0000"></Progress>
			</div>
		);
	}
}
export default Root;
//将app中所以的组件都包裹于root中