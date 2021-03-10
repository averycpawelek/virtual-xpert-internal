<template>
  <div class="disable-text-selection">
    <b-row class="app-row survey-app pb-4">
      <b-colxx xxs="12" v-if="isLoadSurveys" key="surveyDetail">
        <div v-if="currentSurvey">
          <h1 >
          <i
            :class="{
              'heading-icon': true,
              'simple-icon-check': currentSurvey.status === 'COMPLETED',
              'simple-icon-refresh': currentSurvey.status !== 'COMPLETED'
            }"
          />
          <span class="align-middle d-inline-block pt-1">{{ currentSurvey.title }}</span>
        </h1>
        <div class="top-right-button-container">
          <b-button-group>
            <b-button
              variant="outline-primary"
              size="lg"
              class="flex-grow-1"
            >{{ $t("survey.save") }}</b-button>
            <b-dropdown right variant="outline-primary" toggle-class="spaced-content xs">
              <b-dropdown-item>{{ $t("survey.delete") }}</b-dropdown-item>
              <b-dropdown-item>{{ $t("survey.edit") }}</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <piaf-breadcrumb />
        <b-tabs
          nav-class="separator-tabs ml-0 mb-5"
          content-class="tab-content"
          v-model="tabIndex"
          :no-fade="true"
          v-if="isLoadSurveys"
          key="itemList"
        >
          <b-tab :title="$t('survey.job-info')">
            <b-row>
              <b-colxx xxs="12" lg="12" class="mb-12">
                <b-card class="mb-12" no-body>
                  <survey-detail-card v-if="currentSurvey" :survey="currentSurvey"></survey-detail-card>
                </b-card>
              </b-colxx>

            </b-row>
          </b-tab>
          <b-tab :title="$t('survey.images')">
            <b-row>
              <b-colxx xxs="12" lg="12">
                    <b-colxx class="disable-text-selection">
                      <list-page-heading
                        :title="$t('menu.image-list')"
                        :selectAll="selectAll"
                        :isSelectedAll="isSelectedAll"
                        :isAnyItemSelected="isAnyItemSelected"
                        :keymap="keymap"
                        :displayMode="displayMode"
                        :changeDisplayMode="changeDisplayMode"
                        :changeOrderBy="changeOrderBy"
                        :changePageSize="changePageSize"
                        :sort="sort"
                        :searchChange="searchChange"
                        :from="from"
                        :to="to"
                        :total="total"
                        :perPage="perPage"
                      ></list-page-heading>
                      <template v-if="isLoad">
                        <list-page-listing
                          :displayMode="displayMode"
                          :items="items"
                          :selectedItems="selectedItems"
                          :toggleItem="toggleItem"
                          :lastPage="lastPage"
                          :perPage="perPage"
                          :page="page"
                          :changePage="changePage"
                          :handleContextMenu="handleContextMenu"
                          :onContextMenuAction="onContextMenuAction"
                        ></list-page-listing>
                      </template>
                      <template v-else>
                        <div class="loading"></div>
                      </template>
                    </b-colxx>
              </b-colxx>

            </b-row>
          </b-tab>
          <b-tab :title="$t('survey.results')">
            <b-row>
              <b-colxx xxs="12" lg="12">
                <survey-detail-quotas></survey-detail-quotas>
              </b-colxx>
            </b-row>
          </b-tab>
        </b-tabs>
        </div>
        <div v-else class="loading" key="itemLoading"></div>
      </b-colxx>
    </b-row>
    <!-- <survey-application-menu
      v-if="isLoadSurveys"
      :surveyItems="surveyItems"
      :categories="categories"
      :labels="labels"
    ></survey-application-menu> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Draggable from "vuedraggable";
import QuestionBuilder from "../../../components/SurveyApp/QuestionBuilder";
import SurveyApplicationMenu from "../../../containers/applications/SurveyApplicationMenu";
import SurveyDetailCard from "../../../containers/applications/SurveyDetailCard";
import SurveyDetailQuotas from "../../../containers/applications/SurveyDetailQuotas";
import { apiUrl } from "../../../constants/config";
import ListPageHeading from "../../../containers/pages/ListPageHeading";
import ListPageListing from "../../../containers/pages/ListPageListing";
export default {
  components: {
    draggable: Draggable,
    "survey-detail-card": SurveyDetailCard,
    "survey-detail-quotas": SurveyDetailQuotas,
    "survey-application-menu": SurveyApplicationMenu,
    "question-builder": QuestionBuilder,
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing
  },
  data() {
    return {
      categories: [
        {
          label: "Development",
          value: "Development"
        },
        {
          label: "Workplace",
          value: "Workplace"
        },
        {
          label: "Hardware",
          value: "Hardware"
        }
      ],
      labels: [
        {
          label: "EDUCATION",
          value: "EDUCATION",
          color: "secondary"
        },
        {
          label: "NEW FRAMEWORK",
          value: "NEW FRAMEWORK",
          color: "primary"
        },
        {
          label: "PERSONAL",
          value: "PERSONAL",
          color: "info"
        }
      ],
      statuses: [
        {
          text: "ACTIVE",
          value: "ACTIVE"
        },
        {
          text: "COMPLETED",
          value: "COMPLETED"
        }
      ],
      currentSurvey: null,
      tabIndex: 0,
            isLoad: false,
      apiBase: apiUrl + "/cakes/fordatatable",
      displayMode: "image",
      sort: {
        column: "title",
        label: "Product Name"
      },
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: []
    };
  },
  computed: {
    ...mapGetters(["isLoadSurveys", "surveyItems", "surveyError"]),
        isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
    apiUrl() {
      return `${this.apiBase}?sort=${this.sort.column}&page=${this.page}&per_page=${this.perPage}&search=${this.search}`;
    }
  },
  methods: {
    ...mapActions(["getSurveyItems"]),
    ...mapMutations(["addSurveyItem"]),
    addQuestion() {
      this.currentSurvey.questions.push({
        id: this.currentSurvey.questions.length + 1,
        title: "New Question",
        question: "Question",
        answerType: 0,
        answers: []
      });
    },
    loadItems() {
      this.isLoad = false;

      axios
        .get(this.apiUrl)
        .then(response => {
          return response.data;
        })
        .then(res => {
          this.total = res.total;
          this.from = res.from;
          this.to = res.to;
          this.items = res.data.map(x => {
            return {
              ...x,
              img: x.img.replace("/img/", "/img/products/")
            };
          });
          this.perPage = res.per_page;
          this.selectedItems = [];
          this.lastPage = res.last_page;
          this.isLoad = true;
        });
    },
        changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log(
        "context menu item clicked - " + action + ": ",
        this.selectedItems
      );
    },
    changePage(pageNum) {
      this.page = pageNum;
    }
  },
  
  mounted() {
    this.getSurveyItems();
    this.loadItems();

  },
  watch: {
    isLoadSurveys(val) {
      if (val === true) {
        this.currentSurvey = this.surveyItems[0];
      }
    },
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  }
};
</script>
