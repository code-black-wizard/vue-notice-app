<template>
  <div class="notices">
    <div 
      class="notices__list"
      v-for="notice in notices"
      :key="notice.id"
    >
      <h2 class="notices__title">{{ notice.title }}</h2>
      <i 
        v-if="!isChanged"
        @click="editNotice(notice)"
        class="material-icons notice-icon notice-edit"
      >
        edit
      </i>
      <div 
        v-else
        class="notice-edit"
      >
        <i 
          @click="saveChange"
          class="material-icons notice-icon"
        >
          save
        </i>
        <i 
          @click="cancelChange"
          class="material-icons notice-icon"
        >
          cancel
        </i>
      </div>
      <ul class="notices__menu">
        <li 
          v-for="paragraph in notice.paragraphs"
          :key="paragraph.id"
          class="notices__menu-title notice-item"
        >
          <input 
            :disabled="!isChanged"
            type="checkbox"
            v-model="paragraph.done"
            class="notice-checkbox"
          >
          <span v-if="!isChanged">{{ paragraph.paragraphName }}</span>
          <div 
            class="notice-inner" 
            v-else
          >
            <input 
              v-model.trim="paragraph.paragraphName"
              type="text"
              class="form__textfield notice-textfield"
            >
            <i 
              @click="deleteParagraph(paragraph)"
              class="material-icons notice-icon"
            >
              clear
            </i>
          </div>
        </li>
      </ul>
      <textarea 
        v-if="isChanged"
        name="description"
        placeholder="Add new paragraphs"
        rows="6"
        cols="50"
        class="form__textfield"
        v-model.trim="paragraphs"
      ></textarea>
      <i 
        @click="deleteNoticeAsk(notice)"
        class="material-icons notices__icon"
      >
        clear
      </i>
    </div>
    <button 
      v-if="isDeleted"
      @click="returnNotice"
      class="notice-btn"
    >
      Return notice
    </button>
    <Modal 
      v-if="showModal"
      @update:showModal="showModal = $event"
      @applyChanges="deleteNotice"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from '@/components/UI/Modal'

export default {
  components: {
    Modal
  },
  data() {
    return {
      notices: [],
      showModal: false,
      changedNoticeItem: {},
      isDeleted: false,
      isChanged: false,
      paragraphs: '',
      noticesList: JSON.parse(localStorage.getItem('noticesList'))
    }
  },
  methods: {
    deleteNoticeAsk (notice) {
      // запоминаю удаленную заметку и показываю модалку
      this.showModal = true
      this.changedNoticeItem = notice
    },
    deleteNotice () {
      // удаляю заметку, скрываю модалку
      this.notices.splice(this.notices.indexOf(this.changedNoticeItem), 1)
      this.showModal = false
      // показываю кнопку вернуть заметку
      this.isDeleted = true
      // перезаписываю коллекцию заметок в local storage
      this.noticesList.splice(this.noticesList.indexOf(this.changedNoticeItem), 1)
      localStorage.setItem('noticesList', JSON.stringify(this.noticesList))
    },
    deleteParagraph (paragraph) {
      // удаляю выбранный пункт из заметки
      this.notices[0].paragraphs.splice(this.notices[0].paragraphs.indexOf(paragraph), 1)
    },
    returnNotice () {
      // возвращаю удаленную заметку в массив заметок
      this.notices.push(this.changedNoticeItem)
      // скрываю кнопку вернуть заметку
      this.isDeleted = false
      // возвращаю удаленную заметку в local storage
      this.noticesList.push(this.changedNoticeItem)
      localStorage.setItem('noticesList', JSON.stringify(this.noticesList))
    },
    editNotice (notice) {
      // запоминаю изменненую заметку и показываю кнопки сохранить и отменить
      this.changedNoticeItem = JSON.parse(JSON.stringify(notice)) // копирую по значению
      this.isChanged = true
    },
    cancelChange () {
      // отменяю изменения в заметке
      this.$set(this.notices, 0, this.changedNoticeItem) // $set для того что бы работал watch
      // очищаю v-model пунктов заметки
      this.paragraphs = ''
      // скрываю кнопки сохранить и отменить
      this.isChanged = false
    },
    saveChange () {
      // разбиваю строку с пунктами заметки в массив и добавляю в заметку
      if (this.paragraphs) {
        this.paragraphs.split(',').forEach(paragraph => {
          this.notices[0].paragraphs.push({
            paragraphName: paragraph,
            done: false,
            id: Math.random()
          })
        })
      }
      // очищаю v-model пунктов заметки
      this.paragraphs = ''
      // скрываю кнопки сохранить и отменить
      this.isChanged = false
    }
  },
  watch: {
    notices: {
      deep: true,
      handler() {
        // если заметка редактируется, тогда нахожу ее в массиве всех заметок по id и заменяю на актуальную
        let indexNotice = this.noticesList.map(notice => notice.id).indexOf(this.notices.map(notice => notice.id)[0])
        this.noticesList[indexNotice] = this.notices[0]
        localStorage.setItem('noticesList', JSON.stringify(this.noticesList))
      }
    }
  },
  created() {
    // нахожу выбранную заметку по id, добавляю в массив для реактивности
    if (localStorage.getItem('noticesList')) {
      this.notices = this.noticesList.filter(notice => {
        return notice.id === +this.$route.params.id
      })
    }
  },
  mounted() {
    // если выбранной заметки нету, происходит редирект на главную
    if (!this.notices.length) {
      this.$router.replace({path: '/'})
    }
  }
}
</script>

<style scoped lang="scss">

  .notice {
    &-btn {
      cursor: pointer;
      color: #fff;
      line-height: 1.1;
      padding: 10px;
      border-radius: 5px;
      font-size: 18px;
      background-color: #28a745;
      border: 1px solid #28a745;
    }
    &-icon {
      cursor: pointer;
    }
    &-edit {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &-inner {
      display: flex;
      align-items: center;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    &-checkbox {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }
    &-textfield {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }

</style>