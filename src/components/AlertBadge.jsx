import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  show: state.notification.show,
  title: state.notification.title,
  description: state.notification.description,
  variant: state.notification.variant,
});

@connect(mapStateToProps, actionCreators)
class AlertBadge extends React.Component {
  onClose = () => {
    const { closeAlert } = this.props;
    closeAlert();
  }

  render() {
    const {
      show, title, variant, description,
    } = this.props;
    return (
      <Alert dismissible variant={variant} show={show} onClose={this.onClose}>
        <Alert.Heading>{title}</Alert.Heading>
        {description && <p>{description}</p>}
      </Alert>
    );
  }
}

export default AlertBadge;
