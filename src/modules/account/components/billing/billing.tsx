import React from 'react';
import { CreditCardForm } from './billing.css';
import { Input, Icon, Button, TableList, Label, List } from 'genui';
import {
  ContentBody,
  Content,
  ContentTitle,
} from '../../pages/account-page.css';
import { Company, SubscriptionStatus } from '../../store/types';
import { dateFormat, diff } from '../../../../utils/calendar';

// const invoices = [
//   {
//     id: 82131,
//     dateCreated: '30 Jun 2018',
//     status: <Label>Paid</Label>,
//     amount: '0.00 USD',
//     download: (
//       <a href="#">
//         <Icon name="fas fa-download" />
//       </a>
//     ),
//   },
// ];

type Props = {
  user: any;
  company: Company;
};

const Billing: React.SFC<Props> = ({ company }) => {
  return (
    <>
      <Content>
        <ContentTitle>
          <Icon name="fas fa-file" />
          Current Subscription
        </ContentTitle>
        <ContentBody>
          <List>
            <List.Item>
              Subscription status: <Label>{company.subscriptionStatus}</Label>{' '}
            </List.Item>
            <List.Item>
              {company.subscriptionStatus === SubscriptionStatus.Inactive ? (
                <>
                  Subscription ended:{' '}
                  <strong>
                    {dateFormat(company.subscriptionEnds, 'YYYY-MM-DD')}
                  </strong>
                </>
              ) : (
                <>
                  Subscription ends:{' '}
                  <strong>
                    {dateFormat(company.subscriptionEnds, 'YYYY-MM-DD')}
                  </strong>
                </>
              )}
            </List.Item>
          </List>
        </ContentBody>
      </Content>

      <Content>
        <ContentTitle>
          <Icon name="fas fa-file" />
          Invoices
        </ContentTitle>
        <ContentBody>
          {!company.invoices.length && <em>You have no invoices.</em>}
          {!!company.invoices.length && (
            <TableList
              headings={['ID', 'Date Created', 'Status', 'Amount', 'Download']}
              items={company.invoices.map(invoice => ({
                id: invoice.id,
                dateCreated: invoice.createdAt,
                status: <Label>{invoice.status}</Label>,
                amount: `${invoice.amount} USD`,
                download: (
                  <a href="#">
                    <Icon name="fas fa-download" />
                  </a>
                ),
              }))}
            />
          )}
        </ContentBody>
      </Content>

      <Content>
        <ContentTitle>
          <Icon name="fas fa-credit-card" /> Add Card
        </ContentTitle>
        <ContentBody>
          <p>
            Dashtime does not save any card information on our servers and
            cannot be used by our staff. Your credit card details are encrypted
            and securely stored by <em>Stripe</em>, to enable us to
            automatically bill your credit card on a recurring basis.
          </p>

          <p>
            Your account will be billed on <strong>10th November 2018.</strong>
          </p>

          <p>You do not have a card associated to your account.</p>

          <CreditCardForm>
            <h3>Payment Details</h3>
            <div className="field">
              <label>Name</label>
              <Input placeholder="Name on card" />
            </div>
            <div className="field">
              <label>Card number</label>
              <Input placeholder="Card number" />
            </div>
            <div
              className="field"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div>
                <label>Exp. month</label>
                <Input placeholder="MM" />
              </div>
              <div>
                <label>Exp. year</label>
                <Input placeholder="YYYY" />
              </div>
              <div>
                <label>CV Code</label>
                <Input placeholder="CVV" />
              </div>
            </div>

            <Button color="blue">Add card</Button>
          </CreditCardForm>
        </ContentBody>
      </Content>
    </>
  );
};

export default Billing;
