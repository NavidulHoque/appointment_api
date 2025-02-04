const errorHandler = (err, req, res, next) => {

    if (err.name === "ValidationError") {

        const errors = {};

        Object.keys(err.errors).forEach((field) => {
            errors[field] = err.errors[field].message; 
        });

        return res.status(400).json({
            errors
        });
    }

    console.log(err);
    
    return res.status(500).json({
        message: err.message || "Server error, please try again later"
    });
};

export default errorHandler;
