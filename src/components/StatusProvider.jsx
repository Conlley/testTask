import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import * as STATUS from '../constants/status';

const { Provider: StatusProvider, Consumer: StatusConsumer } = createContext(STATUS.DEFAULT());

import './styles/StatusProvider.css';

const Failure = ({ message }) => (
  <section className="failure failure-section">
    <h3 className="failure-section-message">{message}</h3>
  </section>
);

Failure.propTypes = {
  message: PropTypes.string
};

const Loading = ({ message }) => (
  <section className="loading loading-section">
    <h3 className="loading-section-message">{message}</h3>
  </section>
);

Loading.propTypes = {
  message: PropTypes.string
};

const StatusOverlay = ({ children, status: { value: componentStatusValue, message: componentStatusMessage } }) => (
  <StatusConsumer>
    {({ value: providerStatusValue, message: providerStatusMessage }) => {
      const value = componentStatusValue || providerStatusValue;
      const message = componentStatusMessage || providerStatusMessage;

      if (value === STATUS.LOADING().value) return <Loading message={message} />;
      if (value === STATUS.FAILURE().value) return <Failure message={message} />;

      return children();
    }}
  </StatusConsumer>
);

StatusOverlay.defaultProps = {
  status: STATUS.DEFAULT()
};

StatusOverlay.propTypes = {
  children: PropTypes.func
};

export {
  StatusProvider,
  StatusOverlay
};
