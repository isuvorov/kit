import Link from 'next/link';

export const Toc = ({ items }: any) => (
  <ul>
    {items
      .filter((i: any) => !i.hidden)
      .map((item: any, index: any) => (
        <li key={index}>
          <Link href={item.href}>{item.title}</Link>
          {item?.items && <Toc items={item?.items} />}
        </li>
      ))}
  </ul>
);
