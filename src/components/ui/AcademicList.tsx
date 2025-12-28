interface Item {
  authors?: string;
  title: string;
  journal?: string;
  venue?: string;
  details?: string;
  event?: string;
  year?: string;
  date?: string;
  link?: string;
}

export const AcademicList = ({ items }: { items: Item[] }) => {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="text-foreground/80 leading-relaxed">
          {item.authors && <strong>{item.authors}</strong>}
          {item.authors && ", "}
          <span className="italic">{item.title}</span>
          {item.journal && `, ${item.journal}`}
          {item.venue && `, ${item.venue}`}
          {item.details && `, ${item.details}`}
          {item.year && ` (${item.year})`}
          {item.date && ` (${item.date})`}
          {item.link && (
            <>
              {" "}
              –{" "}
              <a
                href={item.link}
                className="text-primary underline"
                target="_blank"
              >
                Link to File
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
