function Loading({message, submessage}) {
  return (
    <div className="text-center alert-loading loading-front animate-fade animate-once animate-duration-[500ms] animate-ease-in">
      <div className="alert-styles">
        <div className="spinner"></div>

        <h2 className="text-2xl font-bold text-center">{message}</h2>
        <h2 className="text-lg font-bold text-center">
          {submessage ? submessage : ""}
        </h2>
      </div>
    </div>
  );
}
export default Loading;
