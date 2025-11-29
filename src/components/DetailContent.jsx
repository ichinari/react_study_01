function DetailContent({ title, children }) {
  return (
    <>
      <div className="text-center">
        <div className="text-2xl font-bold underline underline-offset-5 mb-2">
          {title}
        </div>

        <ul>{children}</ul>
      </div>
    </>
  );
}

export default DetailContent;
