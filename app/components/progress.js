import React from 'react'
import './progress.less'
class Progress extends React.Component{ //es6语法，每个单独成分不用加逗号
	getDefaultProps(){
		return{
			barColor:'#2f9842'
		}
	}
	constructor(props) {

		super(props);

		this.changeProgress = this.changeProgress.bind(this);

	}

	changeProgress(e){
		console.log('aaaa');
		let progressBar=this.refs.progressBar;
		let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress); //前半句为不必要的
	}

	render(){
		return(
			<div className="components-progress"   ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%` ,background:this.props.barColor}}></div>
			</div>
		);
	}
};
/*-col-auto表示只占用它内容的宽度*/
export default Progress;