const NotFound = ({ onNotFound }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      <h1 style={{ color: "#fff" }}>No results :(</h1>
      <input
        type="button"
        defaultValue="Вернуться на главную страницу"
        style={{
          padding: ".3em .5em",
          cursor: "pointer",
          borderRadius: ".5em",
          border: "none",
        }}
        onClick={() => onNotFound()}
      />
    </div>
  );
};

export default NotFound;
