import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as classNames from 'classnames';

export class TabContentListItem extends React.Component<any, any> {

  private static contextTypes = {
    handleTouchStart: PropTypes.func,
    handleTouchMove: PropTypes.func,
    handleTouchEnd: PropTypes.func,
    currentIndex: PropTypes.number,
  }

  private static propTypes = {
    children: PropTypes.node,
  }

  render() {
    let isHidden = false;
    if (
      this.props.index < this.context.currentIndex - 1 ||
      this.context.currentIndex + 1 < this.props.index
    ) {
      isHidden = true;
    }
    return (
      <section
        onTouchStart={this.context.handleTouchStart}
        onTouchMove={this.context.handleTouchMove}
        onTouchEnd={this.context.handleTouchEnd}
        className={classNames(
          "tab-content-list-item",
          {'tab-content-list-item__hidden': isHidden}
        )}
        >
        <section className="tab-content-list-item-inner">{this.props.children}</section>
      </section>
    );
  }
}
