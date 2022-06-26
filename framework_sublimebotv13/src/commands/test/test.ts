import { Command } from "../../structures/Command";

export default new Command({
    name: "test",
    description: "replies with test",
    run: async ({ interaction }) => {
        interaction.followUp("Test");
    }
});
