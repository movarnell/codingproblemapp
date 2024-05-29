import titleGraphic from "../assets/titlegraphic.png";

function Title() {
  return (
    <div>
      <div className="text-center">
        <img
          src={titleGraphic}
          alt="title graphic"
          className="w-full max-title-graphic"
        />
      </div>

      <p className="text-xs text-center text-red-500 font-bold italic">
        Some down time may occur...Improving backend.
        <br />
        Apologies if you encounter any issues. This is a free service.
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
