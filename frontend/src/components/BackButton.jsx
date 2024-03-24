import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import PropTypes from "prop-types";

const BackButton = ({ destination = "/" }) => {
	BackButton.propTypes = {
		destination: PropTypes.string, // assuming destination is a string
	};
	return (
		<div className="flex">
			<Link to={destination} className="px-4 py-1 text-white rounded-md bg-sky-800 w-fit">
				<BsArrowLeft className="text-2xl" />
			</Link>
		</div>
	);
};

export default BackButton;
