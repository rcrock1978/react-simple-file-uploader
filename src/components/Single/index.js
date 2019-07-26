import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ImagePlaceholder from '../../assets/images/placeholderImage.png';

class Single extends PureComponent {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleLoadImageerror = this.handleLoadImageerror.bind(this);
  }

  onChange(e) {
    const file = e.target.files[0];

    const {
      onChange,
    } = this.props;

    if (file) {
      file.preview = /^(image)\//i.test(file.type)
        ? window.URL.createObjectURL(file)
        : ImagePlaceholder;
    }

    onChange(file);
  }

  handleLoadImageerror(e) {
    const {
      imageErrorPlaceholder,
    } = this.props;

    if (imageErrorPlaceholder) {
      e.target.className = 'avatar-placeholder';
      e.target.src = imageErrorPlaceholder;
    }
  }

  openFileDialog() {
    const {
      disabled,
    } = this.props;

    if (disabled) return;
    this.fileInputRef.current.click();
  }

  render() {
    const {
      file: {
        name,
        preview,
      },
      labels: {
        chooseFile: chooseFileLabel,
        infoText: infoTextLabel,
      },
    } = this.props;

    return (
      <div className="single">
        <div
          className="preview-file"
          onKeyPress={this.openFileDialog}
          onClick={this.openFileDialog}
          role="button"
          tabIndex="0"
        >
          <img src={preview} alt={name} onError={this.handleLoadImageerror} />
        </div>
        <div className="file__controllers">
          <div
            className="btn"
            onKeyPress={this.openFileDialog}
            onClick={this.openFileDialog}
            role="button"
            tabIndex="0"
          >
            {name || chooseFileLabel}
            <input
              ref={this.fileInputRef}
              className="dropzone__file__input"
              type="file"
              onChange={this.onChange}
            />
          </div>
          <span>
            {infoTextLabel}
          </span>
        </div>
      </div>
    );
  }
}

Single.defaultProps = {
  disabled: false,
  imageErrorPlaceholder: undefined,
  file: {
    name: undefined,
    preview: undefined,
  },
};

Single.propTypes = {
  disabled: PropTypes.bool,
  file: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      preview: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  imageErrorPlaceholder: PropTypes.string,
  labels: PropTypes.shape({
    chooseFile: PropTypes.string.isRequired,
    infoText: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Single;
