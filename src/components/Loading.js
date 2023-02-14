const Loading = ({ loading }) => {
  return (
    <div className={`loading ${loading ? "active" : ""}`}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
