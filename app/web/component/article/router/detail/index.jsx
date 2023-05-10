import React, { Component } from 'react';
import * as qs from 'querystring-es3';

export default class Detail extends Component {
  render() {
    const { location } = this.props.history;
    const { title, url } = qs.parse(location.search.slice(1));
    return (
      <div>
        <h1 className="detail-title">{title}</h1>
        <div>12312</div>
      </div>
    );
  }
}
