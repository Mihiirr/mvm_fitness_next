import nc from 'next-connect';
import clientPromise from "../../../lib/mongodb";
const handler = nc();

handler.get(async (req, res) => {
  try {
    const client = await clientPromise;
    const db = await client.db("mvm_fitness_next");

    const data = db.collection("users").find({});
    res.send(JSON.parse(JSON.stringify(data)));
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
});

export default handler;