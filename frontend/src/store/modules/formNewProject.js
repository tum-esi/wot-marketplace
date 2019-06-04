export default {
    namespaced: true,
    state: {
        formTitle: "Add a new WoT project to WoTify",
        formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right", title: "big-form-title", description: "big-form-description" },
        formFields: [
            {
                formKey: "name",
                formTitle: "Title *",
                formDescription: "Give your project a short and descriptive title (min. 5 characters).",
                formInputType: "text",
                formInputError: "Please enter a title for your project.",
                formInputStyle: "big-form-input",
                formOnClick: "on-required-input-clicked"
            },
            {
                formKey: "shortDescription",
                formTitle: "Short Description *",
                formDescription: "Describe this project in one sentence (min. 5, max. 180 characters).",
                formInputType: "text",
                formInputError: "Please enter a short description for your project.",
                formInputStyle: "big-form-input",
                formOnClick: "on-required-input-clicked"
            },
            {
                formKey: "longDescription",
                formTitle: "Description / README  *",
                formDescription: "If you have a README for your project provide here. Just copy it from your repository. If not, describe this project in more detail. How can it be used? Use markdown syntax. (Min. 5 characters)",
                formInputType: "textarea",
                formInputError: "Please enter a avlid Url.",
                formInputStyle: "big-form-input textarea-medium",
                formOnClick: "on-required-input-clicked"
            },
            {
                formKey: "td",
                formTitle: "Thing Description *",
                formDescription: "Paste the Thing Description of your project in a JSON format.",
                formInputType: "textarea",
                formInputStyle: "big-form-input textarea-medium"
            },
            {
                formKey: "github",
                formTitle: "Repository Url",
                formDescription: "Add the URL of the repository, where your WoT project is hosted. Make sure it is publiclly available.",
                formInputType: "text",
                formInputStyle: "big-form-input"
            }
            // {
            //     formKey: "topic",
            //     formTitle: "Topic",
            //     formDescription: "Please select at least one topic.",
            //     formInputType: "radio",
            //     inputFormValues: ['Sensor', 'Robotics', 'Actuator', 'Other'],
            //     formInputError: "Please select at least one option."
            // },
            // {
            //     formKey: "platform",
            //     formTitle: "Platform",
            //     formDescription: "Please choose the according platform.",
            //     formInputType: "radio",
            //     inputFormValues: ['Raspberry', 'Arduino', 'ESP', 'Other'],
            //     formInputError: "Please select one option."
            // },
            // {
            //     formKey: "implementationType",
            //     formTitle: "Implementation type",
            //     formDescription: "Is this thing a Thing Description template or source code?",
            //     formInputType: "radio",
            //     inputFormValues: ['Template', 'Code'],
            //     formInputError: "Please select one option."
            // },
            // {
            //     formKey: "complexity",
            //     formTitle: "Project Complexity",
            //     formDescription: "Is this a beginner, an advanced or an expert project? Please select an appropriate complexity.",
            //     formInputType: "radio",
            //     inputFormValues: ['Beginner', 'Medium', 'Expert'],
            //     formInputError: "Please select one option."
            // },
            // {
            //     formKey: "tags",
            //     formTitle: "Tags",
            //     formDescription: "Add some tags that will help others find your project. Comma or space separate the tags.",
            //     formInputType: "tag"
            // }
        ]
    },
    actions: {

    },
    mutations: {

    },
    getters: {
        getFormTitle: state => { return state.formTitle; },
        getFormFields: state => { return state.formFields},
        getFormStyle: state => { return state.formStyle}
    }
}