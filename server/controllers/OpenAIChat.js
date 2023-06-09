const { Configuration, OpenAIApi } = require("openai");

module.exports = class OpenAIChat {

    static async askChatGPT(req, res) {

        const configuration = new Configuration({
            apiKey: 'KEY'
        });
        let openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.pregunta }],
        });

        //console.log("Respuesta: " + completion.data.choices[0].message.content);
        let respuestaChatGPT = completion.data.choices[0].message.content;
        res.status(200).json(respuestaChatGPT)
    }
}