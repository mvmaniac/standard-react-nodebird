import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, List} from 'antd';
import {StopOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const ListStyled = styled(List)`
  margin-bottom: 20px;

  .btn-more {
    text-align: center;
    margin: 10px 0;
  }

  .list-item {
    margin-top: 20px;
  }
`;

const FollowList = ({header, data}) => (
  <ListStyled
    // TODO: grid 사이즈 조정
    grid={{xs: 2, md: 3, xxl: 6}}
    size="small"
    header={<div>{header}</div>}
    loadMore={
      <div className="btn-more">
        <Button>더보기</Button>
      </div>
    }
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item className="list-item">
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string
    })
  ).isRequired
};

export default FollowList;
