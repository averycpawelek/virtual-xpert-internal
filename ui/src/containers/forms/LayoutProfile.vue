<template>
  <b-row>
    <b-colxx xxs="12">
      <b-card class="mb-4" :title="$t('forms.profile-setting')">
        <b-form @submit.prevent="onBasicSubmit">

          <b-form-group :label="$t('forms.profile-info')">
            <b-form-input v-model="basicForm.firstName" :placeholder="$t('forms.first-name')"></b-form-input>
          </b-form-group>
          <b-form-group >
            <b-form-input v-model="basicForm.firstName" :placeholder="$t('forms.last-name')"></b-form-input>
          </b-form-group>
          <b-form-group >
            <b-form-input type="email" v-model="basicForm.email" :placeholder="$t('forms.email')" />
          </b-form-group>
          <b-form-group :label="$t('forms.change-password')">
            <b-form-input
              type="password"
              v-model="basicForm.password"
              :placeholder="$t('forms.old-password')"
            />
          </b-form-group>
          <b-form-group >
            <b-form-input
              type="password"
              v-model="basicForm.password"
              :placeholder="$t('forms.new-password')"
            />
          </b-form-group>

          <b-button type="submit" variant="primary" class="mt-4">{{ $t('forms.save-changes') }}</b-button>
        </b-form>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      basicForm: {
        email: "",
        password: "",
        checked: false,
        firstName:""
      }
    };
  },
  methods: {
    onBasicSubmit() {
      console.log(JSON.stringify(this.basicForm));
    }
  }
};
</script>
