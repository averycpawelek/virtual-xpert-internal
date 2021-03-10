<template>
  <div>
    <!-- <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.form-wizard')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row> -->
    <b-row>

      <b-colxx xxs="12" class="mb-5">
        <h5 class="mb-4">Create New Job</h5>
        <wizard-step></wizard-step>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Wizard from "../../../containers/wizard/Wizard";
export default {
  components: {
    "wizard-step": Wizard,
  }
};
</script>
