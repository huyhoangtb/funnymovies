import React, { Component } from 'react';
import { Icon } from 'antd';
import DraggableWrapper from './wrapper/DraggableWrapper';
import DroppableWrapper from './wrapper/DroppableWrapper';

export default class RecursiveDragDrop extends Component {

  state = { focusing: false }
  onMouseEnter = (event) => {
    const node = this.props.node || {};
    this.setState({ focusing: true, focusingNode: node });
  }

  onMouseLeave = (event) => {
    this.setState({ focusing: false, focusingNode: undefined });
  }

  render() {
    const treeNodes = this.props.treeNodes || [];
    const node = this.props.node || {};
    return (
      <div
        className={'ui-recursive-panel'}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {treeNodes.map((node, index) => (
          <div className={`${node.children && node.children.length > 0 ? 'ui-drop-panel' : ''}`} key={node.iid}>
            <DraggableWrapper node={node} index={index}>
              {node.children && node.children.length > 0 && (

                <DroppableWrapper node={node} type="child">
                  <RecursiveDragDrop node={node} treeNodes={node.children} />
                </DroppableWrapper>

              )}
            </DraggableWrapper>
          </div>
        ))
        }
        <DraggableWrapper
          isControl focusing={this.state.focusing} isDragDisabled
          draggableId={`add_to:${node.iid || 'root'}`} index={treeNodes.length}
        >
          <Icon className="ui-control-item" type="play-circle" />
          <Icon className="ui-control-item" type="file-text" />
          <Icon className="ui-control-item" type="container" />
          <Icon className="ui-control-item" type="file-pdf" />
          <Icon className="ui-control-item" type="question-circle" />
        </DraggableWrapper>
      </div>
    );
  }
}
