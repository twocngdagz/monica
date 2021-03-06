<style scoped>
  .note:hover {
      background-color: #f6fbff;
  }
</style>

<template>
  <div>
    <notifications group="main" position="bottom right" />

    <div>
      <div>
        <form class="bg-near-white pa2 br2 mb3">
          <textarea class="w-100 br2 pa2 b--light-gray" v-model="newNote.body" @focus="addMode = true" @keyup.esc="addMode = false" :placeholder="$t('people.notes_add_cta')"></textarea>
          <a class="pointer btn btn-primary" @click.prevent="store" v-if="addMode">{{ $t('app.add') }}</a>
          <a class="pointer btn btn-secondary" @click="addMode = false" v-if="addMode">{{ $t('app.cancel') }}</a>
        </form>
      </div>

      <!-- LIST OF NORMAL NOTES -->
      <ul>
        <li v-for="note in notes" class="note">
          <div class="ba br2 b--black-10 br--top w-100 mb2" v-show="!note.edit">
            <div class="pa2">
              {{ note.body }}
            </div>
            <div class="pa2 cf bt b--black-10 br--bottom f7 lh-copy">
              <div class="fl w-50">
                <div class="f5 di mr1">
                  <i @click="toggleFavorite(note)" class="pointer" v-bind:class="[note.is_favorited ? 'fa fa-star' : 'fa fa-star-o']" v-tooltip.top="$t('people.notes_favorite')"></i>
                </div>
                {{ note.created_at_short }}
              </div>
              <div class="fl w-50 tr">
                <a class="pointer" @click="toggleEditMode(note)">{{ $t('app.edit') }}</a>
                |
                <a class="pointer" @click.prevent="showDelete(note)">{{ $t('app.delete') }}</a>
              </div>
            </div>
          </div>

          <!-- EDIT MODE -->
          <form class="bg-near-white pa2 br2 mt3 mb3" v-show="note.edit">
            <textarea class="w-100 br2 pa2 b--light-gray" v-model="note.body" @keyup.esc="note.edit = false"></textarea>
            <a class="pointer btn btn-primary" @click.prevent="update(note)">{{ $t('app.update') }}</a>
          </form>

        </li>
      </ul>

    </div>

    <!-- Delete Note modal -->
    <div class="modal" id="modal-delete-note" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t('people.notes_delete_title') }}</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ $t('people.notes_delete_confirmation') }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('app.cancel') }}</button>
            <button type="button" class="btn btn-danger" @click.prevent="trash(note)">{{ $t('app.delete') }}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

    export default {
        /*
         * The component's data.
         */
        data() {
            return {
                notes: [],

                addMode: false,
                editMode: false,

                newNote: {
                    id: 0,
                    body: '',
                    is_favorited: 0
                },

                note: {
                    id: 0,
                    body: '',
                    is_favorited: 0
                }
            };
        },

        components: {
        //     VueMarkdown
        },

        /**
         * Prepare the component (Vue 1.x).
         */
        ready() {
            this.prepareComponent();
        },

        /**
         * Prepare the component (Vue 2.x).
         */
        mounted() {
            this.prepareComponent();
        },

        props: ['contactId'],

        computed: {
            compiledMarkdown: function (text) {
                return marked(text, { sanitize: true })
            }
        },

        methods: {
            /**
             * Prepare the component.
             */
            prepareComponent() {
                this.getNotes();
            },

            reinitialize() {
                this.createForm.body = '';
            },

            favorited: function (notes) {
              return notes.filter(function (note) {
                return note.is_favorited === true
              })
            },

            normal: function (notes) {
              return notes.filter(function (note) {
                return note.is_favorited === false
              })
            },

            toggleEditMode(note) {
                this.note.id = note.id;
                this.note.body = note.body;
                this.note.is_favorited = note.is_favorited;
                Vue.set(note, 'edit', !note.edit);
            },

            getNotes() {
                axios.get('/people/' + this.contactId + '/notes')
                        .then(response => {
                            this.notes = response.data;
                        });
            },

            store() {
                axios.post('/people/' + this.contactId + '/notes', this.newNote)
                      .then(response => {
                          this.newNote.body = '';
                          this.getNotes();
                          this.addMode = false;

                          this.$notify({
                              group: 'main',
                              title: this.$t('people.notes_create_success'),
                              text: '',
                              type: 'success'
                          });
                      });
            },

            toggleFavorite(note) {
                axios.post('/people/' + this.contactId + '/notes/' + note.id + '/toggle')
                      .then(response => {
                          this.getNotes();
                      });
            },

            update(note) {
                axios.put('/people/' + this.contactId + '/notes/' + note.id, note)
                      .then(response => {
                          Vue.set(note, 'edit', note.edit);
                          this.getNotes();

                          this.$notify({
                              group: 'main',
                              title: this.$t('people.notes_update_success'),
                              text: '',
                              type: 'success'
                          });
                      });
            },

            showDelete(note) {
                this.note.id = note.id

                $('#modal-delete-note').modal('show');
            },

            trash(note) {
                axios.delete('/people/' + this.contactId + '/notes/' + note.id)
                      .then(response => {
                          this.getNotes();

                          $('#modal-delete-note').modal('hide');

                          this.$notify({
                              group: 'main',
                              title: this.$t('people.notes_delete_success'),
                              text: '',
                              type: 'success'
                          });
                      });
            },
        }
    }
</script>
