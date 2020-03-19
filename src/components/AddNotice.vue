<template>
  <div>
    <form class="form" @submit.prevent="addNotice">
      <div class="form__inner">
        <label 
          class="form__label"
          for="title">
          Name of notice
        </label>
        <input
          class="form__textfield"
          type="text"
          name="title"
          placeholder="Title"
          id="title"
          v-model.trim="notice.title"
        >
        <label 
          class="form__label"
          for="description">
          Type your paragraphs of notices through comma. For example: go to the gym, buy milk
        </label>
        <textarea 
          name="description"
          placeholder="Description"
          id="description"
          rows="4"
          class="form__textfield"
          v-model.trim="notice.description"
        ></textarea>
        <button class="form__btn">Add notice</button>
        <div class="form__errors" v-if="errors.length">
          <ul>
            <li 
              v-for="(error, index) in errors"
              :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {
        title: '',
        description: ''
      },
      errors: [],
      submit: false
    }
  },
  methods: {
    addNotice () {
      // если валидация прошла успешно, эмитится добавление новой заметки и очищается v-model
      if (this.notice.title && this.notice.description) {
        this.$emit('addNotice', this.notice)
        this.notice = {
          title: '',
          description: ''
        }
        this.submit = true
      }
      this.errors = []
      // отображение ошибок валидации
      if (!this.notice.title) this.errors.push('Title is required')
      if (!this.notice.description) this.errors.push('Description is required')
      // если отправка формы прошла успешно, убираю ошибки валидации
      if (this.submit) this.errors = []
      this.submit = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .form {
    width: 100%;
    display: flex;
    justify-content: center;
    &__inner {
      display: flex;
      flex-direction: column;
    }
    &__label {
      margin-bottom: 12px;
      font-size: 18px;
    }
    &__textfield {
      border: 1px solid #ced4da;
      line-height: 1.5;
      padding: 10px;
      margin-bottom: 12px;
      resize: none;
    }
    &__btn {
      cursor: pointer;
      color: #fff;
      background-color: #6c757d;
      border: 1px solid #6c757d;
      line-height: 1.5;
      padding: 10px;
      border-radius: 5px;
      font-size: 18px;
    }
  }

</style>
