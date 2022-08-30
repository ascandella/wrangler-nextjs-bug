export default {
  fetch(request) {
    const url = new URL(request.url);
    return fetch(url.href.replace("localhost:4000", "localhost:3000"), request);
  },
};
