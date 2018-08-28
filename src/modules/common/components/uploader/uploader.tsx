import React from 'react';
import FlipMove from 'react-flip-move';

import './index.css';
import UploadIcon from './UploadIcon.svg';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%',
};

type Props = {
  style?: any;
  className?: string;
  onChange?: Function;
  onUpload?(images: File | File[]): void;
  onDelete?: Function;
  buttonClassName?: string;
  buttonStyles?: any;
  buttonType?: string;
  withPreview?: boolean;
  accept?: string;
  name?: string;
  withIcon?: boolean;
  buttonText?: string;
  withLabel?: boolean;
  label?: string;
  labelStyles?: any;
  labelClass?: string;
  imgExtension?: any[];
  maxFileSize?: number;
  fileSizeError?: string;
  fileTypeError?: string;
  errorClass?: string;
  errorStyle?: any;
  singleImage?: boolean;
  defaultImage?: string;
};

type State = {
  pictures: any[];
  files: File[];
  notAcceptedFileType: any[];
  notAcceptedFileSize: any[];
};

class Uploader extends React.Component<Props, State> {
  state: State = {
    pictures: [],
    files: [],
    notAcceptedFileSize: [],
    notAcceptedFileType: [],
  };

  static defaultProps = {
    className: '',
    buttonClassName: '',
    buttonStyles: {},
    withPreview: false,
    accept: 'image/*',
    name: '',
    withIcon: true,
    buttonText: 'Choose images',
    buttonType: 'button',
    withLabel: true,
    label: 'Max file size: 5mb, accepted: jpg|gif|png',
    labelStyles: {},
    labelClass: '',
    imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
    maxFileSize: 5242880,
    fileSizeError: ' file size is too big',
    fileTypeError: ' is not a supported file extension',
    errorClass: '',
    style: {},
    errorStyle: {},
    singleImage: false,
    onChange: () => {},
    defaultImage: '',
  };
  inputElement: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      pictures: props.defaultImage ? [props.defaultImage] : [],
      files: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
    };

    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    if (prevState.files !== this.state.files && this.props.onChange) {
      this.props.onChange(this.state.files, this.state.pictures);
    }
  }

  /*
   Load image at the beggining if defaultImage prop exists
   */
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultImage) {
      this.setState({ pictures: [nextProps.defaultImage] });
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName: string) {
    if (this.props.imgExtension) {
      const pattern =
        '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
      return new RegExp(pattern, 'i').test(fileName);
    }
    const pattern =
      '(' +
      ['.jpg', '.jpeg', '.gif', '.png'].join('|').replace(/\./g, '\\.') +
      ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Handle file validation
   */
  onDropFile(e: any) {
    const files = e.target.files;
    const allFilePromises = [];
    const maxFileSize = this.props.maxFileSize || 5242880;

    // Iterate over all uploaded files
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        const newArray = this.state.notAcceptedFileType.slice();
        newArray.push(f.name);
        this.setState({ notAcceptedFileType: newArray });
        continue;
      }
      // Check for file size
      if (f.size > maxFileSize) {
        const newArray = this.state.notAcceptedFileSize.slice();
        newArray.push(f.name);
        this.setState({ notAcceptedFileSize: newArray });
        continue;
      }

      allFilePromises.push(this.readFile(f));
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = this.state.pictures.slice();
      const files = this.state.files.slice();

      newFilesData.forEach((newFileData: any) => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });

      this.setState({ files, pictures: dataURLs }, () => {
        this.props.onChange &&
          this.props.onChange(this.state.files, this.state.pictures);
      });
    });
  }

  onUploadClick(e: any) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
  readFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function(e: any) {
        // Add the file name to the data URL
        if (e && e.target && e.target.result) {
          let dataURL = e.target.result;
          dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
          resolve({ file, dataURL });
        }
        reject('Error');
      };

      reader.readAsDataURL(file);
    });
  }

  /*
   Remove the image from state
   */
  removeImage(picture: any) {
    const removeIndex = this.state.pictures.findIndex(e => e === picture);
    const filteredPictures = this.state.pictures.filter(
      (e, index) => index !== removeIndex
    );
    const filteredFiles = this.state.files.filter(
      (e, index) => index !== removeIndex
    );

    this.setState({ pictures: filteredPictures, files: filteredFiles }, () => {
      this.props.onChange &&
        this.props.onChange(this.state.files, this.state.pictures);
    });
  }

  /*
   Check if any errors && render
   */
  renderErrors() {
    let notAccepted: any = '';
    if (this.state.notAcceptedFileType.length > 0) {
      notAccepted = this.state.notAcceptedFileType.map((error, index) => {
        return (
          <div
            className={'errorMessage ' + this.props.errorClass}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileTypeError}
          </div>
        );
      });
    }
    if (this.state.notAcceptedFileSize.length > 0) {
      notAccepted = this.state.notAcceptedFileSize.map((error, index) => {
        return (
          <div
            className={'errorMessage ' + this.props.errorClass}
            key={index}
            style={this.props.errorStyle}
          >
            * {error} {this.props.fileSizeError}
          </div>
        );
      });
    }
    return notAccepted;
  }

  /*
   Render the upload icon
   */
  renderIcon() {
    if (this.props.withIcon) {
      return <img src={UploadIcon} className="uploadIcon" alt="Upload Icon" />;
    }
    return null;
  }

  /*
   Render label
   */
  renderLabel() {
    if (this.props.withLabel) {
      return (
        <p className={this.props.labelClass} style={this.props.labelStyles}>
          {this.props.label}
        </p>
      );
    }
    return null;
  }

  /*
   Render preview images
   */
  renderPreview() {
    return (
      <div className="uploadPicturesWrapper">
        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {this.renderPreviewPictures()}
        </FlipMove>
      </div>
    );
  }

  renderPreviewPictures() {
    return this.state.pictures.map((picture, index) => {
      return (
        <div key={index} className="uploadPictureContainer">
          <div
            className="deleteImage"
            onClick={() => this.removeImage(picture)}
          >
            X
          </div>
          <img src={picture} className="uploadPicture" alt="preview" />
        </div>
      );
    });
  }

  /*
   On button click, trigger input file to open
   */
  triggerFileUpload() {
    this.inputElement.click();
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.files.length === 0 || !this.props.onUpload) {
      return;
    }

    if (this.props.singleImage) {
      this.props.onUpload(this.state.files[0]);
    } else {
      this.props.onUpload(this.state.files);
    }

    this.setState({
      pictures: [],
      files: [],
    });
  };

  render() {
    const { pictures } = this.state;
    const {
      singleImage,
      buttonText,
      buttonClassName,
      buttonStyles,
      buttonType,
      onUpload,
    } = this.props;

    return (
      <div
        className={'fileUploader ' + this.props.className}
        style={this.props.style}
      >
        <div className="fileContainer">
          {!(pictures.length > 0 && singleImage) && (
            <>
              {this.renderIcon()}
              {this.renderLabel()}
            </>
          )}
          <div className="errorsContainer">{this.renderErrors()}</div>

          {!(pictures.length > 0 && singleImage) && (
            <button
              type={buttonType}
              className={`chooseFileButton ${buttonClassName}`}
              style={buttonStyles}
              onClick={this.triggerFileUpload}
              disabled={singleImage && pictures.length > 0}
            >
              {buttonText}
            </button>
          )}

          <input
            type="file"
            ref={input => (this.inputElement = input)}
            name={this.props.name}
            multiple={!this.props.singleImage}
            onChange={this.onDropFile}
            onClick={this.onUploadClick}
            accept={this.props.accept}
          />
          {this.props.withPreview ? this.renderPreview() : null}

          {pictures.length > 0 &&
            onUpload && (
              <button
                className={`chooseFileButton ${buttonClassName} submitButton`}
                style={buttonStyles}
                onClick={this.handleSubmit}
              >
                Upload
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default Uploader;
