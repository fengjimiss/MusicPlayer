import React from 'react'
import './progress.less'
class Progress extends React.Component{ //es6语法，每个单独成分不用加逗号
	constructor(props) {

		super(props);

		this.changeProgress = this.changeProgress.bind(this);

	}

	changeProgress(e){
		let progressBar=this.refs.progressBar;
		let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		console.log(progress);
	}

	render(){
		return(
			<div className="components-progress"   ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={{width:`${this.props.progress}%` }}></div>
			</div>
		);
	}
};
/*-col-auto表示只占用它内容的宽度*/
export default Progress;