import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

// type Props = {
//   // addPost: any;
// };

class TestComp extends Component<any> {
  // componentWillMount() {
  //   this.props.addPost({ description: 'desc', imageUrl: 'hello' });
  // }
  render() {
    return <div>TestComp</div>;
  }
}

// const addMutation = gql`
//   mutation addUser($name: String!) {
//     createUser(name: $name) {
//       id
//       name
//     }
//   }
// `;

// export default graphql(addMutation, {
//   props: ({ ownProps, mutate }) => ({
//     addPost: ({ description, imageUrl }: any) => {
//       if (!mutate) {
//         return;
//       }
//       return mutate({
//         variables: { name: 'hello' },
//       });
//     },
//   }),
// })(TestComp);

const userListQuery = gql`
  query allUsers {
    allUsers {
      name
    }
  }
`;

export default compose(graphql(userListQuery))(TestComp);
