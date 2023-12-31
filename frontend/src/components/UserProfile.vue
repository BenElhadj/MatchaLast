<template>
  <div>
    <Loader v-if="f" />
    <v-layout
      v-else
      column
      class="user_profile"
    >
      <div
        class="parallax"
        :style="`background-image: url(${coverPhoto});`"
      ></div>
      <v-layout class="py-0 strap grey lighten-3">
        <v-container py-0>
          <v-layout>
            <v-flex
              xs12
              sm8
              md4
              class="avatar"
            >
              <v-avatar
                class="mx-auto d-block"
                size="200"
              >
                <template #offset>
                  <img
                    :src="profileImage"
                    class="avatar__img"
                  >
                </template>
              </v-avatar>
            </v-flex>
            <profile-tabs
              :active="activeTab"
              @change-tab="changeTab"
            ></profile-tabs>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-icon
                  :color="`${isOnline ? 'green' : 'grey'} lighten-2`"
                  class="profile-status_icon mx-3 hidden-xs-only"
                  medium
                  v-on="on"
                >
                  mdi-circle
                </v-icon>
              </template>
              <span>{{ lastSeen }}</span>
            </v-tooltip>
            <v-chip
              disabled
              outlined
              small
              color="grey lighten-1"
              class="mt-3 ml-2 hidden-xs-only"
            >
              {{ distance }}
            </v-chip>
            <v-btn
              icon
              text
              large
              color="primary"
              :disabled="userCantLike"
              class="hidden-xs-only"
              @click="match"
            >
              <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
            <v-btn
              icon
              text
              large
              color="primary"
              :disabled="!userCanChat"
              class="hidden-xs-only mx-0"
              @click="goToChat"
            >
              <v-icon>{{ userCanChat ? 'mdi-chat' : 'mdi-chat-outline' }}</v-icon>
            </v-btn>
            <v-speed-dial
              v-model="fab"
              direction="bottom"
              transition="slide-y-reverse-transition"
              class="speed_list"
            >
              <template #activator>
                <v-btn
                  v-model="fab"
                  icon
                  text
                  small
                  large
                  color="primary"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary darken-2"
                    @click="reportDialog = true"
                    v-on="on"
                  >
                    <v-icon>mdi-alert-octagon</v-icon>
                  </v-btn>
                </template>
                <span>Report</span>
              </v-tooltip>
              <v-tooltip left>
                <template #activator="{ on }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary darken-2"
                    @click="blockDialog = true"
                    v-on="on"
                  >
                    <v-icon>mdi-cancel</v-icon>
                  </v-btn>
                </template>
                <span>Block</span>
              </v-tooltip>
            </v-speed-dial>
          </v-layout>
        </v-container>
      </v-layout>
      <v-container
        fill-height
        grid-list-xl
        class="profile"
      >
        <v-layout
          justify-center
          wrap
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <profile-badge
              :user="user"
              :like="likedBy"
              :match="userCanChat"
            ></profile-badge>
          </v-flex>
          <v-flex
            xs12
            sm10
            md8
            class="pa-0 grey--text main"
          >
            <v-tabs-items v-model="activeTab">
              <v-tab-item value="tab-profile">
                <v-container>
                  <div v-if="user.biography">
                    <h1 class="py-3 mb-4">
                      A propos
                    </h1>
                    <v-container class="infos subheading py-2">
                      {{ user.biography }}
                    </v-container>
                  </div>
                  <h1 class="py-3 mb-4">
                    Informations
                  </h1>
                  <v-layout
                    column
                    class="title text-capitalize infos"
                  >
                    <div
                      v-for="item in informations"
                      :key="item.label"
                    >
                      <v-container
                        v-if="item.content"
                        py-3
                      >
                        <v-layout>
                          <v-flex xs6>
                            {{ `${item.label}:` }}
                          </v-flex>
                          <v-flex
                            xs6
                            class="infos"
                          >
                            {{ item.content }}
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </div>
                    <v-container
                      v-if="!!userTags.length"
                      py-3
                      px-2
                    >
                      <h1 class="py-3 mb-4">
                        Interêts
                      </h1>
                      <v-chip
                        v-for="(tag, i) in userTags"
                        :key="i"
                        color="primary"
                        class="user_tags"
                        dark
                        label
                      >
                        {{ tag }}
                      </v-chip>
                    </v-container>
                  </v-layout>
                </v-container>
              </v-tab-item>
              <v-tab-item value="tab-photo">
                <profile-gallery :images="filteredImages"></profile-gallery>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-dialog
      v-model="reportDialog"
      max-width="600px"
    >
      <v-card class="pa-2">
        <v-card-title>
          <span class="headline">Signaler comme faux</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <p class="subheading d-inline">
              Êtes-vous sûr de vouloir signaler
            </p>
            <router-link
              :to="`/user/${user.id}`"
              class="px-1 user_link"
            >
              {{ user.username }}
            </router-link>
            <p class="subheading d-inline">
              comme faux ?
            </p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="reportDialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="reportUser"
          >
            Signaler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="blockDialog"
      max-width="600px"
    >
      <v-card class="pa-2">
        <v-card-title>
          <span class="headline">Bloquer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <p class="subheading d-inline">
              Êtes-vous sûr de vouloir bloquer
            </p>
            <router-link
              :to="`/user/${user.id}`"
              class="px-1 user_link"
            >
              {{ user.username }}
            </router-link>
            <p class="subheading d-inline">
              ?
            </p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="blockDialog = false"
          >
            Fermer
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="block"
          >
            Bloquer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <alert :data="alert"></alert>
  </div>
</template>

<script>
import Alert from './Alert'
import moment from 'moment'
import loader from './Loader'
import utility from '../utility.js'
import ProfileTabs from './ProfileTabs'
// import ProfileForm from './ProfileForm'
import ProfileBadge from './ProfileBadge'
import ProfileGallery from './ProfileGallery'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
// import ProfileSettings from './ProfileSettings'

export default {
  name: 'UserProfile',
  components: {
    Alert,
    loader,
    ProfileTabs,
    // ProfileForm,
    ProfileBadge,
    ProfileGallery
    // ProfileSettings
  },
  beforeRouteUpdate (to, from, next) {
    this.f = true
    this.fetchUser(to.params.id)
    next()
  },
  data () {
    return {
      user: {},
      f: true,
      fab: false,
      blockDialog: false,
      reportDialog: false,
      activeTab: 'tab-profile',
      alert: {
        state: false,
        color: '',
        text: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user',
      online: 'online',
      convos: 'convos',
      matches: 'matches',
      blocked: 'blocked',
      location: 'location',
      following: 'following',
      followers: 'followers',
      blockedBy: 'blockedBy',
      profileImage: 'profileImage'
    }),
    liked: {
      get () {
        for (const match of this.following) if (match.id === this.user.id) return true
        return false
      },
      set () {
        this.syncMatches(this.loggedIn.id)
      }
    },
    likedBy () {
      for (const match of this.followers) if (match.id === this.user.id) return true
      return false
    },
    profileImage () {
      return this.getFullPath(this.getProfileImage())
    },
    userCantLike () {
      const imgs = this.loggedIn.images
      return imgs ? !imgs.length : true
    },
    userCanChat () {
      for (const match of this.matches) if (match.id === this.user.id) return true
      return false
    },
    age () {
      return this.user.birthdate ? new Date().getFullYear() - new Date(this.user.birthdate).getFullYear() : ''
    },
    lastSeen () {
      if (this.isOnline) return 'online'
      if (this.user.status) return moment(this.user.status).utc().fromNow()
      return moment(this.user.created_at).utc().fromNow()
    },
    informations () {
      return [
        { label: 'Nom d\'utilisateur', content: this.user.username },
        { label: 'Nom', content: this.user.first_name },
        { label: 'Prénom', content: this.user.last_name },
        { label: 'Age', content: this.age },
        { label: 'Genre', content: this.user.gender },
        { label: 'Interressé(e) par', content: this.user.looking },
        { label: 'Téléphone', content: this.user.phone },
        { label: 'Ville', content: this.user.city },
        { label: 'Pays', content: this.user.country },
        { label: 'Code postal', content: this.user.postal_code },
        { label: 'Addresse', content: this.user.address }
      ]
    },
    distance () {
      const from = this.location
      const to = {
        lat: this.user.lat,
        lng: this.user.lng
      }
      const distance = this.calculateDistance(from, to)
      return `${Math.round(distance)} kms away`
    },
    isOnline () {
      return this.online.includes(this.user.id)
    },
    coverPhoto () {
      const cover = '../assets/defaut_couverture.jpg'
      if (!this.user || !this.user.images) return this.getFullPath(cover)
      const image = this.user.images.find(cur => cur.cover)
      return this.getFullPath(image ? image.name : cover)
    },
    filteredImages () {
      return this.user.images.filter(cur => !cur.cover)
    },
    userTags () {
      const tags = this.user.tags
      if (!tags) return []
      return tags.split(',')
    }
  },
  watch: {
    blocked: {
      immediate: true,
      handler () {
        const id = Number(this.$route.params.id)
        if (Array.isArray(this.blocked) && this.blocked.includes(id)) {
          this.$router.push('/')
        }
      }
    },
    blockedBy: {
      immediate: true,
      handler () {
        const id = Number(this.$route.params.id)
        if (Array.isArray(this.blockedBy) && this.blockedBy.includes(id)) {
          this.$router.push('/')
        }
      }
    },
    loggedIn: {
      immediate: true,
      handler () {
        if (isNaN(this.$route.params.id) || !this.$route.params.id) this.$router.push('/404')
        this.fetchUser(this.$route.params.id)
      }
    },
    isOnline () {
      if (!this.isOnline) this.user.status = new Date()
    }
  },
  methods: {
    ...utility,
    ...mapActions([
      'syncBlocked',
      'syncMatches',
      'syncConvo',
      'syncConvoAll'
    ]),
    changeTab (tab) {
      this.activeTab = tab
    },
    getProfileImage () {
      if (!this.user || !this.user.images) return 'default.png'
      const image = this.user.images.find(cur => cur.profile === 1)
      return image ? image.name : 'default.png'
    },
    async match () {
      const url = `${process.env.VUE_APP_API_URL}/api/matching/match`
      const data = {
        id: this.$route.params.id,
        liked: this.liked
      }
      const headers = { 'x-auth-token': this.loggedIn.token }
      const res = await axios.post(url, data, { headers })
      if (res.data.ok) {
        this.liked = !this.liked
        const profileImg = this.loggedIn.images.find(cur => cur.profile === true)
        const data = {
          date: new Date(),
          id_from: this.loggedIn.id,
          username: this.loggedIn.username,
          profile_image: profileImg ? profileImg.name : 'default.png',
          id_to: this.$route.params.id
        }
        if (!this.liked) {
          if (this.followers.some(cur => cur.id === this.$route.params.id)) {
            data.type = 'like_back'
          } else {
            data.type = 'like'
          }
        } else {
          data.type = 'unlike'
        }
        this.syncConvoAll()
        this.$socket.emit('match', data)
      }
    },
    async block () {
      const url = `${process.env.VUE_APP_API_URL}/api/users/block`
      let data = { id: this.$route.params.id }
      const headers = { 'x-auth-token': this.loggedIn.token }
      const res = await axios.post(url, data, { headers })
      if (!res.data.msg) {
        this.syncBlocked(this.loggedIn.id)
        data = {
          id_from: this.loggedIn.id,
          id_to: this.$route.params.id
        }
        this.$socket.emit('block', data)
        this.blockDialog = false
        this.$router.push('/')
      }
    },
    goToChat () {
      const convo = this.convos.find(cur => cur.user_id === this.user.id)
      if (convo) {
        this.syncConvo({
          username: convo.username,
          id_conversation: convo.id_conversation,
          profile_image: convo.profile_image
        })
        this.$router.push('/chat')
      }
    },
    async fetchUser (id) {
      if (this.loggedIn.id && this.f) {
        if (this.loggedIn.id === this.$route.params.id) {
          this.$router.push('/settings')
        } else {
          try {
            const headers = { 'x-auth-token': this.loggedIn.token }
            const url = `${process.env.VUE_APP_API_URL}/api/users/show/${id}`
            const res = await axios.get(url, { headers })
            if (res.data.msg) {
              this.$router.push('/404')
            }
            this.user = { ...res.body, rating: Number(res.data.rating) }
            const profileImg = this.loggedIn.images.find(cur => cur.profile === 1)
            if (this.online.includes(this.user.id)) {
              this.user.status = true
            }
            const data = {
              date: new Date(),
              id_from: this.loggedIn.id,
              username: this.loggedIn.username,
              profile_image: profileImg ? profileImg.name : 'default.png',
              id_to: id,
              type: 'visit'
            }
            this.$socket.emit('visit', data)
            this.f = false
          } catch (err) {
            console.error(err)
          }
        }
      }
    },
    async reportUser () {
      const url = `${process.env.VUE_APP_API_URL}/api/users/report`
      const data = { id: this.$route.params.id }
      const headers = { 'x-auth-token': this.loggedIn.token }
      const res = await axios.post(url, data, { headers })
      if (!res.data.msg) {
        this.reportDialog = false
        this.showAlert('green', 'User reported successfuly', this)
      } else {
        this.showAlert('red', res.data.msg, this)
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 4em;
}
.profile-status_icon {
  align-self: flex-start;
  margin-top: 1.5rem;
}

.user_profile {
  height: 100%;
}

.infos {
  color:#666;
}

.actions {
  box-shadow: none !important;
}

.more_icon {
  transform: scale(1.25);
}

.speed_list > .v-speed-dial__list {
  top: 4.25rem;
  z-index: 5;
}

.user_link {
  text-decoration: none;
  font-size: 1.1em;
}

.user_tags {
  border-radius: 5px;
}
</style>
