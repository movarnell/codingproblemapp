import titleGraphic from "../assets/CPBeta.png";

function Title() {
  return (
    <div>
      <div className="text-center">
        <img
          src={titleGraphic}
          alt="Code Problems Beta Title Graphic"
          className="w-full max-title-graphic"
        />
      </div>

      <p className="text-base text-center text-red-500 font-bold italic">
        I am still working with the AI to get reliable results. At the moment
        most of the time it is providing correct results. Sometimes it may not.
        <br />
        Apologies if you encounter any issues. This is a free service. If you
        would like to support me, please consider buying me a coffee. <br />
        <span className="text-white text-base">
          If you would like to provide feedback email me at
          michaelvarnell@icloud.com
        </span>
      </p>
      <div className="flex justify-center my-5">
        <a href="https://www.buymeacoffee.com/michaelvarnell" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            width="150px"
          />
        </a>
      </div>
    </div>
  );
}
export default Title;
