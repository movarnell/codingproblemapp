function Alert({alertState, setAlertState, alertMessage}) {

    const closeAlert = () => {
        setAlertState(false);
    }



  return (
      <div>
    {alertState &&
      <div className="text-center alert-loading z-40">
        <div className="alert-styles">


          <h2 className="text-2xl font-bold text-center text-black">
            {alertMessage}
          </h2>
            <button onClick={closeAlert} className="text-lg text-center bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 my-5 rounded">
                Close
            </button>
        </div>
      </div>
    }
    </div>
)

}

export default Alert;
