const { Configuration, OpenAIApi } = require("openai");

module.exports = class OpenAIChat {
    #apiKey = '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';
    #openai;

    constructor() {
        const configuration = new Configuration({
            apiKey: this.#apiKey,
        });
        this.#openai = new OpenAIApi(configuration);
    }

    async askChatGPT(req, res) {
        const completion = await this.#openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hola que tal estas?" }],
        });

        //console.log("Respuesta: " + completion.data.choices[0].message.content);
        let respuestaChatGPT = completion.data.choices[0].message.content;
        res.send(respuestaChatGPT)
    }
}