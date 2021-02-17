import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, List} from 'antd';
import {StopOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {
  removeFollowerRequestAction,
  unFollowRequestAction
} from '../reducers/user';

const ListStyled = styled(List)`
  margin-bottom: 20px;

  .box-more {
    text-align: center;
    margin: 10px 0;
  }

  .list-follow {
    margin-top: 20px;
  }
`;

const FollowList = ({header, data, onClickMore, loading}) => {
  const dispatch = useDispatch();

  const onCancel = (userId) => () => {
    if (header === '팔로잉') {
      dispatch(unFollowRequestAction({followingId: userId}));
      return;
    }
    dispatch(removeFollowerRequestAction({followerId: userId}));
  };
  return (
    <ListStyled
      grid={{column: 3}}
      size="default"
      header={<div>{header}</div>}
      loadMore={
        <div className="box-more">
          <Button onClick={onClickMore} loading={loading}>
            더보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="list-follow">
          <Card
            actions={[<StopOutlined key="stop" />]}
            onClick={onCancel(item.id)}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string
    })
  ).isRequired,
  onClickMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default FollowList;
