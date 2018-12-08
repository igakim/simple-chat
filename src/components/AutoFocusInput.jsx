import React from 'react';
import { Field } from 'redux-form';

export default class AutoFocusInput extends React.Component {
  componentDidMount() {
    this.input.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.input.getRenderedComponent().focus();
  }

  render() {
    const { submitting } = this.props;
    console.log(this.props);
    return (
      <Field
        type="text"
        name="message"
        component="input"
        className="form-control"
        autoComplete="off"
        ref={(el) => { this.input = el; }}
        withRef
        required
        disabled={submitting}
      />
    );
  }
}
