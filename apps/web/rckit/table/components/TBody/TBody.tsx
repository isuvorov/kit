import { flexRender, Row } from '@tanstack/react-table';

interface TBodyProps {
  rows: Row<Record<string, unknown>>[];
}

export const TBody = ({ rows }: TBodyProps) => (
  <tbody>
    {rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
        ))}
      </tr>
    ))}
  </tbody>
);
