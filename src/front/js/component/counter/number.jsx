import PropTypes from "prop-types";
import React from "react";

export const Number = props => {
    return <div className="col-auto center bg-primary-100">{props.label}</div>;
};

Number.propTypes = {
    label: PropTypes.number.isRequired,
};
