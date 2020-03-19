<template>
  <div class="modal">
    <div class="modal__content">
      <h2>Are you sure that you want change notice?</h2>
      <button 
        @click="$emit('update:showModal', false)"
        class="btn btn-close">
        Close
      </button>
      <button 
        @click="$emit('applyChanges')"
        class="btn btn-save">
        Save change
      </button>
    </div>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .btn {
    cursor: pointer;
    color: #fff;
    line-height: 1.1;
    padding: 10px;
    border-radius: 5px;
    font-size: 18px;
    &-close {
      border: 1px solid #6c757d;
      background-color: #6c757d;
      margin-right: 10px;
    }
    &-save {
      border: 1px solid #007bff;
      background-color: #007bff;
    }
  }

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    &__content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 50%;
    }
  }

</style>
