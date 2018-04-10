import React from 'react';
import Header from './components/header'
import Player from './page/player' 
import MusicList from './page/musiclist' 
import { MUSIC_LIST } from './config/musiclist'
import { Router, IndexRoute, Link, Route,hashHistory } from 'react-router'
//import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Pubsub from 'pubsub-js'

class App extends React.Component{             /*es5语法，每个单独成分要加逗号*/
	constructor(props){
		super(props);
		this.state={
			musicList:MUSIC_LIST,
			currentMusicItem: MUSIC_LIST[0]
		};
		
		//return{} 在构造器中不能使用return
	}
	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3:musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		});
	}
	playNext(type = "next"){
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicListLength = this.state.musicList.length
		if (type === 'next') {
			newIndex = (index + 1) % musicListLength;//为防止当前播放为最后一首再进行播放下一曲操作的时候数组溢出
		} else {
			newIndex = (index - 1 + musicListLength) % musicListLength;//播放下一曲
		}
		this.playMusic(this.state.musicList[newIndex]);
	}
	findMusicIndex(musicItem) {//找到当前音乐在音乐列表的位置,这index会在很多其他地方也会用到，所以把它单独拎出来
		return this.state.musicList.indexOf(musicItem);
	}
	componentDidMount(){
		$('#player').jPlayer({
			supplied:'mp3',
			wmode:'window'
		});
		this.playMusic(this.state.currentMusicItem);
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem)=>{
			this.setState({
				musicList:this.state.musicList.filter(item => {
					return item !== musicItem;
				})
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem)=>{
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', (msg, musicItem)=>{
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem)=>{
			this.playNext();
		});
	}
	componentWillUnMount(){
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		$('#Player').unbind($.jPlayer.event.ended);
	}
	
	render(){
		return (
			<div>
				<Header />				
				{React.cloneElement(this.props.children, this.state)}
				
			</div>
		);
	}
}
class Root extends React.Component{   
	render(){
		return(
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Player}></IndexRoute>   
				<Route path="/myMusic" component={MusicList}></Route>
			</Route>
		</Router>
		
		);
	}
}
export default Root;
//将app中所以的组件都包裹于root中
/*<MusicList
		currentMusicItem={this.state.currentMusicItem}
		musicList={this.state.musicList}
></MusicList>*/				