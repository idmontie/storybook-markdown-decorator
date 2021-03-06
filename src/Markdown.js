import React, { Component } from 'react';

let Markdown = null;

if (process.env.STORYBOOK_GIT_BRANCH) {
  const ReactMarkdown = require('react-markdown');
  const { default: LinkRenderer } = require('./LinkRenderer');
  const { default: injectJS } = require('./injectJS');

  Markdown = class Wrapper extends Component {
    constructor(props) {
      super(props);

      this.id = Math.trunc(Math.random() * 10000) + '-' + Math.trunc(Math.random() * 10000) + '-' + Math.trunc(Math.random() * 10000);
    }

    componentDidMount() {
      injectJS(() => {
        const els = document.getElementById(this.id).querySelectorAll('pre code') || [];

        els.forEach(function (block) {
          window.hljs.highlightBlock(block);
        });
      });
    }

    render() {
      const { docs } = this.props;

      return (
        <div id={this.id}>
          <ReactMarkdown
            source={docs}
            renderers={{
              Link: LinkRenderer
            }}
          />
        </div>
      );
    }
  };
}

export default Markdown;
