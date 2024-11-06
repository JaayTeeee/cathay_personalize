// File: src/pages/api/addToDatabase.js

import testConnection from "./database";
import Topic from "@/models/topic";

export default async function handler(req, res) {
    await testConnection();

    switch (req.method) {
        case 'POST': {
            const { title, description } = req.body;
            await Topic.create({ title, description });
            return res.status(201).json({ message: "Topic Created" });
        }
        case 'GET': {
            const topics = await Topic.find();
            return res.status(200).json({ topics });
        }
        case 'DELETE': {
            const id = req.query.id;
            await Topic.findByIdAndDelete(id);
            return res.status(200).json({ message: "Topic deleted" });
        }
        default: {
            res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}