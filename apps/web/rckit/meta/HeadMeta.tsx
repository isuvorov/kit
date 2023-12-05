import { useMeta } from './useMeta';

export const HeadMeta = ({ title }: { title: string }) => {
  const metaElements = useMeta({ title });
  return (
    <>
      {metaElements}
      {/* <title>{title}</title>
      <meta name="title" content={title} /> */}
    </>
  );
};
