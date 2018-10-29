import React from 'react';
import {
  Content,
  ContentTitle,
  ContentBody,
} from '../../pages/account-page.css';
import { Icon, Input } from 'genui';
import { Form, AppToaster } from '../../../common';
import { Company } from '../../store/types';
import { Intent, Button } from '@blueprintjs/core';

type Props = {
  user: any;
  company: Company;
  updateCompany(options: any): any;
  loading: boolean;
};

const CompanySettings: React.SFC<Props> = ({
  updateCompany,
  company,
  loading,
}) => {
  const handleSubmit = async (model: any) => {
    await updateCompany({
      variables: {
        id: company.id,
        name: model.companyName,
        address: model.address,
      },
    });
    AppToaster.show({
      icon: 'tick',
      message: 'Company settings was updated.',
      intent: Intent.SUCCESS,
    });
  };

  return (
    <Content>
      <ContentTitle>
        <Icon name="fas fa-cog" />
        Company Settings
      </ContentTitle>
      <ContentBody>
        <Form onValidSubmit={handleSubmit}>
          {formState => (
            <>
              <Form.Field
                name="companyName"
                label="Company Name"
                defaultValue={company.name}
                validations={{ isRequired: true }}
              >
                <Input placeholder="Company Name" disabled={loading} />
              </Form.Field>

              <Form.Field
                name="address"
                label="Address"
                defaultValue={company.address}
              >
                <Input placeholder="Address" disabled={loading} />
              </Form.Field>

              <Button
                type="submit"
                loading={loading}
                intent={Intent.PRIMARY}
                disabled={!formState.isValid || loading}
              >
                Save
              </Button>
            </>
          )}
        </Form>
      </ContentBody>
    </Content>
  );
};

export default CompanySettings;
