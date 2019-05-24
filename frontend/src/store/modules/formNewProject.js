// import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        formTitle: "Add a new WoT project to WoTify",
        formFields: [
            {
                formTitle: "Title",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Give your project a short and descriptive title.",
                formInputType: "text",
                formInputError: "Please enter a title for your project."
            },
            {
                formTitle: "Short Description",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Describe this project in one sentence (max. 180 characters).",
                formInputType: "text",
                formInputError: "Please enter a short description for your project."
            },
            {
                formTitle: "Description",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Describe this project in more detail. How can it be used?",
                formInputType: "text",
                formInputError: "Please enter a avlid Url."
            },
            {
                formTitle: "Repository Url",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Add the URL of the repository, where your WoT project is hosted. Make sure it is publiclly available.",
                formInputType: "textarea",
                formInputStyle: "texarea-medium"
            },
            {
                formTitle: "Thing Description",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Paste the Thing Description of your project.",
                formInputType: "textarea",
                formInputStyle: "texarea-large"
            },
            {
                formTitle: "Topic",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Please select at least one topic.",
                formInputType: "checkbox",
                inputFormValues: ['Sensor', 'Robotics', 'Actuator', 'Other'],
                formInputError: "Please select at least one option."
            },
            {
                formTitle: "Platform",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Please choose the according platform.",
                formInputType: "radio",
                inputFormValues: ['Raspberry', 'Arduino', 'ESP', 'Other'],
                formInputError: "Please select one option."
            },
            {
                formTitle: "Implementation type",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
                formDescription: "Is this thing a Thing Description template or source code?",
                formInputType: "radio",
                inputFormValues: ['Template', 'Code'],
                formInputError: "Please select one option."
            },
            {
                formTitle: "Tags",
                formStyle: { wholeEl: "big-form-el", leftEl: "big-form-el-left", rightEl: "big-form-el-right" },
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
        getFormFields: state => state.formFields
    }
}