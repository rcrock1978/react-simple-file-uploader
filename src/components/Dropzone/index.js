import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImagePlaceholder from '../../assets/images/placeholderImage.png';

const setPreview = (oldFile) => {
  const file = oldFile;

  if (file) {
    file.preview = /^(image)\//i.test(file.type)
      ? window.URL.createObjectURL(file)
      : ImagePlaceholder;
  }

  return file;
};

class Dropzone extends Component {
  constructor(props) {
    super(props);

    const {
      files,
    } = props;

    this.state = {
      hightlight: false,
      files,
    };

    this.fileInputRef = React.createRef();

    this.handleRemove = this.handleRemove.bind(this);
    this.onAddFileChange = this.onAddFileChange.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.renderImagePreview = this.renderImagePreview.bind(this);
  }

  onDrop(event) {
    event.preventDefault();

    const {
      disabled,
    } = this.props;

    if (disabled) return;

    const {
      dataTransfer: {
        files,
      },
    } = event;

    this.onAddFileChange({ target: { files } });
    this.setState({ hightlight: false });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDragOver(event) {
    event.preventDefault();
    const {
      disabled,
    } = this.props;

    if (disabled) return;
    this.setState({ hightlight: true });
  }

  onAddFileChange({
    target: {
      files,
    },
  }) {
    const {
      disabled,
      onChange,
    } = this.props;

    if (disabled) return;

    const {
      files: stateFiles,
    } = this.state;

    const newFiles = stateFiles.concat(Array.from(files).map(setPreview));

    this.setState({
      files: newFiles,
    }, () => {
      onChange(newFiles);
    });
  }

  openFileDialog() {
    const {
      disabled,
    } = this.props;

    if (disabled) return;
    this.fileInputRef.current.click();
  }

  handleRemove(event, indexToRemove) {
    event.stopPropagation();

    const {
      onChange,
    } = this.props;
    const {
      files: stateFiles,
    } = this.state;

    const files = stateFiles.filter(
      (item, index) => index !== indexToRemove,
    );

    this.setState({
      files,
    }, () => {
      onChange(files);
    });
  }

  renderImagePreview({
    name: fileName,
    preview,
  }, index) {
    return (
      <div className="multi-preview-file" key={index}>
        <div
          className="btn--remove"
          onClick={e => this.handleRemove(e, index)}
          onKeyPress={e => this.handleRemove(e, index)}
          role="button"
          tabIndex="0"
        />
        <img src={preview} alt={fileName} />
        <div className="file-name">
          {fileName}
        </div>
      </div>
    );
  }

  render() {
    const {
      disabled,
      labels: {
        uploadFile: uploadFileLabel,
      },
    } = this.props;
    const {
      files,
      hightlight,
    } = this.state;

    const dropzoneStyle = {
      cursor: disabled ? 'default' : 'pointer',
    };

    return (
      <div
        className={`dropzone ${hightlight ? 'dropzone--highlight' : ''}`}
        draggable
        onClick={this.openFileDialog}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onKeyPress={this.openFileDialog}
        role="button"
        style={dropzoneStyle}
        tabIndex="0"
      >
        <input
          ref={this.fileInputRef}
          className="dropzone__file__input"
          type="file"
          multiple
          onChange={this.onAddFileChange}
        />
        {!!files.length && (
          files.map(this.renderImagePreview)
        )}
        <span>
          {uploadFileLabel}
        </span>
      </div>
    );
  }
}

Dropzone.defaultProps = {
  disabled: false,
  files: [],
  onChange: () => {},
};

Dropzone.propTypes = {
  disabled: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  })),
  labels: PropTypes.shape({
    uploadFile: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

export default Dropzone;
