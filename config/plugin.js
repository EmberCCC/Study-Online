exports.static = true;
exports.session = true;

exports.webpack = {
  enable: true,
  package: "egg-webpack",
};

exports.webpackreact = {
  enable: true,
  package: "egg-webpack-react",
};

exports.reactssr = {
  enable: true,
  package: "egg-view-react-ssr",
};

exports.nunjucks = {
  enable: true,
  package: "egg-view-nunjucks",
};

exports.mysql = {
  enable: true,
  package: "egg-mysql",
};
