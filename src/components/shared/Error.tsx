const Error = ({ errorMsg }: { errorMsg?: string }) => {
  return <div>{errorMsg || "Something went wrong"}</div>;
};

export default Error;
