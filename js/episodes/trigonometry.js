import React, { Component } from 'react';

export default class Trigonometry extends Component {
    constructor() {
        super();
        this.speed = 0.1;
    }
    componentDidMount() {
        this.setState({
            angle: 0
        });
    }
    componentWillUpdate(nextProps, nextState) {
        const canvas = document.getElementById('trigonometry');
        const context = canvas.getContext('2d');
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight / 3;

        const centerY = height * 0.5;
        const centerX = width * 0.5;
        const offset = height * 0.4;

        const y = centerY + Math.sin(nextState.angle) * offset;

        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.arc(centerX, y, 25, 0, Math.PI * 2, false);
        context.fill();

        requestAnimationFrame(() => {
            this.setState({
                angle: nextState.angle + this.speed,
            });
        });
    }
    render() {
        return <canvas id="trigonometry" />;
    }
}
