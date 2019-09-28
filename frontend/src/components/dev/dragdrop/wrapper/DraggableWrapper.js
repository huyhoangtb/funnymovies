// disabling flowtype to keep this example super simple

import React, { Component } from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import contentEditable from '../input-editable';
import { getItemStyle, getNodeInTreeByIid } from '../common';
import { Draggable } from 'react-beautiful-dnd';

const { Paragraph } = Typography;

export default class DraggableWrapper extends Component {


  render() {
    const node = this.props.node || {};
    const focusing = this.props.focusing;
    const { isDragDisabled, index, draggableId, type, isControl } = this.props;
    const EditableDIV = contentEditable('span');
    return (
      <Draggable
        type={type} isDragDisabled={isDragDisabled} key={node.iid} draggableId={node.iid || draggableId}
        index={index}
      >
        {(draggableProvided, draggableSnapshot) => {
          return (
            <div
              ref={draggableProvided.innerRef}
              className={`${isControl ? 'ui-content-control' : ''} ${isControl ? (focusing ? '' : 'display-none') : ''}`}
              {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}
              style={{
                ...getItemStyle(draggableSnapshot.isDragging, draggableProvided.draggableProps.style,
                   ),
              }}
            >
              <EditableDIV className="ui-editable-comp" value={node.name} />
              {this.props.children}
            </div>
          );
        }}
      </Draggable>
    );
  }
}


DraggableWrapper.propTypes = {
  node: PropTypes.object,
  index: PropTypes.number,
  isDragDisabled: PropTypes.bool,
  draggableId: PropTypes.string,
};
