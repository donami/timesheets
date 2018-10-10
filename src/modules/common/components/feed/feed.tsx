import React, { Component } from 'react';

import FeedItem from './feed-item';
import FeedText from './feed-text';
import FeedDate from './feed-date';
import FeedSummary from './feed-summary';
import FeedLabel from './feed-label';
import FeedContent from './feed-content';
import FeedTitle from './feed-title';

type Props = {
  className?: string;
};

class Feed extends Component<Props> {
  static Item = FeedItem;
  static Content = FeedContent;
  static Label = FeedLabel;
  static Summary = FeedSummary;
  static Text = FeedText;
  static Date = FeedDate;
  static Title = FeedTitle;

  render() {
    const className = this.props.className
      ? `feed ${this.props.className}`
      : 'feed';

    return <div className={className}>{this.props.children}</div>;
  }
}

export default Feed;
