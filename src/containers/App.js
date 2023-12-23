import React , {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';
import {setSearchField,requestRobotsAction} from '../actions';

const mapStateToProps = state =>{
	return {
		searchField: state.searchRobots.searchField,
		robots:state.requestRobots.robots,
		isPending:state.requestRobots.isPending,
		error:state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
		onRequestRobots:()=>dispatch(requestRobotsAction())
	}
}
class App extends Component{
	
	componentDidMount() {
		this.props.onRequestRobots()
	}

	render(){
		
		const {searchField,onSearchChange,robots,isPending}=this.props;
		const filterRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<div className="loader-wrapper">
		        <div className="loader"></div>
		    </div> :
			(
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filterRobots}/>
						</ErrorBoundry>
					</Scroll>
				</div> 
			);		
	}	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);