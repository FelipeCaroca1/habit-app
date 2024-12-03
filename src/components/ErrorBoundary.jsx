import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Actualiza el estado para renderizar la UI de respaldo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error atrapado por ErrorBoundary:", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // UI de respaldo
      return (
        <div className="bg-red-800 text-white p-4 rounded-md">
          <h1>¡Ups! Algo salió mal.</h1>
          <p>Por favor, recarga la página o inténtalo más tarde.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Validación de props
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ErrorBoundary;
