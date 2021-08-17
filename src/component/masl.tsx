export const Mask = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <> {name} </>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((item, index) => (
        <span key={index}>
          {item}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "red" }}> {keyword} </span>
          )}
        </span>
      ))}
    </>
  );
};
