import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { User } from '../../users/store/models';
import { Uploader } from '../../common';
import { UPDATE_USER } from '../../users/store/mutations';
import { API_ENDPOINT_FILE } from '../../../config/constants';

type Props = {
  initialValues: User;
};
type DataProps = {
  updateUser(options: any): any;
};
type EnhancedProps = Props & DataProps;

class EditAvatarForm extends Component<EnhancedProps> {
  onDrop = () => {};

  handleUpload = (image: File) => {
    const data = new FormData();
    data.append('data', image);

    fetch(API_ENDPOINT_FILE, {
      method: 'POST',
      body: data,
    })
      .then(response => {
        return response.json();
      })
      .then(file => {
        this.props.updateUser({
          variables: {
            imageId: file.id,
            id: this.props.initialValues.id,
          },
        });
      });
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
  }
}

const enhance = compose<EnhancedProps, Props>(
  graphql(UPDATE_USER, { name: 'updateUser' })
);

export default enhance(EditAvatarForm);
