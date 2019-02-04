import React, {
  Component
} from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

class App extends Component {
  render() {
    return (
      <div className="App">
		      <ContentBrowser />
      </div>
    );
  }
}

class ContentBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allContent: {
        "Debates": {
          "Military aid": {
            "This is fun!": null
          }
        },
        "Debaters": {
          "Matthew Casertano": {}
        }
      }
    };
  }
  render() {
    return (<table><tbody>
	<tr><td colSpan="4">
	<center><h1>Circuit Debater 2.0</h1></center>
      </td></tr>
      <tr><td colSpan="1">
<ul>
{Object.keys(this.state.allContent).map(i=>(
<ContentList content={i}
tree={JSON.parse(JSON.stringify(this.state.allContent[i]))} 
fullscreen={this.fullContentFactory()} 
/>
))}
</ul>
  </td>
  <td colSpan="3">
    <PageViewer hello={Math.random()} content={this.state.fullContent}/>
  </td></tr></tbody></table>);
  }
  fullContentFactory() { //TODO: Add web requests
    let allKeys = [];
    let minKeys = (index) => { //Taks in an index and reduces the list of nodes to through that index
      allKeys = [...allKeys].splice(0, index);
      return maxKeys; //Returns the function to add to the list of nodes
    }
    let maxKeys = (key) => {
      allKeys.push(key);
      let currentObj = this.state.allContent;
      allKeys.map(i => {
        currentObj = currentObj[i];
      });
      if (currentObj === undefined) {
        this.setState({
          fullContent: key + ": Lorem ipsum dolor sit amet "
        });
      }
      let propIndex = allKeys.length - 1;
      return () => minKeys(propIndex);
    }
    return maxKeys;
  }

}
class ContentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      content: props.content,
      tree: props.tree,
      fullscreen: props.fullscreen,
      fullContent:null
    };
  }
  render() {
    return <li>
		    <p onClick={()=>this.expand()}>{this.state.content}</p>
		    {this.state.expanded&&this.state.tree?<ul>{
		Object.keys(this.state.tree).map(i=>
			<ContentList key={i} content={i} fullscreen={this.state.fullscreen} tree={this.state.tree[i]}/>
		)
		}
		    </ul>:undefined}
</li>

  }
  expand() {
    this.setState({
      expanded: !this.state.expanded,
      fullscreen: this.state.fullscreen(this.state.content)
    });
  }
}
class PageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content
    };
  }
  render() {
    return <div>
      <p>Hello</p>
      <ReactMarkdown source={this.props.content}/>
    </div>;
  }
  clear() {
    this.setState({
      content: ""
    });
  }
}

export default App;
