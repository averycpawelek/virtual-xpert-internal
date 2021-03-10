<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.forms')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <layout-profile></layout-profile>
  </div>
</template>
<script>
import LayoutProfile from "../../../containers/forms/LayoutProfile";

export default {
  components: {
    "layout-profile": LayoutProfile,
  }
};
</script>
