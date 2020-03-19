<template>
  <div>
    <AddNotice @addNotice="addNotice" />
    <div class="notices">
      <div 
        class="notices__list"
        v-for="notice in noticesList"
        :key="notice.id"
      >
        <router-link 
          :to="`/notice/${notice.id}`"
          class="notices__title">
          {{ notice.title }}
        </router-link>
        <ul class="notices__menu">
          <li 
            v-for="paragraph in notice.paragraphs.slice(0, 3)"
            :key="paragraph.id"
            class="notices__menu-title"
          >
            <input
              disabled
              type="checkbox"
              v-model="paragraph.done">
            {{ paragraph.paragraphName }}
          </li>
        </ul>
        <i 
          @click="deleteNoticeAsk(notice)"
          class="material-icons notices__icon">
          clear
        </i>
      </div>
    </div>
    <Modal 
      v-if="showModal"
      @update:showModal="showModal = $event"
      @applyChanges="deleteNotice"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AddNotice from '@/components/AddNotice'
import Modal from '@/components/UI/Modal'

export default {
  components: {
    AddNotice,
    Modal
  },
  data() {
    return {
      noticesList: [],
      showModal: false,
      deleteNoticeItem: {}
    }
  },
  methods: {
    addNotice (notice) {
      // разбиваю строку с пунктами заметки в массив
      let paragraphs = []
      notice.description.split(',').forEach(paragraph => {
        paragraphs.push({
          paragraphName: paragraph,
          done: false,
          id: Math.random()
        })
      })
      // добавляю обьект с заметкой в массив
      this.noticesList.push({
        title: notice.title,
        id: Math.random(),
        paragraphs
      })
    },
    deleteNoticeAsk (notice) {
      // запоминаю удаленную заметку и показываю модалку
      this.showModal = true
      this.deleteNoticeItem = notice
    },
    deleteNotice () {
      // удаляю заметку, скрываю модалку и очищаю переменную с удаленной заметкой
      this.noticesList.splice(this.noticesList.indexOf(this.deleteNoticeItem), 1)
      this.showModal = false
      this.deleteNoticeItem = {}
    }
  },
  watch: {
    noticesList: {
      deep: true,
      handler() {
        // при изменении массива заметок, записываю его в local storage
        localStorage.setItem('noticesList', JSON.stringify(this.noticesList))
      }
    }
  },
  created() {
    // если в local storage есть заметки, передаю их в массив заметок
    if (localStorage.getItem('noticesList')) {
      this.noticesList = JSON.parse(localStorage.getItem('noticesList'))
    }
  }
}
</script>

<style lang="scss">

  .notices {
    padding: 20px;
    &__list {
      border: 1px solid rgba(0,0,0,.125);
      padding: 12px;
      margin-bottom: 15px;
      position: relative;
    }
    &__title {
      margin-bottom: 12px;
      display: block;
      font-size: 22px;
      color: #007bff;
      text-decoration: none;
    }
    &__menu {
      margin: 0;
      padding: 0;
      list-style: none;
      &-title {
        margin-bottom: 8px;
        font-size: 18px;
      }
    }
    &__icon {
      color: #dc3545;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }

</style>