import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {List, Button, Card} from 'antd';
import {StopOutlined} from '@ant-design/icons';

const UserFollow = memo(
  ({header, hasMore, data, onClickMore, onClickRemove}) => {
    return (
      <List
        style={{marginBottom: '20px'}}
        grid={{gutter: 16, xs: 2, md: 3}}
        size="small"
        header={<div>{header}</div>}
        loadMore={
          hasMore && (
            <Button
              style={{width: '100%'}}
              onClick={onClickMore}
              title="더 보기"
            >
              더 보기
            </Button>
          )
        }
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{marginTop: '20px'}}>
            <Card actions={[<StopOutlined />]} onClick={onClickRemove(item.id)}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
);

UserFollow.propTypes = {
  header: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickMore: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired
};

export default UserFollow;
