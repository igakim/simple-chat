import React from 'react';
import cn from 'classnames';

const ChannelsList = (props) => {
  const { channels, currentChannelId } = props;
  return (
    <ul className="list-group">
      {channels.map(({ id, name }) => {
        const classes = cn({
          'list-group-item': true,
          active: id === currentChannelId,
        });
        return <li key={id} className={classes}>{name}</li>;
      })}
    </ul>
  );
};

export default ChannelsList;
