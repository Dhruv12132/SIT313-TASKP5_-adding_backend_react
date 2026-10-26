const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");
const app = express();
const port = 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("backend is working");
});

app.post("/subscribe", async (req, res) => {
    const email = req.body.email;
    console.log(email);

    if(!email){
        return res.status(400).send("Email is required");
    }   

    const { data, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Welcome to DEV@Deakin!",
        html: "<h1> How are you DHRUV</h1>" + "<h2>Welcome to DEV@Deakin!</h2>",
    });

    if (error) {
        console.log(error);
        return res.status(500).send("Failed to send email");
    }
console.log("Email sent successfully. Status: 200");
console.log("Resend response:", data);

    res.status(200).send("Email sent successfully");
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});