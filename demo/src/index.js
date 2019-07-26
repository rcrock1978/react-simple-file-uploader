import React, {Component} from 'react'
import {render} from 'react-dom'

import FileUpload from '../../src'

import ImagePlaceholder from './fa-image.png';

const TwoMb = "2097153";

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multiFiles: undefined,
      singleFile: undefined,
    }
  }

  render() {
    const {
      multiFiles,
      singleFile,
    } = this.state;

    return (
      <div>
        <FileUpload
          id="multi_upload_attachments"
          accept={['*']}
          labels={{
            uploadFile: 'Upload by clicking on this or drag and drop',
            name: 'Multi react-simple-file-uploader Demo',
            maxSize: 'maxSizeLabel',
          }}
          maxSize={TwoMb}
          multiple
          input={{
            onChange: changed => this.setState({ multiFiles: changed }),
            value: multiFiles,
          }}
          name="attachments"
        />
        <hr style={{
          margin: '100px 10px'
        }}/>
        <FileUpload
          id="single_upload_attachments"
          accept={['*']}
          imageErrorPlaceholder={ImagePlaceholder}
          labels={{
            chooseFile: 'Choose yout file',
            infoText: 'I am informing something',
            name: 'Single react-simple-file-uploader Demo',
            uploadFile: 'Upload',
          }}
          maxSize={TwoMb}
          name="attachments"
          input={{
            onChange: changed => this.setState({singleFile: changed}),
            value: singleFile,
          }}
        />
     </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
