import React, { Component } from 'react';
import { composeView } from '../lib/decorators';

import Trigonometry from '../episodes/trigonometry';


@composeView({
    classNames: 'trigonometry',
    parts: {
        trigonometry: {
            content: () => <Trigonometry />
        }
    }
})
export default class HomePage extends Component {
    render() {
        return <div ref="home">
            <div class="episode3">
                {this.props.parts.trigonometry}
            </div>
        </div>;
    }
}
