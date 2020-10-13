import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

function Footer() {

    return (
        <div className="footer">
            {/* <br/> */}
            <h6>&copy;{new Date().getFullYear()} Yintao</h6>
        </div>
    );
}

export default connect()(Footer);
