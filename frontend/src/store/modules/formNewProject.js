export default {
    namespaced: true,
    state: {
        formTitle: "Add a new WoT project to WoTify",
        formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right", title: "big-form-title", description: "big-form-description" },
        formFields: [
            {
                formTitle: "Title",
                formDescription: "Give your project a short and descriptive title.",
                formInputType: "text",
                formInputError: "Please enter a title for your project.",
                formInputStyle: "big-form-input"
            },
            {
                formTitle: "Short Description",
                formDescription: "Describe this project in one sentence (max. 180 characters).",
                formInputType: "text",
                formInputError: "Please enter a short description for your project.",
                formInputStyle: "big-form-input"
            },
            {
                formTitle: "Description",
                formDescription: "Describe this project in more detail. How can it be used?",
                formInputType: "text",
                formInputError: "Please enter a avlid Url.",
                formInputStyle: "big-form-input textarea-medium"
            },
            {
                formTitle: "Repository Url",
                formDescription: "Add the URL of the repository, where your WoT project is hosted. Make sure it is publiclly available.",
                formInputType: "textarea",
                formInputStyle: "big-form-input textarea-small"
            },
            {
                formTitle: "Thing Description",
                formDescription: "Paste the Thing Description of your project.",
                formInputType: "textarea",
                formInputStyle: "big-form-input textarea-large"
            },
            {
                formTitle: "Topic",
                formDescription: "Please select at least one topic.",
                formInputType: "checkbox",
                inputFormValues: ['Sensor', 'Robotics', 'Actuator', 'Other'],
                formInputError: "Please select at least one option."
            },
            {
                formTitle: "Platform",
                formDescription: "Please choose the according platform.",
                formInputType: "radio",
                inputFormValues: ['Raspberry', 'Arduino', 'ESP', 'Other'],
                formInputError: "Please select one option."
            },
            {
                formTitle: "Implementation type",
                formDescription: "Is this thing a Thing Description template or source code?",
                formInputType: "radio",
                inputFormValues: ['Template', 'Code'],
                formInputError: "Please select one option."
            },
            {
                formTitle: "Tags",
                formDescription: "Add some tags that will help others find your project. Comma or space separate the tags.",
                formInputType: "tag"
            }
        ]
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        getFormTitle: state => { return state.formTitle; },
        getFormFields: state => state.formFields,
        getFormStyle: state => state.formStyle
    }
}