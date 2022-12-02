export const gaEventToFirebaseLog = (event: any) => {
    const { data, nonInteractive } = event;

    const { category, label, value } = data;

    const output: Json = {
        ...data,
        action_category: category,
        action_label: label,
        action_value: value,
    };

    delete output['category'];
    delete output['label'];
    delete output['value'];

    if (nonInteractive) {
        output.non_interaction = true;
    }

    return output;
};
