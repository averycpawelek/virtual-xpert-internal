<template>
<b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" >
            <b-form @submit.prevent="onValitadeFormSubmit" class="av-tooltip tooltip-label-right">
                <b-form-group :label="$t('forms.name')">
                    <b-form-input type="text" v-model.trim="$v.name.$model" :state="!$v.name.$error" />
                    <b-form-invalid-feedback>Job Name is required!</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Description">
                    <b-textarea v-model.trim="$v.detail.$model" :state="!$v.detail.$error"></b-textarea>
                    <b-form-invalid-feedback>Please enter some details!</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Industry">
                    <b-form-select v-model.trim="$v.select.$model" :state="!$v.select.$error" :options="selectOptions" plain />
                    <b-form-invalid-feedback>Please select Industry!</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Category">
                    <b-form-select v-model.trim="$v.select.$model" :state="!$v.select.$error" :options="selectOptions" plain />
                    <b-form-invalid-feedback>Please select Category!</b-form-invalid-feedback>
                </b-form-group>

                <b-form-group label="Inspection">
                    <b-form-select v-model.trim="$v.select.$model" :state="!$v.select.$error" :options="selectOptions" plain />
                    <b-form-invalid-feedback>Please select Inspection!</b-form-invalid-feedback>
                </b-form-group>
                <!-- <b-button type="submit" variant="primary" class="mt-4" >{{ $t('forms.submit') }}</b-button> -->
            </b-form>
        </b-card>
    </b-colxx>
</b-row>
</template>

<script>
import {
    validationMixin
} from "vuelidate";
const {
    required
} = require("vuelidate/lib/validators");
export default {
    data() {
        return {
            selectOptions: [
                "",
                "Option1",
                "Option2",
                "Option3",
                "Option4",
                "Option5"
            ],
            name: "",
            rank: "",
            select: "",
            detail: "",
            customRadio: "",
            customCheckbox: []
        };
    },
    mixins: [validationMixin],
    validations: {
        name: {
            required
        },
        rank: {
            required
        },
        select: {
            required
        },
        detail: {
            required
        },
        customRadio: {
            required
        },
        customCheckbox: {
            required
        }
    },
    methods: {
        onValitadeFormSubmit() {
            this.$v.$touch();
            console.log(
                JSON.stringify({
                    name: this.name,
                    rank: this.rank,
                    select: this.select,
                    detail: this.detail,
                    customRadio: this.customRadio,
                    customCheckbox: this.customCheckbox
                })
            );
        }
    }
};
</script>
