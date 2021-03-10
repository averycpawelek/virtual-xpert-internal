<template>
<b-card no-body>
    <b-card-body class="wizard wizard-default">
        <form-wizard :last-step-end="true">
            <tab :name="$t('wizard.step-name-1')" :selected="true">
                <div class="wizard-basic-step">
                    <dropzone-image></dropzone-image>
                </div>
            </tab>
            <tab :name="$t('wizard.step-name-2')" >
                <div class="wizard-basic-step">
                    <job-basic></job-basic>
                </div>
            </tab>
            <tab :name="$t('wizard.step-name-3')" >
                <div class="wizard-basic-step">
                    <job-type></job-type>
                </div>
            </tab>
            <tab type="done">
                <div class="wizard-basic-step text-center" :to="`${adminRoot}/applications/survey`">
                    <h2 class="mb-2">{{$t('wizard.content-thanks')}}</h2>
                    <p>{{$t('wizard.registered')}}</p>
                </div>
            </tab>
        </form-wizard>
    </b-card-body>
</b-card>
</template>

<script>
import FormWizard from "../../components/Form/Wizard/FormWizard";
import JobImage from "../../containers/forms/JobImage";
import JobType from "../../containers/forms/JobType";
import JobBasic from "../../containers/forms/JobBasic";
import Tab from "../../components/Form/Wizard/Tab";

export default {
    components: {
        "form-wizard": FormWizard,
        "tab": Tab,
        "dropzone-image": JobImage,
        "job-type": JobType,
        "job-basic": JobBasic,
    }
};
</script>
