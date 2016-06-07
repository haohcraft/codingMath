import React, { Component } from 'react';
import _ from 'lodash';

export const composeView = (config = {}) => (Base) => {
    // if (_.every(['classNames', 'shouldRender', 'parts']
    //         , (item) => !!~_.keys(config).indexOf(item))) {
    //     throw Error(
    //         `When configuring the view
    //                 , you might miss the 'classNames'
    //                     or 'shouldRender' or 'parts', or all of them `);
    // }
    const defaultShouldRender = () => (true);
    const { classNames = '', shouldRender = defaultShouldRender, parts: configParts } = config;
    const runShouldRender = (should, props) => (_.isBoolean(should) && should) || (_.isFunction(should) && should(props));
    const componentName = _.camelCase(classNames);
    return class extends Component {
        static ComponentName = `${componentName[0].toUpperCase()}${componentName.slice(1)}` || 'ComposedComponent';
        render() {
            if (runShouldRender(shouldRender, this.props)) {
                const parts = _.reduce(configParts, (next, v, k) => {
                    let result = {};
                    const shouldRenderFunc = _.get(v, 'shouldRender', true);
                    if (runShouldRender(shouldRenderFunc, this.props)) {

                        const getContentComponent = _.get(v, 'content', null);
                        const ContentComponentElement = _.isFunction(getContentComponent) && getContentComponent(this.props);
                        if (React.isValidElement(ContentComponentElement)) {
                            result = {
                                ...next,
                                [k]: React.cloneElement(ContentComponentElement)
                            };
                        }

                    }
                    return result;
                }, {});

                return <Base className={`dc-compose ${classNames}`} parts={parts} {...this.props} />;
            }
            return null;
        }
    };

};
