import React, { Component } from 'react';
import { Form, BackButton } from '../../common';
import { Input, Button } from 'genui';
import { TicketPriority, TicketStatus } from '../store/types';
import { Query, graphql } from 'react-apollo';
import { LOGGED_IN_USER } from 'src/modules/auth/store/queries';

type Props = {
  createTicket(options: any): any;
};
type EnhancedProps = {
  data: any;
} & Props;

class CreateTicket extends Component<EnhancedProps> {
  handleSubmit = (model: any) => {
    this.props.createTicket({
      variables: {
        title: model.title,
        ownerId: this.props.data.user.id,
        type: model.type,
        status: TicketStatus.Pending,
        priority: TicketPriority.Medium,
        description: model.description,
      },
    });
  };

  render() {
    return (
      <div>
        <h3>Create Ticket</h3>

        <Form onValidSubmit={this.handleSubmit}>
          {formState => (
            <>
              <Form.Field
                name="title"
                label="Title"
                type="text"
                validations={{ isRequired: true }}
              >
                <Input placeholder="Ticket title" />
              </Form.Field>

              <Form.Field
                name="description"
                label="Description"
                type="text"
                validations={{ isRequired: true }}
              >
                <Input placeholder="Ticket description" multiline />
              </Form.Field>

              <Form.Field
                name="type"
                label="Type"
                type="text"
                defaultValue="Question"
                validations={{ isRequired: true }}
              >
                <Input placeholder="Ticket type" />
              </Form.Field>

              <Button type="submit" color="green" disabled={!formState.isValid}>
                Save
              </Button>
              <BackButton>Cancel</BackButton>
            </>
          )}
        </Form>
      </div>
    );
  }
}

export default graphql<Props>(LOGGED_IN_USER)(CreateTicket);
