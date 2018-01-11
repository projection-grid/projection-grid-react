import React from 'react';
import PropTypes from 'prop-types';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      value: props.value,
    };

    this.enableEditing = this.enableEditing.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  enableEditing() {
    this.setState({
      isEditing: true,
    });
  }

  render() {
    const staticCell = (
      <div
        className="glyphicon glyphicon-pencil"
        onClick={this.enableEditing}
        onKeyPress={(e) => {
          if (e.keyCode === 13) {
            this.enableEditing();
          }
        }}
        tabIndex="0"
        role="button"
      >
        {this.props.value}
      </div>
    );

    const editableCell = (
      <div>
        <input
          value={this.state.value}
          className="form-control"
          onChange={this.onChange}
        />
        <div className="btn-group" role="group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={(e) => {
              e.preventDefault();

              this.props.onValueChanged(this.state.value);

              this.setState({
                isEditing: false,
              });
            }}
          >Done
          </button>
          <button
            className="btn btn-default"
            type="button"
            onClick={(e) => {
              e.preventDefault();

              this.setState({
                isEditing: false,
              });
            }}
          >Cancel
          </button>
        </div>
      </div>
    );

    return (
      <div>
        {this.state.isEditing ? editableCell : staticCell}
      </div>
    );
  }
}

EditableCell.propTypes = {
  value: PropTypes.string,
  onValueChanged: PropTypes.func.isRequired,
};

EditableCell.defaultProps = {
  value: '',
};

export default EditableCell;
