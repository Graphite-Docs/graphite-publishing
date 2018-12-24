var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { browser, getOffsetBoundingClientRect, sanitizeSelector } from './utils';

var JoyrideTooltip = function (_React$Component) {
  _inherits(JoyrideTooltip, _React$Component);

  function JoyrideTooltip(props) {
    _classCallCheck(this, JoyrideTooltip);

    var _this = _possibleConstructorReturn(this, (JoyrideTooltip.__proto__ || Object.getPrototypeOf(JoyrideTooltip)).call(this, props));

    _this.handleMouseMove = function (e) {
      var event = e || window.e;
      var hole = _this.state.styles.hole;

      var offsetY = hole.position === 'fixed' ? event.clientY : event.pageY;
      var offsetX = hole.position === 'fixed' ? event.clientX : event.pageX;
      var inHoleHeight = offsetY >= hole.top && offsetY <= hole.top + hole.height;
      var inHoleWidth = offsetX >= hole.left && offsetX <= hole.left + hole.width;
      var inHole = inHoleWidth && inHoleHeight;

      if (inHole && !_this.state.mouseOverHole) {
        _this.setState({ mouseOverHole: true });
      }

      if (!inHole && _this.state.mouseOverHole) {
        _this.setState({ mouseOverHole: false });
      }
    };

    _this.state = {};
    return _this;
  }

  _createClass(JoyrideTooltip, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var opts = this.setOpts();
      var styles = this.setStyles(this.props.step.style, opts, this.props);
      this.setState({ styles: styles, opts: opts });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          allowClicksThruHole = _props.allowClicksThruHole,
          onRender = _props.onRender,
          showOverlay = _props.showOverlay;


      this.forceUpdate();
      onRender();

      if (showOverlay && allowClicksThruHole) {
        document.addEventListener('mousemove', this.handleMouseMove, false);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextAllowClicksThruHole = nextProps.allowClicksThruHole,
          nextAnimate = nextProps.animate,
          nextStandalone = nextProps.standalone,
          nextStep = nextProps.step,
          nextHolePadding = nextProps.holePadding,
          nextPosition = nextProps.position,
          nextXPos = nextProps.xPos,
          nextYPos = nextProps.yPos,
          nextShowOverlay = nextProps.showOverlay;
      var _props2 = this.props,
          allowClicksThruHole = _props2.allowClicksThruHole,
          animate = _props2.animate,
          standalone = _props2.standalone,
          step = _props2.step,
          holePadding = _props2.holePadding,
          position = _props2.position,
          xPos = _props2.xPos,
          yPos = _props2.yPos,
          showOverlay = _props2.showOverlay;

      /* istanbul ignore else */

      if (nextAnimate !== animate || nextStandalone !== standalone || nextStep !== step || nextHolePadding !== holePadding || nextPosition !== position || nextXPos !== xPos || nextYPos !== yPos) {
        var opts = this.setOpts(nextProps);
        var styles = this.setStyles(nextProps.step.style, opts, nextProps);
        this.setState({ styles: styles, opts: opts });
      }

      // If showOverlay changed, we might need to allow clicks in the overlay hole
      if (nextShowOverlay !== showOverlay) {
        if (nextShowOverlay && nextAllowClicksThruHole) {
          document.addEventListener('mousemove', this.handleMouseMove, false);
        } else {
          document.removeEventListener('mousemove', this.handleMouseMove, false);
        }
      }

      // If allowClickInHole changed, we need to enable or disable clicking in the overlay hole
      if (nextAllowClicksThruHole !== allowClicksThruHole) {
        if (nextAllowClicksThruHole) {
          document.addEventListener('mousemove', this.handleMouseMove, false);
        } else {
          document.removeEventListener('mousemove', this.handleMouseMove, false);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props3 = this.props,
          onRender = _props3.onRender,
          selector = _props3.selector;


      if (prevProps.selector !== selector) {
        this.forceUpdate();
        onRender();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove, false);
    }
  }, {
    key: 'getArrowPosition',
    value: function getArrowPosition(position) {
      var arrowPosition = position;

      if (window.innerWidth < 480) {
        if (position < 8) {
          arrowPosition = 8;
        } else if (position > 92) {
          arrowPosition = 92;
        }
      } else if (window.innerWidth < 1024) {
        if (position < 6) {
          arrowPosition = 6;
        } else if (position > 94) {
          arrowPosition = 94;
        }
      } else if (position < 5) {
        arrowPosition = 5;
      } else if (position > 95) {
        arrowPosition = 95;
      }

      return arrowPosition;
    }
  }, {
    key: 'generateArrow',
    value: function generateArrow() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      opts.location = opts.location || 'top';
      opts.color = opts.color || '#f04';
      opts.color = opts.color.replace('#', '%23');

      opts.width = opts.width || 36;
      opts.height = opts.width / 2;
      opts.scale = opts.width / 16;
      opts.rotate = '0';

      var height = opts.height,
          rotate = opts.rotate,
          width = opts.width;


      if (opts.location === 'bottom') {
        rotate = '180 8 4';
      } else if (opts.location === 'left') {
        height = opts.width;
        width = opts.height;
        rotate = '270 8 8';
      } else if (opts.location === 'right') {
        height = opts.width;
        width = opts.height;
        rotate = '90 4 4';
      }

      return 'data:image/svg+xml,%3Csvg%20width%3D%22' + width + '%22%20height%3D%22' + height + '%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolygon%20points%3D%220%2C%200%208%2C%208%2016%2C0%22%20fill%3D%22' + opts.color + '%22%20transform%3D%22scale%28' + opts.scale + '%29%20rotate%28' + rotate + '%29%22%3E%3C%2Fpolygon%3E%3C%2Fsvg%3E';
    }

    /**
     * Calculate styles based on those passed in with the step, or calculated opts, or props
     *
     * @param {Object} stepStyles              Style object provided with step
     * @param {Object} opts                    Options object calculated from this.setOpts
     * @param {string} opts.arrowPosition      Used for left/right positioing of arrow when on bottom or top
     * @param {Object} opts.rect               BoundingClientRect of target element
     * @param {string} opts.positonBaseClass   Base position of tooltip (top, bottom, left, right)
     * @param {Object} props                   Positioning properties: cssPosition, xPos, and yPos
     * @returns {Object}                       Calculated styles for arrow, buttons, header, main, footer, hole, and tooltip
     */

  }, {
    key: 'setStyles',
    value: function setStyles(stepStyles, opts, props) {
      var holePadding = props.holePadding,
          step = props.step,
          xPos = props.xPos,
          yPos = props.yPos;

      var isFixed = step.isFixed === true;

      var styles = {
        arrow: {
          left: opts.arrowPosition
        },
        buttons: {},
        header: {},
        main: {},
        footer: {},
        hole: {},
        tooltip: {
          position: isFixed ? 'fixed' : 'absolute',
          top: Math.round(yPos),
          left: Math.round(xPos)
        }
      };

      styles.hole = {
        top: Math.round(opts.rect.top - (isFixed ? 0 : document.body.getBoundingClientRect().top) - holePadding),
        left: Math.round(opts.rect.left - holePadding),
        width: Math.round(opts.rect.width + holePadding * 2),
        height: Math.round(opts.rect.height + holePadding * 2)
      };
      if (isFixed) {
        styles.hole.position = 'fixed';
      }

      styles.buttons = {
        back: {},
        close: {},
        primary: {},
        skip: {}
      };

      /* Styling */
      /* istanbul ignore else */
      if (stepStyles) {
        if (stepStyles.backgroundColor) {
          styles.arrow.backgroundImage = 'url("' + this.generateArrow({
            location: opts.positonBaseClass,
            color: stepStyles.backgroundColor
          }) + '")';
          styles.tooltip.backgroundColor = stepStyles.backgroundColor;
        }

        if (stepStyles.borderRadius) {
          styles.tooltip.borderRadius = stepStyles.borderRadius;
        }

        if (stepStyles.color) {
          styles.buttons.primary.color = stepStyles.color;
          styles.buttons.close.color = stepStyles.color;
          styles.buttons.skip.color = stepStyles.color;
          styles.header.color = stepStyles.color;
          styles.tooltip.color = stepStyles.color;

          if (stepStyles.mainColor && stepStyles.mainColor === stepStyles.color) {
            styles.buttons.primary.color = stepStyles.backgroundColor;
          }
        }

        if (stepStyles.mainColor) {
          styles.buttons.primary.backgroundColor = stepStyles.mainColor;
          styles.buttons.back.color = stepStyles.mainColor;
          styles.header.borderColor = stepStyles.mainColor;
        }

        if (stepStyles.textAlign) {
          styles.tooltip.textAlign = stepStyles.textAlign;
        }

        if (stepStyles.width) {
          styles.tooltip.width = stepStyles.width;
        }

        if (stepStyles.header) {
          styles.header = _extends({}, styles.header, stepStyles.header);
        }

        if (stepStyles.main) {
          styles.main = _extends({}, styles.main, stepStyles.main);
        }

        if (stepStyles.footer) {
          styles.footer = _extends({}, styles.footer, stepStyles.footer);
        }

        if (stepStyles.back) {
          styles.buttons.back = _extends({}, styles.buttons.back, stepStyles.back);
        }

        if (stepStyles.arrow) {
          styles.arrow = _extends({}, styles.arrow, stepStyles.arrow);
        }

        if (stepStyles.button) {
          styles.buttons.primary = _extends({}, styles.buttons.primary, stepStyles.button);
        }

        if (stepStyles.close) {
          styles.buttons.close = _extends({}, styles.buttons.close, stepStyles.close);
        }

        if (stepStyles.skip) {
          styles.buttons.skip = _extends({}, styles.buttons.skip, stepStyles.skip);
        }

        if (stepStyles.hole) {
          styles.hole = _extends({}, stepStyles.hole, styles.hole);
        }
      }

      return styles;
    }
  }, {
    key: 'setOpts',
    value: function setOpts() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var animate = props.animate,
          offsetParentSelector = props.offsetParentSelector,
          position = props.position,
          standalone = props.standalone,
          target = props.target,
          xPos = props.xPos;

      var offsetParent = document.querySelector(sanitizeSelector(offsetParentSelector));
      var tooltip = document.querySelector('.joyride-tooltip');

      var opts = {
        classes: ['joyride-tooltip'],
        rect: getOffsetBoundingClientRect(target, offsetParent),
        positionClass: position
      };

      opts.positonBaseClass = opts.positionClass.match(/-/) ? opts.positionClass.split('-')[0] : opts.positionClass;

      if ((/^bottom$/.test(opts.positionClass) || /^top$/.test(opts.positionClass)) && xPos > -1) {
        opts.tooltip = { width: 450 };

        /* istanbul ignore else */
        if (tooltip) {
          opts.tooltip = getOffsetBoundingClientRect(tooltip, offsetParent);
        }

        opts.targetMiddle = opts.rect.left + opts.rect.width / 2;
        opts.arrowPosition = ((opts.targetMiddle - xPos) / opts.tooltip.width * 100).toFixed(2);
        opts.arrowPosition = this.getArrowPosition(opts.arrowPosition) + '%';
      }

      if (standalone) {
        opts.classes.push('joyride-tooltip--standalone');
      }

      if (opts.positonBaseClass !== opts.positionClass) {
        opts.classes.push(opts.positonBaseClass);
      }

      opts.classes.push(opts.positionClass);

      if (animate) {
        opts.classes.push('joyride-tooltip--animate');
      }

      return opts;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          buttons = _props4.buttons,
          disableOverlay = _props4.disableOverlay,
          onClick = _props4.onClick,
          selector = _props4.selector,
          showOverlay = _props4.showOverlay,
          step = _props4.step,
          target = _props4.target,
          type = _props4.type;


      if (!target) {
        return undefined;
      }

      var _state = this.state,
          opts = _state.opts,
          styles = _state.styles;

      var output = {};

      if (step.title) {
        output.header = React.createElement(
          'div',
          { className: 'joyride-tooltip__header', style: styles.header },
          step.title
        );
      }

      if (buttons.skip) {
        output.skip = React.createElement(
          'button',
          {
            className: 'joyride-tooltip__button joyride-tooltip__button--skip',
            style: styles.buttons.skip,
            'data-type': 'skip',
            onClick: onClick },
          buttons.skip
        );
      }

      // Why is this here?
      if (!step.text || typeof step.text === 'string') {
        output.main = React.createElement('div', {
          className: 'joyride-tooltip__main',
          style: styles.main,
          dangerouslySetInnerHTML: { __html: step.text || '' } });
      } else {
        output.main = React.createElement(
          'div',
          { className: 'joyride-tooltip__main', style: styles.main },
          step.text
        );
      }

      if (buttons.secondary) {
        output.secondary = React.createElement(
          'button',
          {
            className: 'joyride-tooltip__button joyride-tooltip__button--secondary',
            style: styles.buttons.back,
            'data-type': 'back',
            onClick: onClick },
          buttons.secondary
        );
      }

      if (step.event === 'hover') {
        styles.buttons.close.opacity = 0;
      }

      output.tooltipComponent = React.createElement(
        'div',
        { className: opts.classes.join(' '), style: styles.tooltip, 'data-target': selector },
        React.createElement('div', {
          className: 'joyride-tooltip__triangle joyride-tooltip__triangle-' + opts.positionClass,
          style: styles.arrow }),
        React.createElement('button', {
          className: 'joyride-tooltip__close' + (output.header ? ' joyride-tooltip__close--header' : ''),
          style: styles.buttons.close,
          'data-type': 'close',
          onClick: onClick }),
        output.header,
        output.main,
        React.createElement(
          'div',
          { className: 'joyride-tooltip__footer', style: styles.footer },
          output.skip,
          output.secondary,
          React.createElement(
            'button',
            {
              className: 'joyride-tooltip__button joyride-tooltip__button--primary',
              style: styles.buttons.primary,
              'data-type': ['single', 'casual'].indexOf(type) !== -1 ? 'close' : 'next',
              onClick: onClick },
            buttons.primary
          )
        )
      );

      if (showOverlay) {
        // Empty onClick handler is for iOS touch devices (https://github.com/gilbarbara/react-joyride/issues/204)
        output.hole = React.createElement('div', { className: 'joyride-hole ' + browser, style: styles.hole, onClick: function onClick() {} });
      }

      if (!showOverlay) {
        return output.tooltipComponent;
      }

      var overlayStyles = {
        cursor: disableOverlay ? 'default' : 'pointer',
        height: document.body.clientHeight,
        pointerEvents: this.state.mouseOverHole ? 'none' : 'auto'
      };

      return React.createElement(
        'div',
        {
          className: 'joyride-overlay',
          style: overlayStyles,
          'data-type': 'close',
          onClick: !disableOverlay ? onClick : undefined },
        output.hole,
        output.tooltipComponent
      );
    }
  }]);

  return JoyrideTooltip;
}(React.Component);

JoyrideTooltip.propTypes = {
  allowClicksThruHole: PropTypes.bool.isRequired,
  animate: PropTypes.bool.isRequired,
  buttons: PropTypes.object.isRequired,
  disableOverlay: PropTypes.bool,
  holePadding: PropTypes.number,
  offsetParentSelector: PropTypes.string, //eslint-disable-line react/no-unused-prop-types
  onClick: PropTypes.func.isRequired,
  onRender: PropTypes.func.isRequired,
  // position of tooltip with respect to target
  position: PropTypes.oneOf(['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'right', 'left']).isRequired,
  // sanitized selector string
  selector: PropTypes.string.isRequired,
  showOverlay: PropTypes.bool.isRequired,
  standalone: PropTypes.bool,
  step: PropTypes.object.isRequired,
  // DOM element to target
  target: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  xPos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  yPos: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
JoyrideTooltip.defaultProps = {
  buttons: {
    primary: 'Close'
  },
  step: {},
  xPos: -1000,
  yPos: -1000
};
export default JoyrideTooltip;