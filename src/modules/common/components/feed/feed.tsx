import React, { Component } from 'react';

import FeedItem from './feed-item';
import FeedText from './feed-text';
import FeedDate from './feed-date';
import FeedSummary from './feed-summary';
import FeedLabel from './feed-label';
import FeedContent from './feed-content';

type Props = {};

class Feed extends Component<Props> {
  static Item = FeedItem;
  static Content = FeedContent;
  static Label = FeedLabel;
  static Summary = FeedSummary;
  static Text = FeedText;
  static Date = FeedDate;

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Feed;
