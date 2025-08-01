import  { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, [navigate, user]);

  return <>{children}</>;
};

// Define PropTypes for validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are valid React nodes
};

export default ProtectedRoute;
