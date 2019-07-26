import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropzone from './components/Dropzone';
import Single from './components/Single';

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(files) {
    const {
      input: {
        onChange: inputOnChange,
      },
      onChange,
    } = this.props;

    onChange(files);
    inputOnChange(files);
  }

  render() {
    const {
      id,
      disabled,
      input: {
        value: files,
      },
      imageErrorPlaceholder,
      labels: {
        name: nameLabel,
        chooseFile: chooseFileLabel,
        uploadFile: uploadFileLabel,
        infoText: infoTextLabel,
      },
      maxSize,
      meta: {
        error,
        touched,
      },
      multiple,
    } = this.props;

    return (
      <div className="file__upload">
        <span className="form__label">
          {nameLabel}
          <div className="form__input">
            {multiple && (
              <Dropzone
                id={id}
                disabled={disabled}
                files={Array.isArray(files)
                  ? files
                  : []
                }
                labels={{
                  chooseFile: chooseFileLabel,
                  uploadFile: uploadFileLabel,
                }}
                maxSize={maxSize}
                onChange={this.handleOnChange}
              />
            )}
            {!multiple && (
              <Single
                id={id}
                disabled={disabled}
                file={files}
                imageErrorPlaceholder={imageErrorPlaceholder}
                labels={{
                  chooseFile: chooseFileLabel,
                  infoText: infoTextLabel,
                }}
                maxSize={maxSize}
                onChange={this.handleOnChange}
              />
            )}
          </div>
        </span>
        {touched && error && (
          <span
            className="form__input--error"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
}

FileUpload.defaultProps = {
  disabled: false,
  imageErrorPlaceholder: undefined,
  input: {
    onChange: () => {},
  },
  meta: {
  },
  multiple: false,
  onChange: () => {},
};

FileUpload.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  imageErrorPlaceholder: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.shape({}),
      PropTypes.string,
    ]),
  }),
  labels: PropTypes.shape({
    name: PropTypes.string,
    chooseFile: PropTypes.string,
    uploadFile: PropTypes.string.isRequired,
    infoText: PropTypes.string,
  }).isRequired,
  maxSize: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FileUpload;
