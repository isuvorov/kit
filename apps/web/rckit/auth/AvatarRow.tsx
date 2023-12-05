/* eslint-disable @next/next/no-sync-scripts */
import Avatar from 'react-avatar';
import { Col, Row } from 'react-bootstrap';

type AvatarRowProps = {
  user?: {
    id?: string;
    first_name?: string;
    last_name?: string;
  };
  size?: number;
  className?: string;
};

export const AvatarRow = ({ user, size = 36, className }: AvatarRowProps) => {
  const userName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
  const userId = user?.id;
  const avatar = userId ? `/api/telegram/avatar?chatId=${userId}` : undefined;
  return (
    <Row className={`align-items-center ${className}`}>
      <Col xs="auto">
        <Avatar size={String(size)} round={true} src={avatar} name={userName} className="pr-4" />
        <span className="pl-4">{userName}</span>
      </Col>
    </Row>
  );
};
