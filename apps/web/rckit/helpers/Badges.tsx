import { Badge } from 'react-bootstrap';

export const Badges = ({ items = [] }: { items?: string[] }) => (
  <>
    <div className="d-flex flex-wrap" style={{ maxWidth: 400 }}>
      {items.map((item, index) => (
        <Badge key={index} bg="primary" className="mx-1 mt-1">
          {item}
        </Badge>
      ))}
    </div>
  </>
);
