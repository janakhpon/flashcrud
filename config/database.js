if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb://flashuer:flashuser1998@ds145093.mlab.com:45093/noteapp"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/flashcrud" };
}
