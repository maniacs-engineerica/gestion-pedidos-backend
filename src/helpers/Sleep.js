export default async (req, res, next) => {
  const delay = Math.floor((Math.random() * 1000))
  await sleep(delay)
  next()
}


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   