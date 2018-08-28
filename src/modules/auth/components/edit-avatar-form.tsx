import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Input, Button } from 'genui';

// import { Form, ImageUploader } from '../../common';
import { User } from '../../users/store/models';
import { uploadProfileImage } from '../store/actions';
import { Uploader } from '../../common';

type Props = {
  initialValues: User;
  uploadProfileImage(image: File): any;
  onUpdateProfile(data: any): any;
};

class EditAvatarForm extends Component<Props> {
  // handleSubmit = (model: any) => {
  //   const data = {
  //     ...model,
  //     id: this.props.initialValues.id,
  //   };

  //   this.props.onUpdateProfile(data);
  // };

  onDrop = () => {};

  handleUpload = (image: File) => {
    this.props.uploadProfileImage(image);
  };

  render() {
    return (
      <Uploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        onUpload={this.handleUpload}
        singleImage={true}
        withPreview={true}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />
    );

    // return (
    //   <div>
    //     <Form onValidSubmit={this.handleSubmit}>
    //       {formState => (
    //         <>
    //           <Form.Field
    //             name="image"
    //             label="Image URL"
    //             validations={{ isRequired: true }}
    //           >
    //             <Input placeholder="http://" />
    //           </Form.Field>

    //           <Button type="submit" color="green" disabled={!formState.isValid}>
    //             Save
    //           </Button>
    //         </>
    //       )}
    //     </Form>
    //   </div>
    // );
  }
}

export default connect(
  undefined,
  (dispatch: any) => bindActionCreators({ uploadProfileImage }, dispatch)
)(EditAvatarForm);
