import { Client } from "discord.js";

const token = process.env.TOKEN;

let app = new Client();
export default app;

function bindEvents(client: Client) {
    client.on('ready', async () => {
        console.log("Connected to Discord with " + client.user.username + "#" + client.user.discriminator);
    });

    client.on('error', async (error) => {
        console.error(error);
        console.log("Restarting bot now...")

        restart();
    });

    client.on("disconnect", (closeEvent) => {
        console.log(
            "Disconnected from gateway. Details: {\n" +
                "Code: " + closeEvent.code +
                "\nReason: \"" + closeEvent.code + "\"" +
                "\nClean?: " + closeEvent.wasClean +
            "\n} Restarting..."
        );
        restart();
    });
    function restart() {
        client.removeAllListeners();
        client.destroy();

        client = new Client();
        client.login(token);
        app = client;

        bindEvents(client);
    }
}

app.login(token);
bindEvents(app);
