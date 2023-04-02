import nc from 'next-connect';
const handler = nc();

handler.get(async (req, res) => {
  try {
    res.send("Welcome to backend of MVM_FITNESS");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
});

export default handler;