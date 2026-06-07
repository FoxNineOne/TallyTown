exports.home = async (req, res, next) => {
  res.status(200).json({
    title: "Loyalty Local!",
    data: "Hello World",
  });
};

exports.login = async (req, res, next) => {
  res.status(200).json({
    title: "Loyalty Local!",
    data: "Hello Login Page World",
  });
};
