import React from 'react'
import './header.less'
class Header extends React.Component{
	render(){
		return(
			<div className="components-header row">
				<img src="./static/images/logo.png" width="40" alt="" className="-col-auto" />
				<h1 className="caption">小云の音乐空间</h1>
			</div>
		);
	}
};
/*-col-auto表示只占用它内容的宽度*/
export default Header;